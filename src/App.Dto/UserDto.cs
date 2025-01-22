using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using App.Crosscutting.Constants;
using Newtonsoft.Json;

namespace App.Dto;

public class UserDto
{
    public string Id { get; set; }

    [Required]
    [RegularExpression(Constants.LoginRegex)]
    [MinLength(1)]
    [MaxLength(50)]
    public string Login { get; set; }

    [MaxLength(50)] public string FirstName { get; set; }

    [MaxLength(50)] public string LastName { get; set; }

    [EmailAddress]
    [MinLength(5)]
    [MaxLength(50)]
    public string Email { get; set; }

    [MaxLength(256)] public string ImageUrl { get; set; }

    public bool Activated { get; set; }

    private string _langKey;

    [MinLength(2)]
    [MaxLength(6)]
    public string LangKey
    {
        get { return _langKey; }
        set { _langKey = value; if (string.IsNullOrEmpty(_langKey)) _langKey = Constants.DefaultLangKey; }
    }

    public string CreatedBy { get; set; }

    public DateTime? CreatedDate { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime? LastModifiedDate { get; set; }

    [JsonProperty(PropertyName = "authorities")]
    [JsonPropertyName("authorities")]
    public ISet<string> Roles { get; set; }
}
