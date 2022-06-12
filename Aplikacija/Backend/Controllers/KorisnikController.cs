using System;
using System.Net;
using System.Net.Sockets;
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
            return await Context.Korisnici.Where(p=>p.Obrisan==false).ToListAsync();
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
                    korisnik.BrojOnlineKupovina=brojKup;

                    await Context.SaveChangesAsync();
                    return Ok($"Uspešno promenjen korisnik! ID: {korisnik.KorisnikId}");
                }
                else
                {
                    return BadRequest("Korisnik nije pronađen!");
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

            var stariKorisnik = await Context.Korisnici.Where(k => k.KorisnikId == korisnik.KorisnikId).FirstOrDefaultAsync();
            
            if (!string.IsNullOrWhiteSpace(korisnik.Ime) || korisnik.Ime.Length < 50)
            {
                stariKorisnik.Ime = korisnik.Ime;
            }

            if (!string.IsNullOrWhiteSpace(korisnik.Prezime) || korisnik.Prezime.Length < 50)
            {
                stariKorisnik.Prezime = korisnik.Prezime;
            }

            if (!string.IsNullOrWhiteSpace(korisnik.Email))
            {
                stariKorisnik.Email = korisnik.Email;
            }

            if (!string.IsNullOrWhiteSpace(korisnik.KorisnickoIme))
            {
                stariKorisnik.KorisnickoIme = korisnik.KorisnickoIme;
            }

            if (!string.IsNullOrWhiteSpace(korisnik.Adresa))
            {
                stariKorisnik.Adresa = korisnik.Adresa;
            }

            if (!string.IsNullOrWhiteSpace(korisnik.Telefon))
            {
                stariKorisnik.Telefon = korisnik.Telefon;
            }

            try
            {
                Context.Korisnici.Update(stariKorisnik);
                await Context.SaveChangesAsync();
                return Ok($"Korisnik sa ID: {korisnik.KorisnikId} je uspešno izmenjen!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         [Route("PromeniSlikuKorisnika/{id}")]
        [HttpPut]
        public async Task<ActionResult> PromeniSlikuKorisnika([FromBody] string slika,int id)
        {

            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            
            try
            {
                var stariKorisnik = await Context.Korisnici.Where(k => k.KorisnikId == id).FirstOrDefaultAsync();
                stariKorisnik.Slika = Convert.FromBase64String(slika);
                Context.Korisnici.Update(stariKorisnik);
                await Context.SaveChangesAsync();
                return Ok(slika);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("PromeniLozinku/{korisnikId}/{staraLozinka}/{novaLozinka}")]
        [HttpPut]
        public async Task<ActionResult> PromeniLozinku(int korisnikId, string staraLozinka, string novaLozinka)
        {
            if (korisnikId <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            var korisnik =  await Context.Korisnici.Where(k => k.KorisnikId == korisnikId).FirstOrDefaultAsync();
            if(korisnik.Sifra != staraLozinka)
            {
                return BadRequest("Pogrešna lozinka!");
            }

            korisnik.Sifra = novaLozinka;
            
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
        [Route("RegistrujSe")]
        [HttpPost]
        public async Task<ActionResult> DodatiKorisnika([FromBody] Korisnik k){
             if(String.IsNullOrEmpty(k.Ime))
            {
                return BadRequest("Zaboravili ste da unesete ime!");
            }
            if(String.IsNullOrEmpty(k.Prezime))
            {
                return BadRequest("Zaboravili ste da unesete prezime!");
            }
            if(String.IsNullOrEmpty(k.Email))
            {
                return BadRequest("Zaboravili ste da unesete korisnicko ime!");  
            }
            if(String.IsNullOrEmpty(k.Sifra))
            {
                return BadRequest("Zaboravili ste da uneste sifru!");
            }  
            if(k.Sifra.Length<8)
            {
                return BadRequest("Sifra mora imati minimum 8 karaktera!");
            } 

            if(String.IsNullOrEmpty(k.Adresa))
            {
                return BadRequest("Zaboravili ste da uneste adresu!");
            }      
             var korisnik=await Context.Korisnici.Where(p=>p.KorisnickoIme==k.KorisnickoIme).FirstOrDefaultAsync();
                if(korisnik != null)
                {
                    return BadRequest("Korisnik sa unetim korisničkim imenom vec postoji!");
                }
            try{
                Context.Korisnici.Add(k);
                await Context.SaveChangesAsync();
               var korisnikReturn=await Context.Korisnici.Where(p=>p.KorisnickoIme==k.KorisnickoIme).FirstOrDefaultAsync();
                return Ok(korisnikReturn.KorisnikId);
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
                   if(korisnik.Obrisan == true)
                {
                    return BadRequest("Nalog je blokiran!");
                }
                return Ok(korisnik);
            }
            catch(Exception e){
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiKorisnika/{korisnikId}")]
        [HttpPut]
        public async Task<ActionResult> ObrisiKorisnika(int korisnikId)
        {

            if (korisnikId <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            
                var korisnik = Context.Korisnici.Where(p => p.KorisnikId == korisnikId).FirstOrDefault();
                if (korisnik != null)
                {
                    korisnik.Obrisan=true;
                    await Context.SaveChangesAsync();
                    return Ok($"Korisnik obrisan! ID: {korisnik.KorisnikId}");
                }
                else
                {
                    return BadRequest("Korisnik nije pronadjen");
                }
        }

        [Route("PosaljiEmail/{fromMail}/{toMail}/{subject}/{body}")]
        [HttpPost]
        public async Task<ActionResult> PosaljiEmail(string fromMail, string toMail, string subject, string body)
        {
            var hostName = Dns.GetHostName();
               var host = Dns.GetHostEntry(hostName).AddressList[0];
            try
            {
               
               return Ok(host);
               //var ipAddress = host.AddressList.Where(a => a.AddressFamily == AddressFamily.InterNetwork).FirstOrDefault();
               //return Ok(ipAddress);
               //SmtpClient ss = new SmtpClient(ipAddress.ToString());  
               //ss.Port = 25;  
               //ss.UseDefaultCredentials = false;  
               //ss.EnableSsl = true;
               //ss.Send(fromMail, toMail, subject, body);  
               return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}