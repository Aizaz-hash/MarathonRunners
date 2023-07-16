using Marathonrunner.Data;
using Marathonrunner.Helpers;
using Marathonrunner.Interfaces;
using Marathonrunner.Models;
using Marathonrunner.Repository;
using Marathonrunner.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RunGroopWebApp.Data;

var builder = WebApplication.CreateBuilder(args);


// Add services to the controllers.
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<Seed>();

//local db services
builder.Services.AddScoped<IClubRepository, ClubRespository>();
builder.Services.AddScoped<IRaceRepository, RaceRepository>();
builder.Services.AddScoped<IPhotoService ,  PhotoService>();
builder.Services.AddScoped<IDashboardRespository ,  DashboardRespository>();
builder.Services.AddScoped<IUserRepository ,  UserRepository>();

//cloud photo uplaoding to cloudaniry
builder.Services.Configure<CloudinarySettings>(builder.Configuration.GetSection("CloudinarySettings"));

//data context
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConenction")));


//identity setup
builder.Services.AddIdentity<Users , IdentityRole>()
    .AddEntityFrameworkStores<DataContext>();

//memory cache
builder.Services.AddMemoryCache();

//sessions
builder.Services.AddSession();

//user authenticaton and cookie
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie();

var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
{
    await Seed.SeedUsersAndRolesAsync(app);
    //Seed.SeedData(app);
}


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
