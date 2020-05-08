using System;
using System.Net.Http;
using System.Threading.Tasks;
using Blazored.SessionStorage;
using Blazorise;
using Blazorise.Bootstrap;
using Blazorise.Icons.FontAwesome;
using JhipsterBlazor.Pages.Utils;
using JhipsterBlazor.Services;
using JhipsterBlazor.Services.EntityServices;
using JhipsterBlazor.Services.EntityServices.Country;
using JhipsterBlazor.Services.EntityServices.Region;
using Microsoft.AspNetCore.Components.Authorization;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace JhipsterBlazor
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebAssemblyHostBuilder.CreateDefault(args);
            builder.Services
                .AddBlazorise(options =>
                {
                    options.ChangeTextOnKeyPress = true;
                })
                .AddBootstrapProviders()
                .AddFontAwesomeIcons();


            builder.RootComponents.Add<App>("app");

            builder.Services.AddTransient(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
            builder.Services.AddSingleton<ISessionStorageService, SessionStorageService>().AddSingleton<ISyncSessionStorageService, SessionStorageService>();
            builder.Services.AddSingleton<AuthenticationStateProvider, AuthenticationService>();
            builder.Services.AddSingleton<INavigationService, NavigationService>();

            builder.Services.AddSingleton<ICountryService, CountryService>();
            builder.Services.AddSingleton<IRegionService, RegionService>();

            builder.Services.AddAuthorizationCore();
            
            //config =>
            //{
            //    //config.AddPolicy(Policies.IsAdmin, Policies.IsAdminPolicy());
            //    //config.AddPolicy(Policies.IsUser, Policies.IsUserPolicy());
            //    //config.AddPolicy(Policies.IsReadOnly, Policies.IsUserPolicy());
            //    // config.AddPolicy(Policies.IsMyDomain, Policies.IsMyDomainPolicy());  Only works on the server end
            //});

          

            var host = builder.Build();

            host.Services
                .UseBootstrapProviders()
                .UseFontAwesomeIcons();

            await host.RunAsync();
        }
    }
}
