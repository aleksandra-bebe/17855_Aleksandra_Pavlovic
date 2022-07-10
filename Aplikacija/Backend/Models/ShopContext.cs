using Microsoft.EntityFrameworkCore;

namespace Projekat.Models
{
    public class ShopContext : DbContext
    {  
    
        public DbSet<Artikal> Artikli { get; set; }
        public DbSet<Tip> Tipovi { get; set; }
        public DbSet<Korisnik> Korisnici{get;set;}
        public DbSet<Transakcija> Transakcije{get;set;}
        public DbSet<Komentar> Komentari{get;set;}
        public DbSet<Zaposlen> Zaposleni{get;set;}

        public ShopContext(DbContextOptions options) : base(options)
        {

        }
    }
}