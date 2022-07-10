using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using projekat.JWTHelper;
using Projekat.Models;


namespace Proba.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class TipController : ControllerBase
  {
    public ShopContext Context { get; set; }

    public TipController(ShopContext context)
    {
      Context = context;
    }

    [AllowAnonymous]
    [Route("GetTip")]
    [HttpGet]
    public async Task<List<Tip>> GetTip()
    {
      return await Context.Tipovi.Where(p => p.TipId > 0 && p.Obrisan == false).ToListAsync();
    }

    [Authorize(Role.Admin)]
    [Route("DodajNoviTip/{Naziv}")]
    [HttpPost]
    public async Task<ActionResult> DodajNoviTip(string Naziv)
    {
      if (string.IsNullOrWhiteSpace(Naziv) || Naziv.Length > 50)
        return BadRequest("Pogresno unet parametar 'Naziv'!");

      try
      {
        Tip t = new Tip();
        t.Naziv = Naziv;

        Context.Tipovi.Add(t);
        await Context.SaveChangesAsync();

        return Ok("Dodat je tip.");
      }
      catch (Exception e)
      {
        return BadRequest(e.InnerException);
      }
    }

    [Authorize(Role.Admin)]
    [Route("ObrisiTip/{id}")]
    [HttpDelete]
    public async Task<ActionResult> ObrisiTip(int id)
    {
      if (id <= 0)
      {
        return BadRequest("Pogresan ID!");
      }
      try
      {
        var t = await Context.Tipovi.FindAsync(id);
        t.Obrisan = true;
        Context.Tipovi.Update(t);
        await Context.SaveChangesAsync();
        return Ok($"Uspesno izbrisan tip sa id:{t.TipId}");

      }
      catch (Exception e)
      {
        return BadRequest(e.InnerException);
      }
    }

  }
}
