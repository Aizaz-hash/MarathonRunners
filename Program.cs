using Marathonrunner.Data;
using Marathonrunner.Interfaces;
using Marathonrunner.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddTransient<Seed>();
builder.Services.AddScoped<IClubRepository, ClubRespository>();
builder.Services.AddScoped<IRaceRepository, RaceRepository>();
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DbConenction")));


var app = builder.Build();

if (args.Length == 1 && args[0].ToLower() == "seeddata")
{
    //await Seed.SeedUsersAndRolesAsync(app);
    Seed.SeedData(app);
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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
