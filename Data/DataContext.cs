using Marathonrunner.Models;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Marathonrunner.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<Races> races { get; set; } 
        public DbSet<Club> clubs { get; set; } 
        public DbSet<Address> addresses { get; set; } 

        
    }
}
