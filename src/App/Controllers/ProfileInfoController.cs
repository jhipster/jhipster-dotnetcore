using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using App.Dto.ProfileInfo;

namespace App.Controllers;

[Route("management")]
[ApiController]
public class ProfileInfoController : ControllerBase
{

    private readonly ILogger<ProfileInfoController> _log;
    private readonly IHostEnvironment _environment;
    private readonly IConfiguration _configuration;

    public ProfileInfoController(ILogger<ProfileInfoController> log, IHostEnvironment environment, IConfiguration configuration)
    {
        _log = log;
        _environment = environment;
        _configuration = configuration;
    }

    [HttpGet("info")]
    public ActionResult<ProfileInfoDto> GetProfileInfos()
    {
        _log.LogDebug("REST request to get profile informations");
        return Ok(new ProfileInfoDto(GetDisplayRibbonOnProfiles(), GetActiveProfile()));
    }

    private List<string> GetActiveProfile()
    {
        var activeProfiles = new List<string>
        {
            "api-docs"
        };

        if (_environment.IsDevelopment())
        {
            activeProfiles.Add("dev");
        }
        else if (_environment.IsProduction())
        {
            activeProfiles.Add("prod");
        }
        else if (_environment.IsStaging())
        {
            activeProfiles.Add("stag");
        }
        return activeProfiles;
    }

    private string GetDisplayRibbonOnProfiles()
    {
        return _configuration.GetSection("RibbonInfo")["display-ribbon-on-profiles"];
    }
}
