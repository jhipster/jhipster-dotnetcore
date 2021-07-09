# Services

## Generating Services

You can use services to move business logic away from controllers. It also allows you to use DTOs.

You can generate services using the entity generator:

`jhipster entity newentity`

Or by using JDL:

 `service all with serviceImpl except Employee, Job`

Notice that only the service with interface option (serviceImpl) is enabled on this generator.

## Extending and Customizing Services

One common use case is to customize service classes to suit different business needs. When using the jhipster generator to edit an existing entity or upgrading the generator's version, changes to the generated service classes might be overwritten. Altough it is possible to make changes directly to generated service classes, It might get tricky keeping track of changes.

Optionally, you can extend and customize service classes to avoid service class code overwriting.

Example:
Add an Author entity with service generation enabled by using the generator's cli.
Then create the following class named `AuthorExtendedService.cs`:

```csharp
namespace MyCompany.Domain.Services {
    public class AuthorExtendedService : AuthorService, IAuthorService
    {
        public CountryExtendedService(ApplicationDatabaseContext applicationDatabaseContext) : base(applicationDatabaseContext)
        {
        }

        public override async Task Delete(long id)
        {
            // add custom business logic before delete
            await base.Delete(id);
        }
    }
}
```

AuthorExtendedService class will override one specific method of its base class (or more if you wish) adding custom business logic and AuthorExtendedService class will be automatically be registered with the dotnet container. Any code using the IAuthorService dependency will use this class for its implementation.

Currently the automatic registration strategy for class/interface is used only for service and repository classes/interfaces and more details are explained below.

## Automatic Service Registration In DI Container

Under the hood this project uses reflection for assembly scanning to automatically register service classes/interfaces with dotnet's dependency injection container.  Implementation details can be found at `ServiceStartup.cs` file located at `src/ProjectName/Configuration/` folder.

The following steps are used to automatically register service classes and interfaces:
- Scan `ProjectName.Domain.Services.Interfaces` namespace (at `ProjectName.Domain` assembly) for service interfaces and `ProjectName.Domain.Services` namespace (at `ProjectName.Domain.Services` assembly) for service classes.
- Find matching classes and its interfaces using the "I" prefix convention for interface name. This step registers the generated service classes/interfaces since they use "I" interface prefix convention, but user-defined services and interfaces can also be automatically registered using this convention.
For example: JobService class matches IJobService interface, EmployeeService class matches IEmployeeService interface, MyNewService class matches IMyNewService interface, etc...
- Service class names ending with 'ExtendedService' have higher priority for registration on the DI container. This is useful to make sure that the class will be registered and will replace any existing DI registrations.
For example: if JobExtendedService class is present and implements IJobService, then replace existing registrations.
