using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using TSWebLoginApplication.Application.Persistence.Repositories;
using TSWebLoginApplication.Infrastructure.Repositories;

namespace TSWebLoginApplication.Infrastructure
{
    public static class InfrastructureServiceRegistration
    {
        public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
        {

            
            services.AddScoped<ILoginRepository, LoginRepository>();
            services.AddScoped<IMenuRepository, MenuRepository>();
            services.AddScoped<IPMSMenuRepository, PMSMenuRepository>();
            services.AddScoped<IAdministratorRepository, AdministratorRepository>();
            services.AddScoped<IHostInvoiceRepository, HostInvoiceRepository>();
            return services;
        }

    }
}