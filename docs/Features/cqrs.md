
# CQRS

## Introduction

CQRS stands for **Command Query Responsibility Segregation**. You have the possibility to use this pattern thanks to [MediatR](https://github.com/jbogard/MediatR).

When generating your application, you can choose to use CQRS. Enabling it will generate a new layer for your commands and queries called Application.

```
├── Namespace.Application
│   ├── Commands                             - Your commands
│   │   ├── MyEntity                         - Your entity
│   │   │   ├── MyEntityCreateCommand        - A command
│   │   │   ├── MyEntityCreateCommandHandler - An handler for your command
│   ├── Queries                              - Your queries
│   │   ├── MyEntity                         - Your entity
│   │   │   ├── MyEntityGetQuery             - A query
│   │   │   ├── MyEntityGetQueryHandler      - An handler for your query
├── Namespace.Crosscutting
├── Namespace.Domain
├── Namespace.Domain.Services
├── Namespace.Dto
├── Namespace.Infrastructure
```

## Create your own Queries or Commands

In order to create your own commands and/or queries you have to create two classes :
- A command/query
- An handler for it

For instance, let's create a query `MyEntityGetQuery.cs`:

```csharp
namespace MyCompany.Application.Queries {
    public class MyEntityGetQuery : IRequest<MyEntity>
    {
        public long Id { get; set; }
    }
}
```
This Query should have an Id and returns a MyEntity object.
Here's the handler `MyEntityGetQueryHandler.cs` :
```csharp
namespace MyCompany.Application.Queries {
    public class MyEntityGetQueryHandler : IRequestHandler<MyEntityGetQuery, MyEntity>
    {
        private IReadOnlyMyEntityRepository _myEntityRepository;

        public MyEntityGetQueryHandler(IReadOnlyMyEntityRepository myEntityRepository)
        {
            _myEntityRepository = myEntityRepository;
        }

        public Task<MyEntity> Handle(MyEntityGetQuery request,
	        CancellationToken cancellationToken)
        {
            return _myEntityRepository.QueryHelper()
                .GetOneAsync(myEntity => myEntity.Id == request.Id);
        }
    }
}
```
Please note that we are using a **ReadOnlyRepository** rather than a service in order to do the segregation between Commands and Queries. Lastly, create your routing method within your controller :
```csharp
[HttpGet("my-entity/{id}")]
public async Task<IActionResult> GetMyEntity([FromRoute] long id)
{
	var result = await _mediator.Send(new MyEntityGetQuery { Id = id });
	return ActionResultUtil.WrapOrNotFound(result);
}
```