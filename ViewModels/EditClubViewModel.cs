﻿using Marathonrunner.Data.Enum;
using Marathonrunner.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marathonrunner.ViewModels
{
    public class EditClubViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public string? URL { get; set; }
        public int AddressId { get; set; }
        public Address? Address { get; set; }
        public ClubCategory clubCategory { get; set; }
        public string? userId { get; set; }




    }
}
