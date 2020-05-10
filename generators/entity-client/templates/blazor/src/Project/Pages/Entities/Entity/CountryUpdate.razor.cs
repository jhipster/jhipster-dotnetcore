using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JhipsterBlazor.Models;
using JhipsterBlazor.Pages.Utils;
using JhipsterBlazor.Services.EntityServices.Country;
using JhipsterBlazor.Services.EntityServices.Region;
using Microsoft.AspNetCore.Components;

namespace JhipsterBlazor.Pages.Entities.Country
{
    public partial class CountryUpdate
    {
        [Parameter]
        public int Id { get; set; }
        
        [Inject] 
        public ICountryService CountryService { get; set; }

        [Inject]
        public IRegionService RegionService { get; set; }

        [Inject]
        public INavigationService NavigationService { get; set; }

        public CountryModel CountryModel { get; set; } = new CountryModel();

        public IEnumerable<long> Regions { get; set; } = new List<long>();

        public long RegionId { get; set; }

        protected override async Task OnInitializedAsync()
        {
            Regions = (await RegionService.GetAll()).Select(region => region.Id);
            if (Id != 0)
            {
                CountryModel = await CountryService.Get(Id.ToString());
                RegionId = CountryModel.Region?.Id ?? 0; 
            }
        }
        private void Back()
        {
            NavigationService.Previous();
        }

        private async Task Save()
        {
            if(RegionId != 0)
            {
                CountryModel.Region = new RegionModel { Id = RegionId };
            }
            if (Id != 0)
            {
                await CountryService.Update(CountryModel);
            }
            else
            {
                await CountryService.Add(CountryModel);
            }
            NavigationService.Previous();
        }
    }
}
