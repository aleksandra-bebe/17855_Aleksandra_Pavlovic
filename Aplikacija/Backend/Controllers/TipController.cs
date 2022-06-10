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

    }
}
