using System.ComponentModel.DataAnnotations;

namespace Marathonrunner.Models
{
    public class Address
    {
        [Key]   
        public int Id{get;set;}
        public string street{get;set;}
        public string city{get;set;}
        public string state{get;set;}
    }
}
