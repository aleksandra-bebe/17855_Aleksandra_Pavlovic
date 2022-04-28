using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Projekat.Models{
    [Table("Korisnik")]
    public class Korisnik{
        [Key]
        [Column("KorisnikID")]
        public int KorisnikId{get;set;}

        [Column("Ime")]
        [MaxLength(50)]
        public string Ime{get;set;}

        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime{get; set;}

        [Column("Email")]
        public string Email{get;set;}

        [Column("BrojKupljenihProizvoda")]
        public int Broj{get;set;}

    }
}