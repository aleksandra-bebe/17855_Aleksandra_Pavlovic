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
  public class ArtikalController : ControllerBase
  {
    public ShopContext Context { get; set; }
    public ArtikalController(ShopContext context)
    {
      Context = context;
    }

    [Authorize(Role.Admin)]
    [Route("UkupanBrojArtikala")]
    [HttpGet]
    public async Task<ActionResult> UkupanBrojArtikala()
    {
      try
      {
        var suma = Context.Artikli.Where(p => p.Obrisan == false).Count();

        return Ok(suma);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }

    [AllowAnonymous]
    [Route("GetNajprodavanije")]
    [HttpGet]
    public async Task<List<Artikal>> GetNajprodavanije()
    {
      var lista = await Context.Artikli.Where(p => p.NaStanju != 0 && p.Obrisan == false).OrderByDescending(p => p.BrojProdaja).Take(20).ToListAsync();

      return lista;
    }

    [AllowAnonymous]
    [Route("GetNarukvica1")]
    [HttpGet]
    public async Task<List<Artikal>> GetNarukvica1()
    {
      return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Narukvica.ToString() && a.NaStanju != 0 && a.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("GetSat1")]
    [HttpGet]
    public async Task<List<Artikal>> GetSatovi1()
    {
      return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Sat.ToString() && a.NaStanju != 0 && a.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("GetKais1")]
    [HttpGet]
    public async Task<List<Artikal>> GetKaiseve1()
    {
      return await Context.Artikli.Where(k => k.Tip.Naziv == Tipovi.Kais.ToString() && k.NaStanju != 0 && k.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("GetKais")]
    [HttpGet]
    public async Task<List<Artikal>> GetKaiseve()
    {
      return await Context.Artikli.Where(k => k.Tip.Naziv == Tipovi.Kais.ToString() && k.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("GetOstale/{naziv}")]
    [HttpGet]
    public async Task<List<Artikal>> GetOstale(string naziv)
    {
      return await Context.Artikli.Where(k => k.Tip.Naziv == naziv && k.Obrisan == false).ToListAsync();
    }

    [Authorize(Role.Admin)]
    [Route("PostArtikal/{tipId}")]
    [HttpPost]
    public async Task<ActionResult> PostArtikal([FromBody] Artikal artikal, [FromRoute] int tipId)
    {

      if (artikal.ArtikalId < 0)
      {
        return BadRequest("Pogresan id!");
      }
      if (string.IsNullOrWhiteSpace(artikal.Naziv) || artikal.Naziv.Length > 50)
      {
        return BadRequest("Pogresan naziv!");
      }
      if (artikal.Tip.TipId == 0)
      {
        var tip = Context.Tipovi.Where(t => t.TipId == tipId).FirstOrDefault();
        artikal.Tip = tip;
      }
      try
      {
        Context.Artikli.Add(artikal);
        await Context.SaveChangesAsync();
        return Ok($"Artikal je dodat! ID je:{artikal.ArtikalId}");
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.Admin)]
    [Route("UpdateArtikal/{ArtikalId}/{naziv}/{cena}/{opis}/{naStanju}/{tipId}")]
    [HttpPut]
    public async Task<ActionResult> Promeni(int ArtikalId, string naziv, int cena, string opis, int naStanju, int tipId, [FromBody] string slika)
    {
      if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
      {
        return BadRequest("Pogresan naziv!");
      }
      try
      {
        var artikal = Context.Artikli.Where(p => p.ArtikalId == ArtikalId).FirstOrDefault();
        var tip = await Context.Tipovi.Where(p => p.TipId == tipId).FirstOrDefaultAsync();

        // var artikal = Context.Artikli.Where(p => p.Naziv == naziv).FirstOrDefault();
        if (artikal != null && artikal.Obrisan == false)
        {
          artikal.Naziv = naziv;
          artikal.Cena = cena;
          artikal.Opis = opis;
          artikal.NaStanju = naStanju;
          artikal.Tip = tip;

          if (slika.Length > 0)
          {
            artikal.Image = Convert.FromBase64String(slika);
          }
          await Context.SaveChangesAsync();
          return Ok($"Uspesno promenjen artikal! ID: {artikal.ArtikalId}");
        }
        else
        {
          return BadRequest("Artikal nije pronadjen");
        }
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.Admin)]
    [Route("ObrisiArtikal/{artikalId}")]
    [HttpPut]
    public async Task<ActionResult> ObrisiArtikal(int artikalId)
    {

      if (artikalId <= 0)
      {
        return BadRequest("Pogrešan ID!");
      }

      var artikal = Context.Artikli.Where(p => p.ArtikalId == artikalId).FirstOrDefault();
      if (artikal != null && artikal.Obrisan == false)
      {
        artikal.Obrisan = true;
        await Context.SaveChangesAsync();
        return Ok($"Artikal obrisan! ID: {artikal.ArtikalId}");
      }
      else
      {
        return BadRequest("Artikal nije pronadjen");
      }
    }

    [AllowAnonymous]
    [Route("GetNarukvica")]
    [HttpGet]
    public async Task<List<Artikal>> GetNarukvica()
    {
      return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Narukvica.ToString() && a.Obrisan == false).ToListAsync();
    }

    [AllowAnonymous]
    [Route("GetSat")]
    [HttpGet]
    public async Task<List<Artikal>> GetSatovi()
    {
      return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Sat.ToString() && a.Obrisan == false).ToListAsync();
    }

    [Authorize(Role.Admin)]
    [Route("PostTip")]
    [HttpPost]
    public async Task<ActionResult> PostTip([FromBody] Tip tip)
    {

      if (tip.TipId < 0)
      {
        return BadRequest("Pogresan id!");
      }
      try
      {
        Context.Tipovi.Add(tip);
        await Context.SaveChangesAsync();
        return Ok($"Tip je dodat! ID je:{tip.TipId}");
      }
      catch (Exception e)
      {
        return BadRequest(e.InnerException);
      }
    }

    [Authorize(Role.Admin)]
    [Route("DodajArtikal/{Naziv}/{Cena}/{Opis}/{NaStanju}/{TipId}")]
    [HttpPost]
    public async Task<ActionResult> DodajArtikal(string Naziv, int Cena, string Opis, int NaStanju, int TipId, [FromBody] string slika)
    {
      if (string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
        return BadRequest("Pogresno unet parametar 'Naziv'!");

      var tip = await Context.Tipovi.Where(p => p.TipId == TipId).FirstOrDefaultAsync();

      try
      {
        Artikal k = new Artikal();
        k.Naziv = Naziv;
        k.Cena = Cena;
        k.Opis = Opis;
        k.NaStanju = NaStanju;
        k.Tip = tip;
        k.Image = Convert.FromBase64String(slika);

        Context.Artikli.Add(k);
        await Context.SaveChangesAsync();

        return Ok("Dodat je artikal.");
      }
      catch (Exception e)
      {
        return BadRequest(e.InnerException);
      }
    }

    [AllowAnonymous]
    [Route("VratiArtikal/{ArtikalId}")]
    [HttpGet]
    public async Task<ActionResult> VrariArtikal(int ArtikalId)
    {
      try
      {
        var artikal = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).FirstAsync();
        if (artikal == null)
        {
          throw new Exception("Ne postoji trazeni artikal.");
        }

        var proizvod = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).Select(p => new
        {
          artikalID = p.ArtikalId,
          naziv = p.Naziv,
          cena = p.Cena,
          opis = p.Opis,
          naStanju = p.NaStanju,
          // artikalSlika=p.Image,
          brojProdaja = p.BrojProdaja,
          image = p.Image,
          prosecnaOcena = p.ProsecnaOcena,
          tipId = p.Tip.TipId

        }).ToArrayAsync();
        return Ok(proizvod);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [Authorize(Role.User)]
    [Route("PostKomentar/{artikalId}/{korisnikId}/{ocena}")]
    [HttpPost]
    public async Task<ActionResult> OceniProizvod(int artikalId, int korisnikId, int ocena, [FromBody] string opisKomentara)
    {
      try
      {
        var artikal = await Context.Artikli.Where(p => p.ArtikalId == artikalId).FirstAsync();
        if (artikal == null)
        {
          return BadRequest("Ne postoji trazeni artikal!");
        }
        if (artikal.ProsecnaOcena > 0)
        {
          artikal.ProsecnaOcena = (artikal.ProsecnaOcena + ocena) / 2;
        }
        else
        {
          artikal.ProsecnaOcena += ocena;
        }

        var korisnik = await Context.Korisnici.Where(p => p.KorisnikId == korisnikId).FirstAsync();
        if (korisnik == null)
        {
          return BadRequest("Ne postoji trazeni korisnik!");
        }

        var komentari = await Context.Komentari.Where(p => (p.Artikal.ArtikalId == artikalId) && (p.Korisnik.KorisnikId == korisnikId)).ToListAsync();

        if (komentari.Count() > 0)
        {
          return StatusCode(403);
        }
        var komentar = new Komentar();
        komentar.OpisKomentar = opisKomentara;
        komentar.Artikal = artikal;
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
    [Route("VratiKomentareArtikal/{artikalId}")]
    [HttpGet]
    public async Task<ActionResult> VratiKomentareArtikal(int artikalId)
    {
      try
      {
        var komentari = await Context.Komentari.Where(p => p.Artikal.ArtikalId == artikalId)
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
  }
}