using System;

namespace App.Crosscutting.Exceptions;

public abstract class BaseException : Exception
{
    public BaseException(string type, string detail) : this(type, detail, null, null)
    {
    }

    public BaseException(string type, string detail, string entityName) : this(type, detail, entityName, null)
    {
    }

    public BaseException(string type, string detail, string entityName, string errorKey) : base(detail)
    {
        Type = type;
        Detail = detail;
        EntityName = entityName;
        ErrorKey = errorKey;
    }

    public string Type { get; set; }
    public string Detail { get; set; }
    public string EntityName { get; set; }
    public string ErrorKey { get; set; }
}
