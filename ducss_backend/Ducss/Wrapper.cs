    using Stripe;
    using System.Text.Json;

    namespace Ducss
    {
        public class StripeProduct
        {
            public string ProductId { get; set; }
            public string PriceId { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public List<string> Images { get; set; }
            public float UnitPrice { get; set; }
        }

        public class StripeCheckoutItem
        {
            public string ProductId { get; set; }
            public string PriceId { get; set; }
            public int Quantity { get; set; }
        }

        static class Wrapper
        {
            static string STRIPE_API_KEY => Environment.GetEnvironmentVariable("STRIPE_API_KEY");

            public static async Task<JsonDocument> CheckoutAsync(StripeCheckoutItem[] items)
            {
                StripeConfiguration.ApiKey = STRIPE_API_KEY;
                Stripe.Checkout.SessionCreateOptions options = new Stripe.Checkout.SessionCreateOptions();
                options.SuccessUrl = "https://miarolfe.com";
                options.LineItems = new List<Stripe.Checkout.SessionLineItemOptions>();
                options.Mode = "payment";
                foreach (StripeCheckoutItem item in items)
                {
                    options.LineItems.Add(new Stripe.Checkout.SessionLineItemOptions
                    {
                        Price = item.PriceId,
                        Quantity = item.Quantity,
                    });
                }

                Stripe.Checkout.SessionService service = new Stripe.Checkout.SessionService();

                try
                {
                    var session = await service.CreateAsync(options);
                    var response = new
                    {
                        sessionId = session.Id,
                        sessionUrl = session.Url
                    };

                    // Serialize response to JSON
                    string jsonResponse = JsonSerializer.Serialize(response);
                    return JsonDocument.Parse(jsonResponse);
                }
                catch (StripeException ex)
                {
                    // Handle Stripe exception
                    var errorResponse = new
                    {
                        error = ex.Message
                    };

                    string jsonErrorResponse = JsonSerializer.Serialize(errorResponse);
                    return JsonDocument.Parse(jsonErrorResponse);
                }

            }

            public static async Task<JsonDocument> FetchProductAsync(string productId)
            {
                StripeConfiguration.ApiKey = STRIPE_API_KEY;
                try
                {
                    var productService = new ProductService();
                    var priceService = new PriceService();

                    var stripeProduct = await productService.GetAsync(productId);
                    var prices = await priceService.ListAsync(new PriceListOptions { Active = true });

                    var price = prices.Data.FirstOrDefault(p => p.ProductId == productId);

                    var productInfo = new
                    {
                        productId = stripeProduct.Id,
                        priceId = price != null ? price.Id : "INVALID",
                        name = stripeProduct.Name,
                        description = stripeProduct.Description,
                        images = stripeProduct.Images,
                        unitPrice = price.UnitAmount.Value / 100.0,
                    };

                    var json = JsonSerializer.Serialize(productInfo);
                    return JsonDocument.Parse(json);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error fetching product: {ex.Message}");
                    return null;
                }
            }

            public static async Task<JsonDocument> FetchProductsAsync()
            {
                StripeConfiguration.ApiKey = STRIPE_API_KEY;
                try
                {
                    var productService = new ProductService();
                    var priceService = new PriceService();

                    var activeProducts = await productService.ListAsync(new ProductListOptions { Active = true });
                    var prices = await priceService.ListAsync(new PriceListOptions { Active = true });

                    var productsInfo = activeProducts.Data.Select(stripeProduct =>
                    {
                        var price = prices.Data.FirstOrDefault(p => p.ProductId == stripeProduct.Id);

                        return new
                        {
                            productId = stripeProduct.Id,
                            priceId = price != null ? price.Id : "INVALID",
                            name = stripeProduct.Name,
                            description = stripeProduct.Description,
                            images = stripeProduct.Images,
                            unitPrice = price.UnitAmount.Value / 100.0
                        };
                    });

                    var json = JsonSerializer.Serialize(productsInfo);
                    return JsonDocument.Parse(json);
                }
                catch (Exception ex)
                {
                    Console.Error.WriteLine($"Error fetching products: {ex.Message}");
                    return JsonDocument.Parse("[]"); // Return an empty JSON array
                }
            }
        }
    }

