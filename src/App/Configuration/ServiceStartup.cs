using Scrutor;
using Microsoft.Extensions.DependencyInjection;
using App.Domain.Services;
using App.Domain.Services.Interfaces;

namespace App.Configuration;

public static class ServiceStartup
{
    public static IServiceCollection AddServiceModule(this IServiceCollection services)
    {
        services.Scan(scan => scan
            .FromAssembliesOf(typeof(ServicesInterfacesAssemblyHelper), typeof(ServicesClassesAssemblyHelper))
                // Find services and register its matching interfaces/implementations.
                // For example: JobService matches IJobService, EmployeeService matches IEmployeeService, etc...
                .AddClasses(classes => classes.InNamespaces(ServicesClassesAssemblyHelper.Namespace))
                    .UsingRegistrationStrategy(RegistrationStrategy.Replace(ReplacementBehavior.ServiceType))
                    .AsMatchingInterface()
                    .WithScopedLifetime()

                // Now find services with class name ending with 'ExtendedService' and register it to interfaces
                // it implements.
                // For example: if JobExtendedService class is present and implements IJobService, then register
                // it as the implementation for IJobService, replacing the generated service class (JobService).
                .AddClasses(classes => classes.Where(type => type.Namespace.Equals(ServicesClassesAssemblyHelper.Namespace) &&
                                                            type.Name.EndsWith("ExtendedService")))
                    .UsingRegistrationStrategy(RegistrationStrategy.Replace(ReplacementBehavior.ServiceType))
                    .AsImplementedInterfaces()
                    .WithScopedLifetime()
        );
        return services;
    }
}
