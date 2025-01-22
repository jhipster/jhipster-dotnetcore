using System.Security.Authentication;

namespace App.Crosscutting.Exceptions;

public class UserNotActivatedException : AuthenticationException
{
    public UserNotActivatedException(string message) : base(message)
    {
    }
}
