using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Threading.Tasks;
using Blazored.SessionStorage;
using JhipsterBlazor.Models;
using Microsoft.AspNetCore.Components.Authorization;

namespace JhipsterBlazor.Services
{
    public class AuthenticationService : AuthenticationStateProvider,IAuthenticationService
    {
        private const string AuthenticatationUrl = "/api/authenticate";
        private const string AccountUrl = "/api/account";
        private const string AuthorizationHeader = "Authorization";
        private const string JhiAuthenticationtoken = "jhi-authenticationtoken";

        private readonly HttpClient _httpClient;
        private readonly ISyncSessionStorageService _sessionStorage;

        public bool IsAuthenticated { get; set; }
        public UserModel CurrentUser { get; set; }
        public JwtToken JwtToken { get; set; }
        
        public AuthenticationService(HttpClient httpClient, ISyncSessionStorageService sessionStorage)
        {
            _httpClient = httpClient;
            _sessionStorage = sessionStorage;
            _httpClient.BaseAddress = new Uri(Configuration.BaseUri);
            var token = _sessionStorage.GetItem<string>(JhiAuthenticationtoken);
            if (!string.IsNullOrEmpty(token))
            {
                JwtToken = new JwtToken { IdToken = token };
                SetUserAndAuthorizationHeader(JwtToken);
            }
        }
        
        public async Task<bool> SignIn(LoginModel loginModel)
        {
            var result = await _httpClient.PostAsJsonAsync(AuthenticatationUrl, loginModel);
            if (result.IsSuccessStatusCode)
            {
                JwtToken = await result.Content.ReadFromJsonAsync<JwtToken>();
                _sessionStorage.SetItem(JhiAuthenticationtoken, JwtToken.IdToken); 
                await SetUserAndAuthorizationHeader(JwtToken);
            }
            return IsAuthenticated;
        }

        public async Task SignOut()
        {
            _httpClient.DefaultRequestHeaders.Remove(AuthorizationHeader);
            JwtToken = null;
            IsAuthenticated = false;
            CurrentUser = null;
            _sessionStorage.RemoveItem(JhiAuthenticationtoken);
            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }

        private async Task SetUserAndAuthorizationHeader(JwtToken jwtToken)
        {
            IsAuthenticated = true;
            _httpClient.DefaultRequestHeaders.Remove(AuthorizationHeader);
            _httpClient.DefaultRequestHeaders.Add(AuthorizationHeader, $"Bearer {jwtToken.IdToken}");
            try
            {
                CurrentUser = await _httpClient.GetFromJsonAsync<UserModel>(AccountUrl);
            }
            catch
            {
                IsAuthenticated = false;
            }
            NotifyAuthenticationStateChanged(GetAuthenticationStateAsync());
        }

        public override Task<AuthenticationState> GetAuthenticationStateAsync()
        {
            var identity = new ClaimsIdentity();
            if (IsAuthenticated && CurrentUser != null)
            {
                var claims = new List<Claim>();
                AddClaim(ref claims, ClaimTypes.NameIdentifier, CurrentUser.Login);
                AddClaim(ref claims, ClaimTypes.Name, CurrentUser.FirstName);
                AddClaim(ref claims, ClaimTypes.Email, CurrentUser.Email);
                AddClaim(ref claims, ClaimTypes.GivenName, CurrentUser.FirstName);
                AddClaim(ref claims, ClaimTypes.Surname, CurrentUser.LastName);
                AddClaim(ref claims, "langKey", CurrentUser.LangKey);
                AddClaim(ref claims, "picture", CurrentUser.ImageUrl);
                claims.AddRange(CurrentUser.Roles?.Select(role => new Claim(ClaimTypes.Role,role)) ?? Array.Empty<Claim>());
                identity = new ClaimsIdentity(claims,"JWT Auth");
            }

            return Task.FromResult(new AuthenticationState(new ClaimsPrincipal(identity)));
        }


        private void AddClaim(ref List<Claim> claims,string claimType, string value)
        {
            if (!string.IsNullOrEmpty(value))
            {
                claims.Add(new Claim(claimType,value));
            }
        }
    }
}
