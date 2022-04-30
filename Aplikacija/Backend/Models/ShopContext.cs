using Microsoft.EntityFrameworkCore;

namespace Projekat.Models
{
    public class ShopContext : DbContext
    {  
    
        public DbSet<Sat> Satovi { get; set; }
        public DbSet<Narukvica> Narukvice { get; set; }
        public DbSet<Kais> Kaisevi { get; set; }

        public DbSet<Korisnik> Korisnici{get;set;}

        public ShopContext(DbContextOptions options) : base(options)
        {

        }
    }
}