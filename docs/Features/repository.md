# Repository

Creating/Updating entities should be done using the CreateOrUpdateAsync method. Simple queries are possible with the methods GetOne, GetAll and GetPage. Finally, deleting by id is implemented by the Delete method.

As with services, repositories classes/interfaces can also be extended by the developer and automatically registered with the DI container.

## QueryHelper

More advanced queries are possible by using the the QueryHelper method to fluently adding filter, order and/or disabling entity tracking and seleting results.

Example:

```csharp
var page = await _countryRepository.QueryHelper()
    .Include(country => country.Region)
    .GetPageAsync(pageable);
```

## Add, AddRange, Attach, Update and UpdateRange

Add, AddRange, Attach, Update and UpdateRange are repository's utility methods for the DbSet's methods and can be used by the developers when doing multiple database operations.
Those methods manipulate the change tracker and sets the state of the entitities to Added/Modified/Deleted/Unchanged and do not produce queries if SaveChangesAsync method is not called. Those methods are **not** async. AddAsync should only be used on special cases. See Microsoft's documentation [here](https://docs.microsoft.com/en-us/dotnet/api/microsoft.entityframeworkcore.dbcontext.addasync?view=efcore-3.1).
