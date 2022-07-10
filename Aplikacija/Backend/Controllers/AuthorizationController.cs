using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Projekat.Models;
using System.Net.Http;
using projekat.JWTHelper;

namespace Projekat.Controllers
{
  [Authorize]
  [ApiController]
  [Route("[controller]")]
  public class AuthorizationController : ControllerBase
  {
    public ShopContext Context { get; set; }
    public AuthorizationController(ShopContext context)
    {
      Context = context;
    }

    [Authorize(Role.User)]
    [Route("AuthorizeUser")]
    [HttpGet]
    public async Task<ActionResult> AuthorizeUser()
    {
      try
      {
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }

    [Authorize(Role.Admin)]
    [Route("AuthorizeAdmin")]
    [HttpGet]
    public async Task<ActionResult> AuthorizeAdmin()
    {
      try
      {
        return Ok();
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }

    }
  }
}