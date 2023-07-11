using Marathonrunner.Data.Enum;
using Marathonrunner.Models;
using Microsoft.AspNetCore.Identity;

namespace Marathonrunner.Data
{
    public class Seed
    {
        public static void SeedData(IApplicationBuilder applicationBuilder)
        {
            using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetService<DataContext>();

                if (context == null)
                {
                    System.Console.WriteLine("null error");
                }
                else
                {
                    context.Database.EnsureCreated();

                    if (!context.clubs.Any())
                    {
                        context.clubs.AddRange(new List<Club>()
                    {
                        new Club()
                        {
                            Title = "Running Club 1",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first cinema",
                            clubCategory = ClubCategory.City,
                            Address = new Address()
                            {
                                street = "123 Main St",
                                city = "Charlotte",
                                state = "NC"
                            }
                         },
                        new Club()
                        {
                            Title = "Running Club 2",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first cinema",
                            clubCategory = ClubCategory.Endurance,
                            Address = new Address()
                            {
                                street = "123 Main St",
                                city = "Charlotte",
                                state = "NC"
                            }
                        },
                        new Club()
                        {
                            Title = "Running Club 3",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first club",
                            clubCategory = ClubCategory.Trail,
                            Address = new Address()
                            {street = "123 Main St", city = "Charlotte", state = "NC"}
                        },
                        new Club()
                        {
                            Title = "Running Club 3",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first club",
                            clubCategory = ClubCategory.City,
                            Address = new Address()
                            {
                                street = "123 Main St",
                                city = "Michigan",
                                state = "NC"
                            }
                        }
                    });
                        context.SaveChanges();
                    }
                    //Races
                    if (!context.races.Any())
                    {
                        context.races.AddRange(new List<Races>()
                    {
                        new Races()
                        {
                            Title = "Running Race 1",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first race",
                            raceCategory = RaceCategory.Marathon,
                            Address = new Address()
                            {
                                street = "123 Main St",
                                city = "Charlotte",
                                state = "NC"
                            }
                        },
                        new Races()
                        {
                            Title = "Running Race 2",
                            Image = "https://www.eatthis.com/wp-content/uploads/sites/4/2020/05/running.jpg?quality=82&strip=1&resize=640%2C360",
                            Description = "This is the description of the first race",
                            raceCategory = RaceCategory.Ultra,
                            AddressId = 5,
                            Address = new Address()
                            {
                                street = "123 Main St",
                                city = "Charlotte",
                                state= "NC"
                            }
                        }
                    });
                        context.SaveChanges();
                    }
                }

                
            }
        }

        //    public static async Task SeedUsersAndRolesAsync(IApplicationBuilder applicationBuilder)
        //    {
        //        using (var serviceScope = applicationBuilder.ApplicationServices.CreateScope())
        //        {
        //            //Roles
        //            var roleManager = serviceScope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

        //            if (!await roleManager.RoleExistsAsync(UserRoles.Admin))
        //                await roleManager.CreateAsync(new IdentityRole(UserRoles.Admin));
        //            if (!await roleManager.RoleExistsAsync(UserRoles.User))
        //                await roleManager.CreateAsync(new IdentityRole(UserRoles.User));

        //            //Users
        //            var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<Users>>();
        //            string adminUserEmail = "teddysmithdeveloper@gmail.com";

        //            var adminUser = await userManager.FindByEmailAsync(adminUserEmail);
        //            if (adminUser == null)
        //            {
        //                var newAdminUser = new Users()
        //                {
        //                    UserName = "teddysmithdev",
        //                    Email = adminUserEmail,
        //                    EmailConfirmed = true,
        //                    Address = new Address()
        //                    {
        //                        street = "123 Main St",
        //                        city = "Charlotte",
        //                        state = "NC"
        //                    }
        //                };
        //                await userManager.CreateAsync(newAdminUser, "Coding@1234?");
        //                await userManager.AddToRoleAsync(newAdminUser, UserRoles.Admin);
        //            }

        //            string appUserEmail = "user@etickets.com";

        //            var appUser = await userManager.FindByEmailAsync(appUserEmail);
        //            if (appUser == null)
        //            {
        //                var newAppUser = new Users()
        //                {
        //                    UserName = "app-user",
        //                    Email = appUserEmail,
        //                    EmailConfirmed = true,
        //                    Address = new Address()
        //                    {
        //                        street = "123 Main St",
        //                        city = "Charlotte",
        //                        state = "NC"
        //                    }
        //                };
        //                await userManager.CreateAsync(newAppUser, "Coding@1234?");
        //                await userManager.AddToRoleAsync(newAppUser, UserRoles.User);
        //            }
        //        }
        //    }
        //}
    }
}
