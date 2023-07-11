using Marathonrunner.Data.Enum;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marathonrunner.Models
{
    public class Races
    {
        [Key]
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Image { get; set; }

        [ForeignKey("Address")]

        public int AddressId { get; set; }

        public Address Address { get; set; }

        public RaceCategory raceCategory { get; set; }

        [ForeignKey("Users")]
        public string? userId { get; set; }

        public Users ? Users { get;set; }


    }
}
