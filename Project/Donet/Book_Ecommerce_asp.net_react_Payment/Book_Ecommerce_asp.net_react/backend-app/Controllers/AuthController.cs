using backend_app.Jwt;
using BusinessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Model;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserBL _userBL;
    private readonly TokenService _tokenService;

    public AuthController(IUserBL userBL, TokenService tokenService)
    {
        _userBL = userBL;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserDTO model)
    {
        var user = _userBL.GetAllUsers().FirstOrDefault(u => u.Email == model.Email && u.Password == model.Password);

        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = _tokenService.GenerateToken(user.UserId.ToString(), user.userRole.userRole);

        return Ok(new { Token = token });
    }
}
