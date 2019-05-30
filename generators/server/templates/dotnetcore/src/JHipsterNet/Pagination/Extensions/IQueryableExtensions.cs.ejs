using System;
using System.Linq;
using JHipsterNet.Pagination.Binders;

namespace JHipsterNet.Pagination.Extensions {
    public static class QueryableExtensions {
        public static IPage<TEntity> UsePageable<TEntity>(this IQueryable<TEntity> receiver, IPageable pageable)
            where TEntity : class
        {
            var entities = receiver.Skip(pageable.Offset)
                .Take(Math.Min(pageable.PageSize, PageableBinderConfig.DefaultMaxPageSize));
            return new Page<TEntity>(entities.ToList(), pageable, entities.Count());
        }
    }
}
