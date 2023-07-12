using Marathonrunner.Models;

namespace Marathonrunner.Interfaces
{
    public interface IRaceRepository
    {
        Task<IEnumerable<Races>> GetAll();
        Task<Races> GetByIdAsync(int id);

        Task<IEnumerable<Races>> GetRaceByCategory(string category);
        Task<IEnumerable<Races>> GetRaceByCity(string city);

        bool AddRace(Races race);

        bool UpdateRace(Races race);

        bool DeleteRace(Races race);
        bool Save();
    }
}
