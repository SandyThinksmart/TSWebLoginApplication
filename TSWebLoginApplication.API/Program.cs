using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using System.Globalization;
using TSWebLoginApplication.Application;
using TSWebLoginApplication.Domain.Model;
using TSWebLoginApplication.Domain.Resources;
using TSWebLoginApplication.Infrastructure;
using TSWebLoginApplication.API.MiddlWares;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyCorsPolicy", policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
builder.Services.AddSingleton<LocalizationServices>();
builder.Services.Configure<EMailSettings>(builder.Configuration.GetSection("EmailSettings"));
builder.Services.Configure<RequestLocalizationOptions>(options =>
{
    var supportedCultures = new[]
    {
                    new CultureInfo("ja-JP"),
                    new CultureInfo("en"),
                 //    new CultureInfo("hi"),

                };
    options.DefaultRequestCulture = new RequestCulture("ja-JP");
    options.SupportedCultures = supportedCultures;
    options.SupportedUICultures = supportedCultures;
    options.RequestCultureProviders = new List<IRequestCultureProvider>
        {
            new QueryStringRequestCultureProvider(),
            new CookieRequestCultureProvider()
        };
    //services.AddMvc().AddRazorOptions(options => options.AllowRecompilingViewsOnFileChange = true);
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();
app.UseHttpsRedirection();

var requestlocalizationOptions = app.Services.GetService<IOptions<RequestLocalizationOptions>>();
app.UseRequestLocalization(requestlocalizationOptions.Value);
app.UseAuthorization();
app.UseRouting();
app.UseMiddleware<ErrorHandler>();
app.MapControllers();
app.UseCors("AllowAnyCorsPolicy");

app.Run();
