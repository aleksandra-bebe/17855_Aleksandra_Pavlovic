using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Projekat.Models;

namespace Projekat.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KaiseviController : ControllerBase
    {
        public ShopContext Context { get; set; }
        public KaiseviController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetKais")]
        [HttpGet]
        public async Task<List<Kais>> GetKaiseve()
        {
            return await Context.Kaisevi.ToListAsync();
        }
        [Route("PostKais")]
        [HttpPost]
        public async Task<ActionResult> PostKais([FromBody]Kais kais){
            
            if(kais.KaisId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(kais.Naziv) || kais.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
            Context.Kaisevi.Add(kais);
            await Context.SaveChangesAsync();
            return Ok($"Kais je dodat! ID je:{kais.KaisId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UpdateKais/{naziv}/{cena}/{opis}/{naStanju}/{slika}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(string naziv,int cena,string opis,int nastanju,string slika)
        {
             if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                var kais=Context.Kaisevi.Where(p=>p.Naziv == naziv).FirstOrDefault();
                if(kais!=null)
                {
                    kais.Naziv=naziv;
                    kais.Cena=cena;
                    kais.Opis=opis;
                    kais.NaStanju=nastanju;
                    kais.Image=slika;
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno promenjen kais! ID: {kais.KaisId}");
                }
                else{
                    return BadRequest("Kais nije pronadjen");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PromenaFromBodyKaisevi")]
        [HttpPut]
        public async Task<ActionResult> PromenaFromBody([FromBody]Kais kais)
        {
            if(kais.KaisId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(kais.Naziv) || kais.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                Context.Kaisevi.Update(kais);
                await Context.SaveChangesAsync();
                return Ok($"Kais sa ID:{kais.KaisId} je uspesno izmenjen!");
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("DeleteKais/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan id!");
            }
            try{
                var kais=await Context.Kaisevi.FindAsync(id);
                string naziv=kais.Naziv;
                Context.Kaisevi.Remove(kais);
                 await Context.SaveChangesAsync();
                return Ok($"Uspesno je obrisan kais sa nazivom:{naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}