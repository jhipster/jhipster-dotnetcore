using System.Collections.Generic;
using System.Threading.Tasks;
using JhipsterBlazor.Models;

namespace JhipsterBlazor.Services.EntityServices.Country
{
    public interface ICountryService
    {
        public Task<IList<CountryModel>> GetAll();

        public Task<CountryModel> Get(string id);

        public Task Add(CountryModel model);

        Task Update(CountryModel model);
    }
}
