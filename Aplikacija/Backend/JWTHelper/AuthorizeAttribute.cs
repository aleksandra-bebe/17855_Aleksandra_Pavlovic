﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Projekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projekat.JWTHelper
{
  [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
  public class AuthorizeAttribute : Attribute, IAuthorizationFilter
  {
    private readonly IList<Role> _roles;

    public AuthorizeAttribute(params Role[] roles)
    {
      _roles = roles ?? new Role[] { };
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
      // skip authorization if action is decorated with [AllowAnonymous] attribute
      var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
      if (allowAnonymous)
        return;

      // authorization
      var user = (Korisnik)context.HttpContext.Items["User"];
      if (user == null || (_roles.Any() && !_roles.Contains(user.TipKorisnika)))
      {
        // not logged in or role not authorized
        context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };
      }
    }
  }
}
