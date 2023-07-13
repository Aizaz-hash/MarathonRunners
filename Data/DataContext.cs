using Marathonrunner.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity;
using System.Data;

namespace Marathonrunner.Data
{
    public class DataContext : IdentityDbContext<Users>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Races> races { get; set; } 
        public DbSet<Club> clubs { get; set; } 
        public DbSet<Address> addresses { get; set; } 

        
    }
}
