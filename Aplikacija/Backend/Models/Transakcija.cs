using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization; 

namespace Projekat.Models{

     [Table("Transakcija")]
      public class Transakcija{

        [Key]
        [Column("TransakcijaId")]
        public int transakcijaId{get;set;}
       
   
        public Korisnik Korisnik{get;set;}

        public Artikal Artikal {get;set;}
    }
    }