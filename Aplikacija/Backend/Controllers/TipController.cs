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
    public class TipController : ControllerBase
    {
        public ShopContext Context { get; set; }

        public TipController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetTip")]
        [HttpGet]
          public async Task<List<Tip>> GetTip()
        {
            return await Context.Tipovi.Where(p=>p.TipId > 0).ToListAsync();
        }

        // [Route("DodajTip/{Naziv}")]
        // [HttpPost]
        // public async Task<Tip> DodajTip(string Naziv)
        // {
        //     if (string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
        //         return BadRequest("Pogresno unet parametar 'Naziv'!");
  
        //   try{     
        //     Tip t = new Tip();
        //     t.Naziv=Naziv;
           
        //     Context.Tip.Add(t);
        //     await Context.SaveChangesAsync();

        //     return Ok("Dodat je tip.");
        //   }
        //   catch(Exception e)
        //   {
        //       return BadRequest(e.Message);
        //   }
        // }

        [Route("DodajNoviTip/{Naziv}")]
        [HttpPost]
        public async Task<ActionResult> DodajArtikal(string Naziv)
        {
            if (string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
                return BadRequest("Pogresno unet parametar 'Naziv'!");

          try{     
            Tip t = new Tip();
            t.Naziv=Naziv;

            Context.Tipovi.Add(t);
            await Context.SaveChangesAsync();

            return Ok("Dodat je tip.");
          }
          catch(Exception e)
          {
              return BadRequest(e.InnerException);
          }
        }
        [Route("ObrisiTip/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiTip(int id){
            if(id<=0)
            {
                return BadRequest("Pogresan ID!");
            }
            try{
                var t=await Context.Tipovi.FindAsync(id);
                List<Artikal> artikli= await Context.Artikli.Where(p=>p.Tip.TipId == id).ToListAsync();
                if(artikli !=null){
                  foreach (var a in artikli)
                  {
                    List<Komentar> kom=await Context.Komentari.Where(p=>p.Artikal.ArtikalId == a.ArtikalId).ToListAsync();
                     if(kom!=null)
                     Context.Komentari.RemoveRange(kom);
                  }
                
                Context.Artikli.RemoveRange(artikli);
                }
                Context.Tipovi.Remove(t);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izbrisan tip sa id:{t.TipId}");
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
