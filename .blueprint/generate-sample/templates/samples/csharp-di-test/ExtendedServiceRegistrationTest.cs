using FluentAssertions;
using JhipsterSampleApplication.Domain.Services;
using JhipsterSampleApplication.Domain.Services.Interfaces;
using JhipsterSampleApplication.Test.Setup;
using Xunit;

namespace JhipsterSampleApplication.Test.DependencyInjection;

[Collection("MongoDB")]
public class ExtendedServiceRegistrationTest
{
    public ExtendedServiceRegistrationTest()
    {
        _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
        _factory.CreateClient();
        _countryService = _factory.GetRequiredService<ICountryService>();
        _departmentService = _factory.GetRequiredService<IDepartmentService>();
    }

    private readonly AppWebApplicationFactory<TestStartup> _factory;
    private readonly ICountryService _countryService;
    private readonly IDepartmentService _departmentService;

    [Fact]
    public void TestAutomaticRegistration()
    {
        _departmentService.Should().BeOfType<DepartmentService>();
    }

    [Fact]
    public void TestExtendedServiceClassAutomaticRegistration()
    {
        _countryService.Should().BeOfType<CountryExtendedService>();
    }
}
