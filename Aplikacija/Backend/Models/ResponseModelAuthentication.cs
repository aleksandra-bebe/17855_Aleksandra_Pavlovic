using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Projekat.Models
{
  public class ResponseModelAuthentication
  {
    public Korisnik Korisnik { get; set; }
    public string Token { get; set; }
  }
}
