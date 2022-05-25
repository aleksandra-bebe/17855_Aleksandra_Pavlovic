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
        public async Task<ActionResult> DodajKorisnika([FromBody] Korisnik korisnik)
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
        [Route("RegistrujSe/{Ime}/{Prezime}/{email}/{sifra}/{admin}")]
        [HttpPost]
        public async Task<ActionResult> DodatiKorisnika(string ime,string prezime,string email,string sifra,bool admin){
            if(String.IsNullOrEmpty(ime))
            {
                return BadRequest("Zaboravili ste da unesete ime!");
            }
            if(String.IsNullOrEmpty(prezime))
            {
                return BadRequest("Zaboravili ste da unesete prezime!");
            }
            if(String.IsNullOrEmpty(email))
            {
                return BadRequest("Zaboravili ste da unesete korisnicko ime!");
            }
             if(String.IsNullOrEmpty(sifra))
              {
                    return BadRequest("Zaboravili ste da uneste sifru");
              }  
            if(sifra.Length<8)
              {
                    return BadRequest("Sifra mora imati minimum 8 karaktera");
              } 
              var korisnik=await Context.Korisnici.Where(p=>p.Email==email).FirstOrDefaultAsync();
              if(korisnik!=null)
              return BadRequest("Korisnik sa unetim korisnickim imenom vec postoji!");
              try{
                  Korisnik k=new Korisnik{
                      Ime=ime,
                      Prezime=prezime,
                      Email=email,
                      Sifra=sifra,
                      Admin=admin

                  };
                  Context.Korisnici.Add(k);
                  await Context.SaveChangesAsync();
                  return Ok("Kreiran je novi korisnik!");
              }
              catch (Exception e)
              {
                  return BadRequest(e.Message);
              }
        }
        [Route("UlogujSe/{korisnickoIme}/{sifra}")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnika(string korisnickoIme,string sifra){
            if(String.IsNullOrEmpty(korisnickoIme))
            {
                return BadRequest("Zaboravili ste da unesete korisničko ime!");
            }
            if(String.IsNullOrEmpty(sifra))
            {
                return BadRequest("Zaboravili ste da unesete šifru!");
            }
            if(sifra.Length<8)
            {
                return BadRequest("Šifra mora imati minimum 8 karaktera!");
            }
            try{
                var korisnik=await Context.Korisnici.Where(p=>p.KorisnickoIme==korisnickoIme).FirstOrDefaultAsync();
                if(korisnik==null)
                {
                    return BadRequest("Korisnik sa unetim korisničkim imenom ne postoji!");
                }
                if(korisnik.Sifra!=sifra)
                {
                    return BadRequest("Uneta šifra je pogresna!");
                }
                return Ok(korisnik);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }
    }
}