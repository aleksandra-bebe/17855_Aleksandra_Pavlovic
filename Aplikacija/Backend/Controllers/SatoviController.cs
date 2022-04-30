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
    public class SatoviController : ControllerBase
    {
        public ShopContext Context { get; set; }
        public SatoviController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetSat")]
        [HttpGet]
        public async Task<List<Sat>> GetSatovi()
        {
            return await Context.Satovi.ToListAsync();
        }
        [Route("PostSat")]
        [HttpPost]
        public async Task<ActionResult> PostSat([FromBody]Sat sat){
            
            if(sat.SatId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(sat.Naziv) || sat.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
            Context.Satovi.Add(sat);
            await Context.SaveChangesAsync();
            return Ok($"Sat je dodat! ID je:{sat.SatId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("UpdateSat/{naziv}/{cena}/{opis}/{naStanju}/{slika}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(string naziv,int cena,string opis,int nastanju,string slika)
        {
             if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                var sat=Context.Satovi.Where(p=>p.Naziv == naziv).FirstOrDefault();
                if(sat!=null)
                {
                    sat.Naziv=naziv;
                    sat.Cena=cena;
                    sat.Opis=opis;
                    sat.NaStanju=nastanju;
                    sat.Image=slika;
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno promenjen sat! ID: {sat.SatId}");
                }
                else{
                    return BadRequest("Sat nije pronadjen");
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Route("PromenaFromBodySatovi")]
        [HttpPut]
        public async Task<ActionResult> PromenaFromBody([FromBody]Sat sat)
        {
            if(sat.SatId < 0)
            {
                return BadRequest("Pogresan id!");
            }
             if (string.IsNullOrWhiteSpace(sat.Naziv) || sat.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try{
                
                Context.Satovi.Update(sat);
                await Context.SaveChangesAsync();
                return Ok($"Sat sa ID:{sat.SatId} je uspesno izmenjen!");
            }
            catch (Exception e){
                return BadRequest(e.Message);
            }
        }
        [Route("DeleteSat/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if(id<=0)
            {
                return BadRequest("Pogresan id!");
            }
            try{
                var sat=await Context.Satovi.FindAsync(id);
                string naziv=sat.Naziv;
                Context.Satovi.Remove(sat);
                 await Context.SaveChangesAsync();
                return Ok($"Uspesno je obrisan sat sa nazivom:{naziv}");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}