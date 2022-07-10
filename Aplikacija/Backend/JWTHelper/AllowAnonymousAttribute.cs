using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projekat.JWTHelper
{
  [AttributeUsage(AttributeTargets.Method)]
  public class AllowAnonymousAttribute : Attribute
  { }
}
