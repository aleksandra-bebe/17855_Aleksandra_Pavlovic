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
    public class TransakcijaController : ControllerBase
    {
        public ShopContext Context { get; set; }

        public TransakcijaController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetTransakcija/{korId}")]
        [HttpGet]
          public async Task<ActionResult> GetTransakcija(int korId)
        { 
            try{
            var k=await Context.Transakcije.Where(p=>p.Korisnik.KorisnikId==korId).Include(q=>q.Artikal).ToListAsync();
            return Ok(k);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        
        }

        [Route("PostTransakcija/{idArtikal}/{korId}")]
        [HttpPost]
        public async Task<ActionResult> DodajTransakciju(int idArtikal,int korId)
        {   
            if(idArtikal <0){
                return BadRequest("Nije unet artikal!");
            }
            if(korId<0)
            {
                return BadRequest("Nije unet korisnik!");
            }
            try{
            var artikal= await Context.Artikli.Where(p=>p.ArtikalId==idArtikal).FirstOrDefaultAsync();
            if(artikal==null)
            {
                return BadRequest("Artikal ne postoji!");
            }
            int brojProdaja=artikal.BrojProdaja;
            Korisnik k;
            k= await Context.Korisnici.Where(p=>p.KorisnikId==korId).FirstOrDefaultAsync();
            if(k==null)
            {
                return BadRequest("Ne postoji korisnik sa korisnickim imenom!");
            }
            int brKupljenih=k.Broj;
            Transakcija tr=new Transakcija
              { 
                  Artikal =artikal,
                  Korisnik=k,
              };
            artikal.BrojProdaja++;
            artikal.NaStanju--;
            k.Broj++;
            Context.Transakcije.Add(tr);
            await Context.SaveChangesAsync();
             return Ok($"Dodata je transakcija");

            }   
            catch(Exception e)
            {
               return BadRequest(e.Message);
            }
           
        }

        [Route("DeleteTransakcija/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {
                var tr = await Context.Transakcije.FindAsync(id);
                Context.Transakcije.Remove(tr);
                await Context.SaveChangesAsync();
                return Ok($"Uspešno izbrisana transakcija sa id: {tr.transakcijaId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}