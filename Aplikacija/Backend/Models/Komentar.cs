using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; 

namespace Projekat.Models{
    [Table("Komentar")]
    public class Komentar{
        [Key]
        [Column("KomentarId")]
        public int KomentarId{get;set;}

        [Column("OpisKomentar")]
        public string OpisKomentar{get;set;}

        [Column("Ocena")]
        public int Ocena{get;set;}

        [JsonIgnore]

        public Artikal Artikal {get;set;}
        
        [JsonIgnore]
        public Korisnik Korisnik {get;set;}
    }
}