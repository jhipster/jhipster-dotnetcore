namespace App.Infrastructure.Configuration;

public class MongoDatabaseConfig : IMongoDatabaseConfig
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}
