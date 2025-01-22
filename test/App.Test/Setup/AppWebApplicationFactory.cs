using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using App.Crosscutting.Constants;
using App.Configuration;
using App.Security;
using App.Test.Configuration;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.IdentityModel.JsonWebTokens;

namespace App.Test.Setup;

public class AppWebApplicationFactory<TEntryPoint> : WebApplicationFactory<TEntryPoint>
    where TEntryPoint : class, IStartup, new()
{
    private IStartup _startup;
    private IServiceProvider _serviceProvider;
    private ClaimsPrincipal _user { get; set; }

    public AppWebApplicationFactory()
    {
        _startup = new TEntryPoint();
    }

    protected override IWebHostBuilder CreateWebHostBuilder()
    {
        return WebHost.CreateDefaultBuilder()
            .ConfigureServices((context, services) =>
            {
                _startup.Configure(context.Configuration, services);
                _startup.ConfigureServices(services, context.HostingEnvironment);
            });
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder
            .UseSolutionRelativeContentRoot("src/App")
            .ConfigureServices(services =>
            {
                services
                    .AddMvc(TestMvcStartup.ConfigureMvcAuthorization());
                services.Replace(new ServiceDescriptor(typeof(IHttpContextFactory), typeof(MockHttpContextFactory),
                    ServiceLifetime.Transient));
                services.AddTransient(_ => new MockClaimsPrincipalProvider(_user));
            })
            .Configure((context, applicationBuilder) =>
            {
                _serviceProvider = applicationBuilder.ApplicationServices;
                _startup.ConfigureMiddleware(applicationBuilder, context.HostingEnvironment);
                _startup.ConfigureEndpoints(applicationBuilder, context.HostingEnvironment);
            });
    }

    public TService GetRequiredService<TService>()
    {
        return _serviceProvider.GetRequiredService<TService>();
    }

    public AppWebApplicationFactory<TEntryPoint> WithMockUser(string name = "user",
        IEnumerable<string> roles = null, string authenticationType = "MockAuthenticationType")
    {
        _user = BuildClaimsPrincipal(name, roles, authenticationType);
        return this;
    }

    private static ClaimsPrincipal BuildClaimsPrincipal(string name, IEnumerable<string> roles,
        string authenticationType)
    {
        if (roles == null || !roles.Any()) roles = new HashSet<string> { RolesConstants.USER };

        var claims = new List<Claim> { new Claim(SecurityStartup.UserNameClaimType, name) };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));
        return new ClaimsPrincipal(new ClaimsIdentity(claims.ToArray(), authenticationType));
    }
}
