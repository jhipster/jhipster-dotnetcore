using System.Net.Http;
using JhipsterBlazor.Models;
using Microsoft.AspNetCore.Components.Authorization;

namespace JhipsterBlazor.Services.EntityServices.Country
{
    public class CountryService : AbstractEntityService<CountryModel>,ICountryService
    {
        public CountryService(HttpClient httpClient, AuthenticationStateProvider authenticationStateProvider) 
            : base(httpClient, authenticationStateProvider, "/api/countries")
        {
        }
    }
}
