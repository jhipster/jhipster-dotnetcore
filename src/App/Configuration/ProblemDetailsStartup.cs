using System.Security.Authentication;
using App.Crosscutting.Exceptions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace App.Configuration;

public static class ProblemDetailsStartup
{
    public static IServiceCollection AddProblemDetailsModule(this IServiceCollection services)
    {
        services.AddProblemDetails(config =>
        {
            config.CustomizeProblemDetails = context =>
            {
                var exception = context.HttpContext.Features.Get<IExceptionHandlerPathFeature>()?.Error;
                if (exception is BaseException)
                {
                    context.ProblemDetails.Status = 400;
                    context.ProblemDetails.Detail = exception.Message;
                    context.HttpContext.Response.StatusCode = 400;
                }

                if (exception is AuthenticationException)
                {
                    context.ProblemDetails.Status = 401;
                    context.ProblemDetails.Detail = exception.Message;
                    context.HttpContext.Response.StatusCode = 401;
                }
            };
        });

        return services;
    }

    public static IApplicationBuilder UseApplicationProblemDetails(this IApplicationBuilder app, IHostEnvironment environment)
    {
        app.UseExceptionHandler();
        app.UseStatusCodePages();

        if (environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        return app;
    }
}
