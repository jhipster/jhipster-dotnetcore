using JHipsterNet.Core.Pagination;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace App.Infrastructure.Web.Rest.Utilities;

public static class PaginationUtil
{
    private const string _XTotalCountHeaderName = "X-Total-Count";
    private const string _XPaginationHeaderName = "X-Pagination";
    public static IHeaderDictionary GeneratePaginationHttpHeaders<T>(this IPage<T> page)
        where T : class
    {
        IHeaderDictionary headers = new HeaderDictionary();
        PageResponse pageDto = new PageResponse()
        {
            TotalCount = page.TotalElements,
            TotalPages = page.TotalPages,
            Page = page.Number,
            Size = page.Size,
            HasNext = page.HasNext,
            HasPrevious = page.HasPrevious,
            IsFirst = page.IsFirst,
            IsLast = page.IsLast
        };
        headers.Add(_XTotalCountHeaderName, page.TotalElements.ToString());
        headers.Add(_XPaginationHeaderName, JsonConvert.SerializeObject(pageDto));
        return headers;
    }
}
