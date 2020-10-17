# Database

## Using database migrations

If you had already run the application before creating your first migration, some database tables might be already 
created automatically on application startup.
So you have the options of removing conflicting tables or editing the migration you just created.
If you wish to automatically apply database migrations when the application is started replace method 
EnsureCreated() by Migrate() at DatabaseStartup.cs file. Be aware of the implications of doing so.
Currently it is up to the user to create migrations.

1. Add EF Core cli tools

With .net core 3.0 the cli tool for entity framework was removed from the core sdk so you need to install it globally. 
You only need to do this once. See [Breaking changes included in EF Core 3.0](https://docs.microsoft.com/pt-br/ef/core/what-is-new/ef-core-3.0/breaking-changes#dotnet-ef) for reference.

```bash
dotnet tool install --global dotnet-ef
```

If using Visual Studio follow the documentation on [Entity Framework Core tools reference - Package Manager Console in Visual Studio](https://docs.microsoft.com/pt-br/ef/core/miscellaneous/cli/powershell)

2. Create the initial database migration

```bash
dotnet ef migrations add InitialCreate --project YourProject.csproj
```

3. Update the database

```bash
dotnet ef database update --project YourProject.csproj
```

Tips: 
- Remember to change the connection string to point to your database at appsettings.json.
- It is a good practice to check your migration files and backup your database before running migrations.

