using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Projekat.Models;
using System.Net.Http;
using projekat.JWTHelper;

namespace Projekat.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class ZaposlenController : ControllerBase
  {
    public ShopContext Context { get; set; }
    public ZaposlenController(ShopContext context)
    {
      Context = context;
    }

    [Authorize(Role.Admin)]
    [Route("PostZaposlen")]
    [HttpPost]
    public async Task<ActionResult> DodajZaposlenog([FromBody] Zaposlen z)
    {
      if (z.ZaposlenId < 0)
      {
        return BadRequest("Pogrešan id!");
      }

      if (string.IsNullOrWhiteSpace(z.Ime) || z.Ime.Length > 50)
      {
        return BadRequest("Pogrešno ime!");
      }

      if (string.IsNullOrWhiteSpace(z.Prezime) || z.Prezime.Length > 50)
      {
        return BadRequest("Pogrešno prezime!");
      }

      try
      {
        Context.Zaposleni.Add(z);
        await Context.SaveChangesAsync();
        return Ok($"Zaposlen  je dodat! ID je: {z.ZaposlenId}");
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.Admin)]
    [Route("DodajZaposlenogRadnika/{Ime}/{Prezime}/{Email}")]
    [HttpPost]
    public async Task<ActionResult> DodajZaposlenogRadnika(string Ime, string Prezime, string Email)
    {
      if (string.IsNullOrWhiteSpace(Ime) || Ime.Length > 50)
        return BadRequest("Pogresno unet parametar 'Ime'!");
      if (string.IsNullOrWhiteSpace(Prezime) || Prezime.Length > 50)
        return BadRequest("Pogresno unet parametar 'Prezime'!");

      try
      {
        Zaposlen z = new Zaposlen();
        z.Ime = Ime;
        z.Prezime = Prezime;
        z.Email = Email;

        Context.Zaposleni.Add(z);
        await Context.SaveChangesAsync();

        return Ok("Dodat je zaposleni.");
      }
      catch (Exception e)
      {
        return BadRequest(e.InnerException);
      }
    }


    [AllowAnonymous]
    [Route("GetZaposlen")]
    [HttpGet]
    public async Task<List<Zaposlen>> GetZaposleni()
    {
      return await Context.Zaposleni.Where(p => p.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("VratiKomentareZaposleni/{zaposlenId}")]
    [HttpGet]
    public async Task<ActionResult> VratiKomentareZaposlen(int zaposlenId)
    {
      try
      {
        var komentari = await Context.Komentari.Where(p => p.Zaposlen.ZaposlenId == zaposlenId)
        .Select(x =>
          new Komentar
          {
            KomentarId = x.KomentarId,
            OpisKomentar = x.OpisKomentar,
            Korisnik = x.Korisnik,
            Ocena = x.Ocena
          }
        )
        .ToListAsync();

        return Ok(komentari);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.User)]
    [Route("PostKomentarZaposlen/{zaposlenId}/{korisnikId}/{ocena}")]
    [HttpPost]
    public async Task<ActionResult> OceniProizvod(int zaposlenId, int korisnikId, int ocena, [FromBody] string opisKomentara)
    {
      try
      {
        var zaposlen = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).FirstAsync();
        if (zaposlen == null)
        {
          return BadRequest("Ne postoji trazeni zaposlen!");
        }
        if (zaposlen.ProsecnaOcena > 0)
        {
          zaposlen.ProsecnaOcena = (zaposlen.ProsecnaOcena + ocena) / 2;
        }
        else
        {
          zaposlen.ProsecnaOcena += ocena;
        }

        var korisnik = await Context.Korisnici.Where(p => p.KorisnikId == korisnikId).FirstAsync();
        if (korisnik == null)
        {
          return BadRequest("Ne postoji trazeni korisnik!");
        }

        var komentari = await Context.Komentari.Where(p => (p.Zaposlen.ZaposlenId == zaposlenId) && (p.Korisnik.KorisnikId == korisnikId)).ToListAsync();

        if (komentari.Count() > 0)
        {
          return StatusCode(403);
        }
        var komentar = new Komentar();
        komentar.OpisKomentar = opisKomentara;
        komentar.Zaposlen = zaposlen;
        komentar.Korisnik = korisnik;
        komentar.Ocena = ocena;

        Context.Komentari.Add(komentar);
        await Context.SaveChangesAsync();
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [AllowAnonymous]
    [Route("VratiZaposlen/{zaposlenId}")]
    [HttpGet]
    public async Task<ActionResult> VratiZaposlenog(int zaposlenId)
    {
      try
      {
        var zap = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).FirstAsync();
        if (zap == null)
        {
          throw new Exception("Ne postoji trazeni zaposleni.");
        }

        var z = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).Select(p => new
        {
          zaposlenID = p.ZaposlenId,
          ime = p.Ime,
          prezime = p.Prezime,
          email = p.Email,
          prosecnaOcena = p.ProsecnaOcena,
        }).ToArrayAsync();
        return Ok(z);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.Admin)]
    [Route("ObrisiZaposlenog/{id}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiZaposlenog(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Pogrešan ID!");
      }

      try
      {
        var zaposlen = await Context.Zaposleni.FindAsync(id);
        Context.Zaposleni.Remove(zaposlen);
        await Context.SaveChangesAsync();
        return Ok($"Uspešno izbrisan zaposleni: {zaposlen.Ime}");
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}
