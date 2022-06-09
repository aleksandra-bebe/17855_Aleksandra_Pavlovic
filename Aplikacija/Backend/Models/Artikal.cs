using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic;
using System.Text.Json.Serialization;
namespace Projekat.Models{
    [Table("Artikal")]
    public class Artikal{
        [Key]
        [Column("ArtikalID")]
        public int ArtikalId{get;set;}

        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv{get;set;}

        [Column("Cena")]
        public double Cena{get; set;}

        [Column("Opis")]
        public string Opis{get;set;}

        [Column("NaStanju")]
        public int NaStanju{get;set;}

        [Column("Image")]
        public byte[] Image{get;set;}

        [Column("BrojProdaja")]
        public int BrojProdaja {get;set;}

        [Column("Obrisan")]
        public bool Obrisan {get; set;}

        public Tip Tip{get;set;}

        [JsonIgnore]
        public List<Komentar> Komentari {get; set;}
    }
}