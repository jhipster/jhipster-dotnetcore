using System;
using System.Linq;
using System.Linq.Expressions;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using App.Domain.Repositories.Interfaces;
using App.Infrastructure.Data.Extensions;

namespace App.Infrastructure.Data.Repositories;

public class UnitOfWork : IUnitOfWork
{
    protected readonly DbContext _context;

    public UnitOfWork(DbContext context)
    {
        _context = context;
    }

    public void UpdateState<TEntity>(TEntity entity, EntityState state)
    {
        _context.Entry(entity).State = state;
    }

    public void SetEntityStateModified<TEntiy, TProperty>(TEntiy entity, Expression<Func<TEntiy, TProperty>> propertyExpression) where TEntiy : class where TProperty : class
    {
        _context.Entry(entity).Reference(propertyExpression).IsModified = true;
    }

    public void RemoveNavigationProperty<TEntity, TOwnerEntity>(TOwnerEntity ownerEntity, object id)
        where TEntity : class
        where TOwnerEntity : class
    {
        _context.Set<TEntity>().RemoveNavigationProperty(ownerEntity, id);
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        using var saveChangeTask = _context.SaveChangesAsync(cancellationToken);
        return await saveChangeTask;
    }

    public DbSet<T> Set<T>(string name = null) where T : class
    {
        return _context.Set<T>(name);
    }

    public void AddOrUpdateGraph<TEntiy>(TEntiy entity, ICollection<Type> entitiesToBeUpdated = null) where TEntiy : class
    {
        var rootTypeEntity = entity.GetType();

        _context.ChangeTracker.TrackGraph(entity, e =>
        {
            Type navigationPropertyName = e.Entry.Entity.GetType();

            var alreadyTrackedEntity = _context.ChangeTracker.Entries().FirstOrDefault(entry => entry.Entity.Equals(e.Entry.Entity));

            if (alreadyTrackedEntity != null)
            {
                alreadyTrackedEntity.State = EntityState.Detached;
            }

            if (!navigationPropertyName.Equals(rootTypeEntity) && !(entitiesToBeUpdated != null && entitiesToBeUpdated.Contains(navigationPropertyName)))
            {
                e.Entry.State = EntityState.Unchanged;
            }
            else if (e.Entry.IsKeySet)
            {
                e.Entry.State = EntityState.Modified;
            }
            else
            {
                e.Entry.State = EntityState.Added;
            }
            System.Diagnostics.Debug.WriteLine($"Tracking {e.Entry.Metadata.DisplayName()} as {e.Entry.State}");
        });
    }

    public void Dispose()
    {
        _context?.Dispose();
    }
}
