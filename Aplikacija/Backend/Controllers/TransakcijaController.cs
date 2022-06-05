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

        [Route("PostTransakcija/{idKor}/{artikalId}")]
        [HttpPost]
        public async Task<ActionResult> DodajTransakciju(int idKor,int artikalId)
        {   
            if(artikalId <0){
                return BadRequest("Nije unet artikal!");
            }
            if(idKor<0)
            {
                return BadRequest("Nije unet korisnik!");
            }
            try{
            var kor= await Context.Korisnici.Where(p=>p.KorisnikId==idKor).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Korisnik ne postoji!");
            }
            int brKupljenih=kor.BrojKupljenihProizvoda;
            Artikal a;
            a= await Context.Artikli.Where(p=>p.ArtikalId==artikalId).FirstOrDefaultAsync();
            if(a==null)
            {
                return BadRequest("Ne postoji artikal!");
            }
            int brProdatih=a.BrojProdaja;
            Transakcija tr=new Transakcija
              { 
                  Korisnik =kor,
                  Artikal=a,
              };
            a.BrojProdaja++;
            a.NaStanju--;
            kor.BrojKupljenihProizvoda++;
            Context.Transakcije.Add(tr);
            await Context.SaveChangesAsync();
             return Ok("Dodata je transakcija");

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