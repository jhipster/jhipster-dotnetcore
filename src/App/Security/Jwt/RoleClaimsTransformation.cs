using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace App.Security.Jwt;

public class RoleClaimsTransformation : IClaimsTransformation
{
    private readonly ITokenProvider _tokenProvider;

    public RoleClaimsTransformation(ITokenProvider tokenProvider)
    {
        _tokenProvider = tokenProvider;
    }

    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        return Task.FromResult(_tokenProvider.TransformPrincipal(principal));
    }
}
