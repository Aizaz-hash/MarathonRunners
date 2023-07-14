using Marathonrunner.Models;

namespace Marathonrunner.Interfaces
{
    public interface IUserRepository
    {
        Task<IEnumerable<Users>> GetAllUsers();

        Task<Users> GetUsersById(string id);

        bool Add(Users user);

        bool Update(Users user);

        bool Delete(Users user);

        bool Save();
    }
}
