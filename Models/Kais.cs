using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Projekat.Models{
    [Table("Kais")]
    public class Kais{
        [Key]
        [Column("KaisID")]
        public int KaisId{get;set;}

        [Column("Naziv")]
        [MaxLength(50)]
        public string Naziv{get;set;}

        [Column("Cena")]
        public double Cena{get; set;}

        [Column("Opis")]
        public string Opis{get;set;}

        [Column("Na stanju")]
        public int NaStanju{get;set;}

        [Column("Image")]
        [MaxLength(255)]
        public string Image{get;set;}
    }
}