using Microsoft.Extensions.Configuration;

namespace App.Configuration;

public static class ConfigurationHelper
{
    public static TModel GetOptions<TModel>(this IConfiguration configuration, string section) where TModel : new()
    {
        var model = new TModel();
        configuration.GetSection(section).Bind(model);

        return model;
    }
}
