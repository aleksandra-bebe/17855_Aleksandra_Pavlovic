using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; 

namespace Projekat.Models{

     [Table("Transakcija")]
      public class Transakcija{

        [Key]
        [Column("TransakcijaId")]
        public int transakcijaId{get;set;}

        [Column("Kolicina")]
        public int Kolicina{get;set;}

        [Column("Adresa")]
        public string Adresa{get;set;}

       
   
        public Korisnik Korisnik{get;set;}

        public Artikal Artikal {get;set;}
    }
    }