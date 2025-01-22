using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using JHipsterNet.Web.Pagination.Swagger;

namespace App.Configuration;

public static class SwaggerConfiguration
{
    public static IServiceCollection AddSwaggerModule(this IServiceCollection services)
    {
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v3", new OpenApiInfo { Title = "App API", Version = "0.0.1" });
            c.OperationFilter<PageableModelFilter>();
        });

        return services;
    }

    public static IApplicationBuilder UseApplicationSwagger(this IApplicationBuilder app)
    {
        app.UseSwagger(c =>
        {
            c.RouteTemplate = "{documentName}/api-docs";
        });
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/v3/api-docs", "App API");
        });
        return app;
    }
}
