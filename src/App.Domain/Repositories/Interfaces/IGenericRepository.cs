using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using Microsoft.EntityFrameworkCore.Query;
using App.Domain.Entities;

namespace App.Domain.Repositories.Interfaces;

public interface IGenericRepository<TEntity, TKey> : IReadOnlyGenericRepository<TEntity, TKey> where TEntity : BaseEntity<TKey>
{
    Task<TEntity> CreateOrUpdateAsync(TEntity entity);
    Task<TEntity> CreateOrUpdateAsync(TEntity entity, ICollection<Type> entitiesToBeUpdated);
    Task DeleteByIdAsync(TKey id);
    Task DeleteAsync(TEntity entity);
    Task Clear();
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    TEntity Add(TEntity entity);
    bool AddRange(params TEntity[] entities);
    TEntity Attach(TEntity entity);
    TEntity Update(TEntity entity);
    bool UpdateRange(params TEntity[] entities);
}
