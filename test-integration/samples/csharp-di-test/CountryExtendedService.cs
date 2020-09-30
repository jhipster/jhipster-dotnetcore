using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using JhipsterSampleApplication.Domain;
using JhipsterSampleApplication.Infrastructure.Data;
using JhipsterSampleApplication.Domain.Services.Interfaces;
using JhipsterSampleApplication.Domain.Services;

namespace JhipsterSampleApplication.Domain.Services {
    public class CountryExtendedService : CountryService, ICountryService 
    {
        public CountryExtendedService(ApplicationDatabaseContext applicationDatabaseContext) : base(applicationDatabaseContext)
        {
        }

        public override async Task<Country> Save(Country country)
        {
            // add custom business logic
            return await base.Save(country);
        }

        public override async Task<IPage<Country>> FindAll(IPageable pageable)
        {
            // add custom business logic
            return await base.FindAll(pageable);
        }

        public override async Task<Country> FindOne(long id)
        {
            // add custom business logic
            return await base.FindOne(id);
        }

        public override async Task Delete(long id)
        {
            // add custom business logic
            await base.Delete(id);
        }
    }
}
