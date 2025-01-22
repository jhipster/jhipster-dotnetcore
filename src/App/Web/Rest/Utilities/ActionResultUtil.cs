using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Rest.Utilities;

public static class ActionResultUtil
{
    public static ActionResult WrapOrNotFoundAsDto<TDtoType>(object value, IMapper mapper)
    {
        if (value != null)
        {
            var resultAsDto = mapper.Map<TDtoType>(value);
            return (ActionResult)new OkObjectResult(resultAsDto);
        }
        return new NotFoundResult();
    }


    public static ActionResult WrapOrNotFound(object value)
    {
        return value != null ? (ActionResult)new OkObjectResult(value) : new NotFoundResult();
    }
}
