using System.Diagnostics;
using System.Text.Json;
using Ducss;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("*")
               .AllowAnyHeader()
               .AllowAnyMethod();
    });
});
var app = builder.Build();

app.UseCors();
app.UseRouting();

app.MapPost("/checkout", async (ILogger<Program> logger, JsonElement json) =>
{
    logger.LogDebug("\n\nJSON:" + json.GetRawText() + "\n\n");

    try
    {
        if (json.ValueKind != JsonValueKind.Array)
        {
            logger.LogError("Invalid JSON format: Expected an array.");
            return Results.BadRequest("Invalid data format.");
        }

        var items = new List<StripeCheckoutItem>();

        foreach (var arrayElement in json.EnumerateArray())
        {
            if (arrayElement.ValueKind == JsonValueKind.Array && arrayElement.GetArrayLength() == 3)
            {
                string productId = arrayElement[0].GetString();
                string priceId = arrayElement[1].GetString();
                int quantity = arrayElement[2].GetInt32();

                StripeCheckoutItem item = new StripeCheckoutItem
                {
                    ProductId = productId,
                    PriceId = priceId,
                    Quantity = quantity
                };

                items.Add(item);
            }
            else
            {
                logger.LogError("Invalid item format in JSON array.");
                return Results.BadRequest("Invalid item format.");
            }
        }

        var jsonResponse = await Wrapper.CheckoutAsync(items.ToArray());

        return Results.Json(jsonResponse);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error processing the JSON data.");
        return Results.BadRequest("Error processing data.");
    }
});

app.MapPost("/fetchProduct", async (ILogger<Program> logger, JsonElement json) => {
    try
    {
        string productId = json.GetString();
        var response = await Wrapper.FetchProductAsync(productId);

        // logger.LogDebug(JsonSerializer.Serialize(response.RootElement, new JsonSerializerOptions { WriteIndented = true }));

        return Results.Json(response);
    } 
    catch (Exception ex) 
    {
        logger.LogError(ex, "Error");
        return Results.BadRequest("Error");
    }
});

app.MapPost("/fetchProducts", async (ILogger<Program> logger, JsonElement json) => {
    try
    {
        var response = await Wrapper.FetchProductsAsync();

        logger.LogError(JsonSerializer.Serialize(response.RootElement, new JsonSerializerOptions { WriteIndented = true }));

        return Results.Json(response);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error");
        return Results.BadRequest("Error");
    }
});

app.Run();
