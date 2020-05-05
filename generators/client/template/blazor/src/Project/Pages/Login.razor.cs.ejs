using System.Reflection;
using System.Threading.Tasks;
using JhipsterBlazor.Models;
using JhipsterBlazor.Services;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Authorization;

namespace JhipsterBlazor.Pages
{
    public partial class Login
    {
        [Inject]
        public AuthenticationStateProvider AuthenticationService { get; set; }

        [Inject] 
        public NavigationManager NavigationManager { get; set; }

        public LoginModel LoginModel { get; set; } = new LoginModel();

        public bool IsAuthenticateError { get; set; }

        private async Task HandleSubmit()
        {
            var result = await (AuthenticationService as IAuthenticationService).SignIn(LoginModel);
            IsAuthenticateError = !result; 
            LoginModel = new LoginModel();
            if (result)
            {
                NavigationManager.NavigateTo("/");
            }
        }



    }
}
