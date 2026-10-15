using Microsoft.Extensions.DependencyInjection;
using TSWebLoginApplication.Application.Persistence.Services;
using TSWebLoginApplication.Application.Services;

namespace TSWebLoginApplication.Application
{
    public static class ApplicationServiceRegistration
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {

            
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IMenuService, MenuService>();
            services.AddScoped<IPMSMenuService, PMSMenuService>();
            services.AddScoped<IAdministratorService, AdministratorService>();
            services.AddScoped<IHostInvoiceService, HostInvoiceService>();
            services.AddSingleton<IEMailSenderService, EMailSenderService>();
            return services;
        }
    }
}