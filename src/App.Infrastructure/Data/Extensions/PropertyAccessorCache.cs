using System.Collections.Generic;
using System.Linq.Expressions;
using System.Reflection;

namespace App.Infrastructure.Data.Extensions;

public static class PropertyAccessorCache<T> where T : class
{
    private static readonly IDictionary<string, LambdaExpression> _cache;

    static PropertyAccessorCache()
    {
        var storage = new Dictionary<string, LambdaExpression>();

        var t = typeof(T);
        var parameter = Expression.Parameter(t, "p");
        foreach (var property in t.GetProperties(BindingFlags.Public | BindingFlags.Instance))
        {
            var propertyAccess = Expression.MakeMemberAccess(parameter, property);
            var lambdaExpression = Expression.Lambda(propertyAccess, parameter);
            storage[property.Name] = lambdaExpression;
        }

        _cache = storage;
    }

    public static LambdaExpression Get(string propertyName)
    {
        return _cache.TryGetValue(propertyName, out LambdaExpression result) ? result : null;
    }
}
