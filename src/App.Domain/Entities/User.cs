using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using App.Domain.Entities.Interfaces;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace App.Domain.Entities;

public class User : IdentityUser, IAuditedEntityBase
{
    public string Login
    {
        get => UserName;
        set => UserName = value;
    }

    [StringLength(50)]
    [Column("first_name")]
    public string FirstName { get; set; }

    [StringLength(50)]
    [Column("last_name")]
    public string LastName { get; set; }

    [Required] public bool Activated { get; set; }

    [StringLength(6, MinimumLength = 2)]
    [Column("lang_key")]
    public string LangKey { get; set; }

    [Url]
    [StringLength(256)]
    [Column("image_url")]
    public string ImageUrl { get; set; }

    [StringLength(20)]
    [Column("activation_key")]
    [JsonIgnore]
    public string ActivationKey { get; set; }

    [StringLength(20)]
    [Column("reset_key")]
    [JsonIgnore]
    public string ResetKey { get; set; }

    [Column("reset_date")] public DateTime? ResetDate { get; set; }

    [JsonIgnore] public virtual ICollection<UserRole> UserRoles { get; set; }

    public string CreatedBy { get; set; }
    public DateTime CreatedDate { get; set; }
    public string LastModifiedBy { get; set; }
    public DateTime LastModifiedDate { get; set; }

    public override bool Equals(object obj)
    {
        if (this == obj) return true;

        if (obj == null || GetType() != obj.GetType()) return false;

        var user = obj as User;
        if (user?.Id == null || Id == null) return false;

        return EqualityComparer<string>.Default.Equals(Id, user.Id);
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Id);
    }

    public override string ToString()
    {
        return "User{" +
               $"ID='{Id}'" +
               $", Login='{Login}'" +
               $", FirstName='{FirstName}'" +
               $", LastName='{LastName}'" +
               $", Email='{Email}'" +
               $", ImageUrl='{ImageUrl}'" +
               $", Activated='{Activated}'" +
               $", LangKey='{LangKey}'" +
               $", ActivationKey='{ActivationKey}'" +
               "}";
    }
}
