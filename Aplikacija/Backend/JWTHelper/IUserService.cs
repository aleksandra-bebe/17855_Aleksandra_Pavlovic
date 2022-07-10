using Microsoft.Extensions.Options;
using Projekat.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace projekat.JWTHelper
{
  public interface IUserService
  {
    string AuthenticateKorisnik(Korisnik korisinik);
    IEnumerable<Korisnik> GetAll();
    Korisnik GetById(int id);
  }

  public class UserService : IUserService
  {
    private ShopContext _context;
    private IJwtUtils _jwtUtils;
    private readonly AppSettings _appSettings;

    public UserService(
        ShopContext context,
        IJwtUtils jwtUtils,
        IOptions<AppSettings> appSettings)
    {
      _context = context;
      _jwtUtils = jwtUtils;
      _appSettings = appSettings.Value;
    }


    public string AuthenticateKorisnik(Korisnik korisinik)
    {
      var user = _context.Korisnici.SingleOrDefault(x => x.KorisnikId == korisinik.KorisnikId);

      // validate
      if (user == null || user.Sifra != korisinik.Sifra)
        throw new AppException("Username or password is incorrect");

      // authentication successful so generate jwt token
      var jwtToken = _jwtUtils.GenerateJwtToken(user.KorisnikId);

      return jwtToken;
    }

    public IEnumerable<Korisnik> GetAll()
    {
      return _context.Korisnici;
    }

    public Korisnik GetById(int id)
    {
      var user = _context.Korisnici.Find(id);
      if (user == null) throw new KeyNotFoundException("User not found");
      return user;
    }
  }
}
