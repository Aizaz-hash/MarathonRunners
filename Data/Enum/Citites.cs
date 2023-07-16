namespace Marathonrunner.Data.Enum
{
public class Citites
{
        List<string> cities = new List<string>()
        {
        };
        public IEnumerator<string> GetEnumerator()
        {
            foreach (string city in cities)
            {
                yield return city;
            }
        }
    }
}