using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Projekat.Models{
    [Table("Komentar")]
    public class Komentar{
        [Key]
        [Column("KomentarID")]
        public int KomentarID{get;set;}

        [Column("OpisKomentar")]
        public string OpisKomentar{get;set;}

        [Column("Ocena")]
        public int Ocena{get;set;}

        public Artikal Artikal {get;set;}

        public Korisnik Korisnik {get;set;}
    }
}