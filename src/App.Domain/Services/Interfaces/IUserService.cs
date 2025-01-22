using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using JHipsterNet.Core.Pagination;
using App.Crosscutting.Constants;
using App.Crosscutting.Exceptions;
using App.Domain.Entities;

namespace App.Domain.Services.Interfaces;

public interface IUserService
{
    Task<User> CreateUser(User userToCreate);
    Task<IPage<User>> GetAllManagedUsers(IPageable pageable);
    Task<User> GetByLogin(string login);
    IEnumerable<string> GetAuthorities();
    Task DeleteUser(string login);
    Task<User> UpdateUser(User userToUpdate);
    Task<User> CompletePasswordReset(string newPassword, string key);
    Task<User> RequestPasswordReset(string mail);
    Task ChangePassword(string currentClearTextPassword, string newPassword);
    Task<User> ActivateRegistration(string key);
    Task<User> RegisterUser(User userToRegister, string password);
    Task UpdateUser(string firstName, string lastName, string email, string langKey, string imageUrl);
    Task<User> GetUserWithUserRoles();
    Task<IPage<User>> GetAllPublicUsers(IPageable pageable);
}
