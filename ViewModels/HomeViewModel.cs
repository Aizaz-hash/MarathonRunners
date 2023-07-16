using Marathonrunner.Models;

namespace Marathonrunner.ViewModels
{
    public class HomeViewModel
    {
        public IEnumerable<Club>? Clubs { get; set; }
        public string? city { get; set; }
        public string? state { get; set; }
    }
}
