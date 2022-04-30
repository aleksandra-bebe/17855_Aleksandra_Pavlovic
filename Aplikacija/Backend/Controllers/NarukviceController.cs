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
    public class NarukviceController : ControllerBase
    {
        public ShopContext Context { get; set; }
        public NarukviceController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetNarukvica")]
        [HttpGet]
        public async Task<List<Narukvica>> GetNarukvica()
        {
            return await Context.Narukvice.ToListAsync();
        }
        [Route("PostNarukvica")]
        [HttpPost]
        public async Task<ActionResult> PostNarukvica([FromBody]Narukvica nar){
            
            if(nar.NarukvicaId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(nar.Naziv) || nar.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
            Context.Narukvice.Add(nar);
            await Context.SaveChangesAsync();
            return Ok($"Narukvica je dodata! ID je:{nar.NarukvicaId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UpdateNarukvica/{naziv}/{cena}/{opis}/{naStanju}/{slika}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(string naziv,int cena,string opis,int nastanju,string slika)
        {
             if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                var nar=Context.Narukvice.Where(p=>p.Naziv == naziv).FirstOrDefault();
                if(nar!=null)
                {
                    nar.Naziv=naziv;
                    nar.Cena=cena;
                    nar.Opis=opis;
                    nar.NaStanju=nastanju;
                    nar.Image=slika;
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno promenjena narukvica! ID: {nar.NarukvicaId}");
                }
                else{
                    return BadRequest("Narukvica nije pronadjena");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PromenaFromBodyMNarukvica")]
        [HttpPut]
        public async Task<ActionResult> PromenaFromBody([FromBody]Narukvica nar)
        {
            if(nar.NarukvicaId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(nar.Naziv) || nar.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                Context.Narukvice.Update(nar);
                await Context.SaveChangesAsync();
                return Ok($"Narukvica sa ID:{nar.NarukvicaId} je uspesno izmenjena!");
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("DeleteNarukvica/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan id!");
            }
            try{
                var nar=await Context.Narukvice.FindAsync(id);
                string naziv=nar.Naziv;
                Context.Narukvice.Remove(nar);
                 await Context.SaveChangesAsync();
                return Ok($"Uspesno je obrisana narukvica sa nazivom:{naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}