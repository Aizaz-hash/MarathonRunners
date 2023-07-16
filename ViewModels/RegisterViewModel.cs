using System.ComponentModel.DataAnnotations;
using System.Drawing;

namespace Marathonrunner.ViewModels
{
    public class RegisterViewModel
    {
        [Display(Name ="Email Address")]
        [Required(ErrorMessage ="Email address required")]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }

        [Display(Name = "Confirm Password")]
        [Required(ErrorMessage = "Confirm Password required")]
        [DataType(DataType.Password)]
        [Compare("Password" , ErrorMessage ="Password doesnot match ! ")]
        public string ConfirmPassword { get; set; }

        [Display(Name = "Enter Your city")]
        [Required(ErrorMessage = "Confirm Password required")]
        public string city { get; set; }

        [Display(Name = "Enter Your State")]
        [Required(ErrorMessage = "Confirm Password required")]
        public string state { get; set; }


    }
}
