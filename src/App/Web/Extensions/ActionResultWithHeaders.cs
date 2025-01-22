using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace App.Web.Extensions;

public class ActionResultWithHeaders : ActionResult
{
    private readonly IHeaderDictionary _headers;
    private readonly ActionResult _result;

    public ActionResultWithHeaders(ActionResult receiver, IHeaderDictionary headers)
    {
        _result = receiver;
        _headers = headers;
    }

    private void AddHeaders(HttpResponse response)
    {
        foreach (var (name, value) in _headers) response.Headers.Add(name, value);
    }

    public override Task ExecuteResultAsync(ActionContext context)
    {
        AddHeaders(context.HttpContext.Response);
        return _result.ExecuteResultAsync(context);
    }

    public override void ExecuteResult(ActionContext context)
    {
        AddHeaders(context.HttpContext.Response);
        _result.ExecuteResult(context);
    }
}
