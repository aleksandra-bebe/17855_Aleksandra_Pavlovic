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

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZaposlenController : ControllerBase
    {
        public ShopContext Context { get; set; }
        public ZaposlenController(ShopContext context)
        {
            Context = context;
        }

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

        //  [Route("DeleteZaposlen/{id}")]
        // [HttpDelete]
        // public async Task<ActionResult> Izbrisi(int id)
        // {
        //     if (id <= 0)
        //     {
        //         return BadRequest("Pogrešan ID!");
        //     }

        //     try
        //     {
        //         var z= await Context.Zaposleni.FindAsync(id);
        //         string email = z.Email;
        //         Context.Zaposleni.Remove(z);
        //         await Context.SaveChangesAsync();
        //         return Ok($"Uspešno izbrisan zaposleni sa Email-om: {email}");
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        [Route("GetZaposlen")]
        [HttpGet]
          public async Task<List<Zaposlen>> GetZaposleni()
        {
            return await Context.Zaposleni.Where(p=>p.Obrisan==false).ToListAsync();
        }

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

         [Route("PostKomentarZaposlen/{zaposlenId}/{korisnikId}/{ocena}")]    
        [HttpPost]
        public async Task<ActionResult> OceniProizvod(int zaposlenId, int korisnikId, int ocena, [FromBody] string opisKomentara)
        {
            try
            {
                var zaposlen = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).FirstAsync();
                if(zaposlen == null)
                {
                    return BadRequest("Ne postoji trazeni zaposlen!");
                }
                if(zaposlen.ProsecnaOcena > 0)
                {
                zaposlen.ProsecnaOcena = (zaposlen.ProsecnaOcena + ocena)/2;
                }
                else{
                    zaposlen.ProsecnaOcena += ocena;
                }

                var korisnik = await Context.Korisnici.Where(p => p.KorisnikId == korisnikId).FirstAsync();
                if(korisnik == null)
                {
                    return BadRequest("Ne postoji trazeni korisnik!");
                }

                var komentari = await Context.Komentari.Where(p => (p.Zaposlen.ZaposlenId == zaposlenId) && (p.Korisnik.KorisnikId == korisnikId)).ToListAsync();

                if(komentari.Count() > 0){
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


          [Route("VratiZaposlen/{zaposlenId}")]    
        [HttpGet]
        public async Task<ActionResult> VratiZaposlenog(int zaposlenId)
        {
            try
            {
                var zap = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).FirstAsync();
                if(zap == null)
                {
                    throw new Exception("Ne postoji trazeni zaposleni.");
                }

                var z = await Context.Zaposleni.Where(p => p.ZaposlenId == zaposlenId).Select(p => new{
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
    }
}
