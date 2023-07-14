﻿using Marathonrunner.Data.Enum;
using Marathonrunner.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace Marathonrunner.ViewModels
{
    public class CreateRaceViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public IFormFile Image { get; set; }


        public Address Address { get; set; }

        public RaceCategory raceCategory { get; set; }
        public string? userId { get; set; }

    }
}
