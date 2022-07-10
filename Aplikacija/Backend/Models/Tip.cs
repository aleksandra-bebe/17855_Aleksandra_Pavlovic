using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace Projekat.Models
{
  [Table("Tip")]
  public class Tip
  {
    [Key]
    [Column("TipId")]
    public int TipId { get; set; }

    [Column("Naziv")]
    [MaxLength(20)]
    public string Naziv { get; set; }

    [Column("Obrisan")]
    public bool Obrisan { get; set; }
  }
}