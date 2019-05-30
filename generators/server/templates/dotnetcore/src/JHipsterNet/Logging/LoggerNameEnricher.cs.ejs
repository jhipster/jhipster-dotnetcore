using System.Linq;
using Serilog.Core;
using Serilog.Events;

namespace JHipsterNet.Logging {
    public class LoggerNameEnricher: ILogEventEnricher {

        public void Enrich(LogEvent logEvent, ILogEventPropertyFactory propertyFactory)
        {
            var sourceContext = logEvent.Properties["SourceContext"].ToString().Trim('"');
            logEvent.AddPropertyIfAbsent(propertyFactory.CreateProperty("LoggerName", GetAbbreviatedClassName(sourceContext, 39)));
        }

//        GetAbbreviatedClassName(null).Should().Be("");
//        GetAbbreviatedClassName("Microsoft.AspNetCore.Hosting.WebHost").Should().Be("WebHost");
//        GetAbbreviatedClassName("Microsoft.AspNetCore.Hosting.WebHost", 1).Should().Be("M.A.H.WebHost");
//        GetAbbreviatedClassName("Microsoft.AspNetCore.Hosting.WebHost", 17).Should().Be("M.A.H.WebHost");
//        GetAbbreviatedClassName("Microsoft.AspNetCore.Hosting.WebHost", 18).Should().Be("M.A.Hosting.WebHost");
//        GetAbbreviatedClassName("Microsoft.AspNetCore.Hosting.WebHost", 40).Should().Be("Microsoft.AspNetCore.Hosting.WebHost");

        private static string GetAbbreviatedClassName(string fullQualifiedClassName, int length = 0)
        {
            if (string.IsNullOrEmpty(fullQualifiedClassName)) {
                return "";
            }

            var parts = fullQualifiedClassName.Split('.');
            var className = parts.Last();

            if (length == 0) {
                return className;
            }

            var output = new string[parts.Length];
            output[parts.Length - 1] = className;

            // -1 for the '.' character
            var availableSpace = length - className.Length - 1;

            for (var i = parts.Length - 2; i >= 0; i--) {
                var nameSpace = parts[i];
                availableSpace = availableSpace - nameSpace.Length - 1;
                if (availableSpace > 0) {
                    output[i] = nameSpace;
                }
                else {
                    output[i] = nameSpace.Substring(0, 1);
                }
            }
            return string.Join(".", output);
        }
    }
}
