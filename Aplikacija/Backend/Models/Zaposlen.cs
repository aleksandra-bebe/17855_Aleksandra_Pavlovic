using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization; 
namespace Projekat.Models{
    [Table("Zaposlen")]
    public class Zaposlen{
        [Key]
        [Column("ZaposlenId")]
        public int ZaposlenId{get;set;}

        [Column("Ime")]
        [MaxLength(50)]
        public string Ime{get;set;}

        [Column("Prezime")]
        [MaxLength(50)]
        public string Prezime{get; set;}

         [Column("Email")]
        public string Email{get;set;}

         [Column("Obrisan")]
        public bool Obrisan {get; set;}

        [Column("ProsecnaOcena")]
        public decimal ProsecnaOcena {get;set;}

         [JsonIgnore]
        public List<Komentar> Komentari {get; set;}
    }
}