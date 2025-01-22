namespace App.Dto.Authentication;

public class PasswordChangeDto
{
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
}
