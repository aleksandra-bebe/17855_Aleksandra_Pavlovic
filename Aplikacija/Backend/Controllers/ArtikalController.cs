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
    public class ArtikalController : ControllerBase
    {
        public ShopContext Context { get; set; }
        public ArtikalController(ShopContext context)
        {
            Context = context;
        }

        [Route("GetNajprodavanije")]
        [HttpGet]
        public async Task<List<Artikal>> GetNajprodavanije()
        {
            var lista = await Context.Artikli.Where(p => p.NaStanju != 0).ToListAsync();
            lista.OrderBy(a => a.BrojProdaja);
            return lista;
        }

        [Route("GetKais")]
        [HttpGet]
        public async Task<List<Artikal>> GetKaiseve()
        {
            return await Context.Artikli.Where(k => k.Tip.Naziv == Tipovi.Kais.ToString()).ToListAsync();
        }
        [Route("PostArtikal/{tipId}")]
        [HttpPost]
        public async Task<ActionResult> PostArtikal([FromBody] Artikal artikal, [FromRoute] int tipId)
        {

            if (artikal.ArtikalId < 0)
            {
                return BadRequest("Pogresan id!");
            }
            if (string.IsNullOrWhiteSpace(artikal.Naziv) || artikal.Naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            if (artikal.Tip.TipId == 0)
            {
                var tip = Context.Tipovi.Where(t => t.TipId == tipId).FirstOrDefault();
                artikal.Tip = tip;
            }
            try
            {
                Context.Artikli.Add(artikal);
                await Context.SaveChangesAsync();
                return Ok($"Artikal je dodat! ID je:{artikal.ArtikalId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

         //trenutno bez slike!!!
        [Route("UpdateArtikal/{ArtikalId}/{naziv}/{cena}/{opis}/{naStanju}")]
        [HttpPut]
        public async Task<ActionResult> Promeni(int ArtikalId,string naziv, int cena, string opis, int naStanju)
        {
            if (string.IsNullOrWhiteSpace(naziv) || naziv.Length > 50)
            {
                return BadRequest("Pogresan naziv!");
            }
            try
            {
                var artikal = Context.Artikli.Where(p => p.ArtikalId == ArtikalId).FirstOrDefault();
                // var artikal = Context.Artikli.Where(p => p.Naziv == naziv).FirstOrDefault();
                if (artikal != null && artikal.Obrisan==false)
                {
                    artikal.Naziv = naziv;
                    artikal.Cena = cena;
                    artikal.Opis = opis;
                    artikal.NaStanju = naStanju;
                    // artikal.Image = slika;
                    await Context.SaveChangesAsync();
                    return Ok($"Uspesno promenjen artikal! ID: {artikal.ArtikalId}");
                }
                else
                {
                    return BadRequest("Artikal nije pronadjen");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        // [Route("PromenaFromBodyKaisevi")]
        // [HttpPut]
        // public async Task<ActionResult> PromenaFromBody([FromBody]Kais kais)
        // {
        //     if(kais.KaisId < 0)
        //     {
        //         return BadRequest("Pogresan id!");
        //     }
        //      if (string.IsNullOrWhiteSpace(kais.Naziv) || kais.Naziv.Length > 50)
        //     {
        //         return BadRequest("Pogresan naziv!");
        //     }
        //     try{
        //         Context.Artikli.Update(kais);
        //         await Context.SaveChangesAsync();
        //         return Ok($"Kais sa ID:{kais.KaisId} je uspesno izmenjen!");
        //     }
        //     catch (Exception e){
        //         return BadRequest(e.Message);
        //     }
        // }

        //NE RADI!
        // [Route("DeleteArtikal/{ArtikalId}")]
        // [HttpDelete]
        // public async Task<ActionResult> Izbrisi(int ArtikalId)
        // {
        //     if (ArtikalId <= 0)
        //     {
        //         return BadRequest("Pogresan id!");
        //     }
        //     try
        //     {

        //        var artikal = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).FirstAsync();
        //        if (artikal == null)
        //             throw new Exception("Ne postoji artikal sa takvim ID-jem!");
        //         // var artikal = await Context.Artikli.FindAsync(ArtikalId);
        //         string naziv = artikal.Naziv;
        //         var tip = artikal.Tip.Naziv;
        //         Context.Artikli.Remove(artikal);
        //         await Context.SaveChangesAsync();
        //         return Ok($"Uspesno je obrisan artikal sa nazivom:{naziv} i tipom {tip}");
        //     }
        //     catch (Exception e)
        //     {
        //         return BadRequest(e.Message);
        //     }
        // }

        // [Route("IzbrisiArtikal/{artikalId}")]
        // [HttpDelete]
        // public async Task<ActionResult> IzbrisiArtikal(int artikalId)
        // {
           
        //         var artikal = await Context.Artikli.Where(p => p.ArtikalId == artikalId).FirstOrDefaultAsync();

        //         if (artikal == null)
        //             throw new Exception("Ne postoji takav artikal");

        //         Context.Artikli.Remove(artikal);

        //         await Context.SaveChangesAsync();

        //         return Ok("Artikal je obrisan!");
        // }

    
        [Route("ObrisiArtikal/{artikalId}")]
        [HttpPut]
        public async Task<ActionResult> ObrisiArtikal(int artikalId)
        {

            if (artikalId <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            
                var artikal = Context.Artikli.Where(p => p.ArtikalId == artikalId).FirstOrDefault();
                if (artikal != null && artikal.Obrisan==false)
                {
                    artikal.Obrisan=true;
                    await Context.SaveChangesAsync();
                    return Ok($"Artikal obrisan! ID: {artikal.ArtikalId}");
                }
                else
                {
                    return BadRequest("Artikal nije pronadjen");
                }
        }


        [Route("GetNarukvica")]
        [HttpGet]
        public async Task<List<Artikal>> GetNarukvica()
        {
            return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Narukvica.ToString()).ToListAsync();
        }

        [Route("GetSat")]
        [HttpGet]
        public async Task<List<Artikal>> GetSatovi()
        {
            return await Context.Artikli.Where(a => a.Tip.Naziv == Tipovi.Sat.ToString()).ToListAsync();
        }

        [Route("PostTip")]
        [HttpPost]
        public async Task<ActionResult> PostTip([FromBody] Tip tip)
        {

            if (tip.TipId < 0)
            {
                return BadRequest("Pogresan id!");
            }
            try
            {
                Context.Tipovi.Add(tip);
                await Context.SaveChangesAsync();
                return Ok($"Tip je dodat! ID je:{tip.TipId}");
            }
            catch (Exception e)
            {
                return BadRequest(e.InnerException);
            }
        }

        [Route("DodajArtikal/{Naziv}/{Cena}/{Opis}/{NaStanju}/{TipId}")]
        [HttpPost]
        public async Task<ActionResult> DodajArtikal(string Naziv, int Cena, string Opis, int NaStanju,int TipId)
        {
            if (string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
                return BadRequest("Pogresno unet parametar 'Naziv'!");

            var tip=await Context.Tipovi.Where(p => p.TipId == TipId).FirstOrDefaultAsync();
  
          try{     
            Artikal k = new Artikal();
            k.Naziv=Naziv;
            k.Cena=Cena;
            k.Opis=Opis;
            k.NaStanju=NaStanju;
            k.Tip=tip;

            Context.Artikli.Add(k);
            await Context.SaveChangesAsync();

            return Ok("Dodat je artikal.");
          }
          catch(Exception e)
          {
              return BadRequest(e.Message);
          }
        }

    //    [Route("VratiArtikal/{ArtikalId}")]
    //    [HttpGet]
    //    public async Task<ActionResult> VratiKandidateNaOsnovuJmbg(int ArtikalId)
    //    {
    //         if (ArtikalId == 0)
    //         {
    //              return BadRequest("Nepostojeci id!");
    //         }

    //         try{
    //             var artikal = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).ToListAsync(); 
    //             if (artikal == null)
    //             {
    //                 throw new Exception("Ne postoji artikal sa trazenim id-jem.");
    //             }
    //             return Ok(artikal);
    //         }
    //         catch(Exception e)
    //         {
    //             return BadRequest(e.Message);
    //         }
    //    }


        [Route("VratiArtikal/{ArtikalId}")]    
        [HttpGet]
        public async Task<ActionResult> VrariArtikal(int ArtikalId)
        {
            try
            {
                var artikal = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).FirstAsync();
                if(artikal == null)
                {
                    throw new Exception("Ne postoji trazeni artikal.");
                }

                var proizvod = await Context.Artikli.Where(p => p.ArtikalId == ArtikalId).Select(p => new{
                    artikalID = p.ArtikalId,
                    naziv = p.Naziv,
                    cena = p.Cena,
                    opis = p.Opis,
                    naStanju=p.NaStanju,
                    // artikalSlika=p.Image,
                    brojProdaja=p.BrojProdaja
                    // tip=p.Tip.TipId

                }).ToArrayAsync();
                return Ok(proizvod);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

       

    }
}