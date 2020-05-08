using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Json;
using System.Threading.Tasks;
using JhipsterBlazor.Models;
using Microsoft.AspNetCore.Components.Authorization;

namespace JhipsterBlazor.Services.EntityServices
{
    public class AbstractEntityService<T> where T : class
    {
        private const string AuthorizationHeader = "Authorization";
        private readonly HttpClient _httpClient;
        private readonly AuthenticationStateProvider _authenticationStateProvider;
        protected JwtToken JwtToken { get; set; }
        protected string BaseUrl { get; }

        public AbstractEntityService(HttpClient httpClient, AuthenticationStateProvider authenticationStateProvider, string baseUrl)
        {
            _httpClient = httpClient;
            _authenticationStateProvider = authenticationStateProvider;
            _httpClient.BaseAddress = new Uri(Configuration.BaseUri);
            var authenticationService = _authenticationStateProvider as IAuthenticationService;
            JwtToken = authenticationService?.JwtToken;
            if (JwtToken != null)
            {
                _httpClient.DefaultRequestHeaders.Add(AuthorizationHeader, $"Bearer {JwtToken.IdToken}");
            }
            BaseUrl = baseUrl;
        }

        public async Task<IList<T>> GetAll()
        {
            //todo catch error like auth error
            return await _httpClient.GetFromJsonAsync<IList<T>>(BaseUrl);
        }

        public async Task<T> Get(string id)
        {
            //todo catch error like auth error
            return await _httpClient.GetFromJsonAsync<T>($"{BaseUrl}/{id}");
        }

        public async Task Add(T model)
        {
            //todo catch error like auth error
            await _httpClient.PostAsJsonAsync(BaseUrl,model);
        }
        public async Task Update(T model)
        {
            //todo catch error like auth error
            await _httpClient.PutAsJsonAsync(BaseUrl, model);
        }

    }
}
