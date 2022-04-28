using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Projekat.Models;


namespace Proba.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KorisnikController : ControllerBase
    {
        public ShopContext Context { get; set; }

        public KorisnikController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetKorisnik")]
        [HttpGet]
          public async Task<List<Korisnik>> GetKorisnik()
        {
            return await Context.Korisnici.ToListAsync();
        }

        [Route("PostKorisnik")]
        [HttpPost]
        public async Task<ActionResult> DodajStudenta([FromBody] Korisnik korisnik)
        {
            if (korisnik.KorisnikId <=0)
            {
                return BadRequest("Pogrešan id!");
            }

            if (string.IsNullOrWhiteSpace(korisnik.Ime) || korisnik.Ime.Length > 50)
            {
                return BadRequest("Pogrešno ime!");
            }

            if (string.IsNullOrWhiteSpace(korisnik.Prezime) || korisnik.Prezime.Length > 50)
            {
                return BadRequest("Pogrešno prezime!");
            }

            try
            {
                Context.Korisnici.Add(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik je dodat! ID je: {korisnik.KorisnikId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PutKorisnik/{ime}/{prezime}/{email}/{brojKup}")]
        [HttpPut]
        public async Task<ActionResult> Promeni( string ime, string prezime,string email,int brojKup)
        {
             
            try
            {
                var korisnik = Context.Korisnici.Where(p => p.Email == email).FirstOrDefault();

                if (korisnik != null)
                {
                    korisnik.Ime = ime;
                    korisnik.Prezime = prezime;
                    korisnik.Email=email;
                    korisnik.Broj=brojKup;

                    await Context.SaveChangesAsync();
                    return Ok($"Uspešno promenjen korisnik! ID: {korisnik.KorisnikId}");
                }
                else
                {
                    return BadRequest("Student nije pronađen!");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromenaFromBodyKorisnik")]
        [HttpPut]
        public async Task<ActionResult> PromeniBody([FromBody]Korisnik korisnik)
        {
            if (korisnik.KorisnikId <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            if (string.IsNullOrWhiteSpace(korisnik.Ime) || korisnik.Ime.Length > 50)
            {
                return BadRequest("Pogrešno ime!");
            }

            if (string.IsNullOrWhiteSpace(korisnik.Prezime) || korisnik.Prezime.Length > 50)
            {
                return BadRequest("Pogrešno prezime!");
            }
            

            try
            {
                Context.Korisnici.Update(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik sa ID: {korisnik.KorisnikId} je uspešno izmenjen!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteKorisnik/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var korisnik = await Context.Korisnici.FindAsync(id);
                string email = korisnik.Email;
                Context.Korisnici.Remove(korisnik);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisan korisnik sa Email-om: {email}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}