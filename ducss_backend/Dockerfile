# Use the official .NET SDK image as a base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Build the application
RUN dotnet publish -c Release -o out

# Use the official ASP.NET Core runtime image as a base image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory
WORKDIR /app

# Copy the built application
COPY --from=build /app/out .

# Expose the port the app runs on
EXPOSE 80

# Start the application
CMD ["dotnet", "ducss-backend.dll"]
