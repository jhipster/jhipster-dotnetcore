using App.Crosscutting.Constants;

namespace App.Crosscutting.Exceptions;

public class InternalServerErrorException : BaseException
{
    public InternalServerErrorException(string message) : base(ErrorConstants.DefaultType, message)
    {
    }
}
