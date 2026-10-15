using Microsoft.Extensions.Localization;
using System.Reflection;

namespace TSWebLoginApplication.Domain.Resources
{
    public class LocalizationServices
    {
        private readonly IStringLocalizer _localizer;

        public LocalizationServices(IStringLocalizerFactory factory)
        {
            var type = typeof(ApplicationResource);
            var assemblyName = new AssemblyName(type.GetTypeInfo().Assembly.FullName!);
            _localizer = factory.Create("ApplicationResource", assemblyName.Name);
        }
        public LocalizedString GetLocalizedHtmlString(string key)
        {
            return _localizer[key];
        }

    }
}