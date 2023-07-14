using Marathonrunner.Models;

namespace Marathonrunner.Interfaces
{
    public interface IDashboardRespository
    {
        Task<List<Races>> GetAllUserRaces();
        Task<List<Club>> GetAllUserClubs();
    }
}
