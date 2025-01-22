using System;
using System.Linq;
using System.Net.Http;
using System.Text;
using FluentAssertions;
using Newtonsoft.Json;

namespace App.Test.Controllers;

public static class TestUtil
{
    private static readonly Random random = new Random();

    public static HttpContent ToJsonContent(object model)
    {
        return ToJsonContent(model, Encoding.UTF8);
    }

    public static HttpContent ToJsonContent(object model, Encoding encoding)
    {
        return new StringContent(JsonConvert.SerializeObject(model), encoding, "application/json");
    }

    public static string RandomAlphabetic(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public static string RandomNumeric(int length)
    {
        const string chars = "0123456789";
        return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
    }

    public static void EqualsVerifier(Type type)
    {
        var domainObject1 = Activator.CreateInstance(type);
        domainObject1.ToString().Should().NotBeNullOrEmpty();
        domainObject1.Should().Be(domainObject1);
        domainObject1.GetHashCode().Should().Be(domainObject1.GetHashCode());
        // Test with an instance another class
        var testOtherObject = new object();
        domainObject1.Should().NotBe(testOtherObject);
        domainObject1.Should().NotBeNull();
        // Test with an instance of the same class
        var domainObject2 = Activator.CreateInstance(type);
        domainObject1.Should().NotBe(domainObject2);
    }

    public static void BuildHttpContextWithMockUser(string username)
    {
        //            var mock = new Mock<HttpContext>();
        //            mock.Setup(httpContext => httpContext.User).Returns(null);
    }
}
