using App.Dto;
using App.Security.Jwt;
using App.Domain.Services.Interfaces;
using App.Dto.Authentication;
using App.Web.Extensions;
using App.Crosscutting.Constants;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace App.Controllers;

[Route("api")]
[ApiController]
public class UserJwtController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ITokenProvider _tokenProvider;

    public UserJwtController(IAuthenticationService authenticationService, ITokenProvider tokenProvider)
    {
        _authenticationService = authenticationService;
        _tokenProvider = tokenProvider;
    }

    [HttpPost("authenticate")]
    public async Task<ActionResult<JwtToken>> Authorize([FromBody] LoginDto loginDto)
    {
        var user = await _authenticationService.Authenticate(loginDto.Username, loginDto.Password);
        var rememberMe = loginDto.RememberMe;
        var jwt = _tokenProvider.CreateToken(user, rememberMe);
        var httpHeaders = new HeaderDictionary
        {
            [JwtConstants.AuthorizationHeader] = $"{JwtConstants.BearerPrefix} {jwt}"
        };
        return Ok(new JwtToken(jwt)).WithHeaders(httpHeaders);
    }
}

public class JwtToken
{
    public JwtToken(string idToken)
    {
        IdToken = idToken;
    }

    [JsonProperty("id_token")] private string IdToken { get; }
}
