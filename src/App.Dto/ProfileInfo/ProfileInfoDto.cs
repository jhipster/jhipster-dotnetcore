using System.Collections.Generic;
using Newtonsoft.Json;

namespace App.Dto.ProfileInfo;

public class ProfileInfoDto
{
    [JsonProperty("display-ribbon-on-profiles")]
    public string DisplayRibbonOnProfiles { get; set; }

    [JsonProperty("activeProfiles")]
    public List<string> ActiveProfiles { get; set; }

    public ProfileInfoDto(string displayRibbonOnProfiles, List<string> activeProfiles)
    {
        DisplayRibbonOnProfiles = displayRibbonOnProfiles;
        ActiveProfiles = activeProfiles;

    }
}
