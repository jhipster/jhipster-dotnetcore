using System.ComponentModel.DataAnnotations;

namespace App.Dto.Authentication;

public class LoginDto
{
    [Required]
    [StringLength(50, MinimumLength = 1)]
    public string Username { get; set; }

    [Required]
    [StringLength(100, MinimumLength = 4)]
    public string Password { get; set; }

    [Required] public bool RememberMe { get; set; }

    public override string ToString()
    {
        return "LoginDto{" +
               $"Username='{Username}'" +
               $", Password='{Password}'" +
               $", RememberMe='{RememberMe}'" +
               "}";
    }
}
