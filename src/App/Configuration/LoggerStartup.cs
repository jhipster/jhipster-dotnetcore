using System;
using System.Collections.Generic;
using System.Security.Authentication;
using System.Threading.Tasks;
using App.Domain.Entities;
using JHipsterNet.Web.Logging;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Sinks.Syslog;

namespace App.Configuration;

public static class SerilogConfiguration
{
    const string SerilogSection = "Serilog";
    const string SyslogPort = "SyslogPort";
    const string SyslogUrl = "SyslogUrl";
    const string SyslogAppName = "SyslogAppName";

    /// <summary>
    /// Create application logger from configuration.
    /// </summary>
    /// <returns></returns>
    public static ILoggingBuilder AddSerilog(this ILoggingBuilder loggingBuilder, IConfiguration appConfiguration)
    {
        var port = 6514;

        // for logger configuration
        // https://github.com/serilog/serilog-settings-configuration
        if (appConfiguration.GetSection(SerilogSection)[SyslogPort] != null)
        {
            if (int.TryParse(appConfiguration.GetSection(SerilogSection)[SyslogPort], out var portFromConf))
            {
                port = portFromConf;
            }
        }

        var url = appConfiguration.GetSection(SerilogSection)[SyslogUrl] != null
            ? appConfiguration.GetSection(SerilogSection)[SyslogUrl]
            : "localhost";
        var appName = appConfiguration.GetSection(SerilogSection)[SyslogAppName] != null
            ? appConfiguration.GetSection(SerilogSection)[SyslogAppName]
            : "AppApp";
        var loggerConfiguration = new LoggerConfiguration()
            .Enrich.With<LoggerNameEnricher>()
            .WriteTo.TcpSyslog(url, port, appName)
            .ReadFrom.Configuration(appConfiguration);

        Log.Logger = loggerConfiguration.CreateLogger();

        return loggingBuilder.AddSerilog(Log.Logger);
    }
}
