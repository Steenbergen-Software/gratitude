using Microsoft.EntityFrameworkCore;

using Data.Domain;

namespace Data.Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Entry> Entries { get; set; }
        
    }
}