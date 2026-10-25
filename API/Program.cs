using API.Middleware;
using Application.Activities.Queries;
using Application.Core;
using Application.Validators;
using Domain;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(opt =>
{
    AuthorizationPolicy policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddCors();
builder.Services.AddMediatR(cfg =>
{
    cfg.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    cfg.AddOpenBehavior(typeof(ValidationBehavior<,>));
    cfg.LicenseKey = builder.Configuration["Licences:MediatR"];
});

builder.Services.AddAutoMapper(cfg =>
{
    cfg.LicenseKey = builder.Configuration["Licences:MediatR"];
}, typeof(MappingProfiles));

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
builder.Services.AddTransient<ExceptionMiddleware>();
builder.Services.AddIdentityApiEndpoints<User>(opt =>
    {
        opt.User.RequireUniqueEmail = true;
        //opt.SignIn.RequireConfirmedEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>();

WebApplication app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(options =>
    options.AllowAnyMethod().AllowAnyHeader().AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapGroup("api").MapIdentityApi<User>();

using IServiceScope scope = app.Services.CreateScope();
IServiceProvider services = scope.ServiceProvider;

try
{
    AppDbContext context = services.GetRequiredService<AppDbContext>();
    UserManager<User> userManager = services.GetRequiredService<UserManager<User>>();
    await context.Database.MigrateAsync();
    await DbInitializer.SeedData(context, userManager);
}
catch (Exception ex)
{
    ILogger<Program> logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}



await app.RunAsync();
