using System.Threading.Tasks;
using JhipsterBlazor.Models;
using JhipsterBlazor.Pages.Utils;
using JhipsterBlazor.Services.EntityServices.Country;
using Microsoft.AspNetCore.Components;

namespace JhipsterBlazor.Pages.Entities.Country
{
    public partial class CountryDetail
    {
        [Parameter]
        public int Id { get; set; }

        [Inject] 
        public ICountryService CountryService { get; set; }

        [Inject]
        public INavigationService NavigationService { get; set; }

        public CountryModel Country { get; set; } = new CountryModel();

        protected override async Task OnInitializedAsync()
        {
            if (Id != 0)
            {
                Country = await CountryService.Get(Id.ToString()); 
            }
        }

        private void Back()
        {
            NavigationService.Previous();
        }
    }
}
