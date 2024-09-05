using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using BusinessLayer.Interface;
using Model;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
[Authorize] // Ensure the user is authenticated
public class ProtectedController : ControllerBase
{
    private readonly IUserBL _userBL;

    public ProtectedController(IUserBL userBL)
    {
        _userBL = userBL;
    }

    // GET: api/protected
    [HttpGet]
    public ActionResult<IEnumerable<UserDTO>> GetAllUsers()
    {
        try
        {
            var users = _userBL.GetAllUsers();
            var userDtos = users.Select(u => new UserDTO
            {
                //UserId = u.UserId,
                FullName = u.FullName,
                Email = u.Email,
                PhoneNumber = u.PhoneNumber,
                UserRoleId = u.UserRoleId,
                ConfirmPassword = null, // Avoid sending sensitive data
                Password = null // Avoid sending sensitive data
            }).ToList();

            return Ok(userDtos);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
        }
    }

    // GET: api/protected/{id}
    [HttpGet("{id}")]
    public ActionResult<UserDTO> GetUserById(int id)
    {
        try
        {
            var user = _userBL.GetUserById(id);
            if (user == null)
            {
                return NotFound(new { Message = $"User with Id {id} not found" });
            }

            var userDto = new UserDTO
            {
               // UserId = user.UserId,
                FullName = user.FullName,
                Email = user.Email,
                PhoneNumber = user.PhoneNumber,
                UserRoleId = user.UserRoleId,
                ConfirmPassword = null, // Avoid sending sensitive data
                Password = null // Avoid sending sensitive data
            };

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
        }
    }

    // POST: api/protected
    [HttpPost]
    public ActionResult<UserDTO> CreateUser([FromBody] UserDTO model)
    {
        try
        {
            var createdUser = _userBL.CreateUser(model);

            var userDto = new UserDTO
            {
                //UserId = createdUser.UserId,
                FullName = createdUser.FullName,
                Email = createdUser.Email,
                PhoneNumber = createdUser.PhoneNumber,
                UserRoleId = createdUser.UserRoleId,
                ConfirmPassword = null, // Avoid sending sensitive data
                Password = null // Avoid sending sensitive data
            };

            return CreatedAtAction(nameof(GetUserById), new { id = createdUser.UserId }, userDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
        }
    }

    // PUT: api/protected/{id}
    [HttpPut("{id}")]
    public ActionResult UpdateUser(int id, [FromBody] UserDTO model)
    {
        try
        {
            var updatedUser = _userBL.UpdateUser(id, model);
            if (updatedUser == null)
            {
                return NotFound(new { Message = $"User with Id {id} not found" });
            }

            var userDto = new UserDTO
            {
                //UserId = updatedUser.UserId,
                FullName = updatedUser.FullName,
                Email = updatedUser.Email,
                PhoneNumber = updatedUser.PhoneNumber,
                UserRoleId = updatedUser.UserRoleId,
                ConfirmPassword = null, // Avoid sending sensitive data
                Password = null // Avoid sending sensitive data
            };

            return Ok(userDto);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
        }
    }

    // DELETE: api/protected/{id}
    [HttpDelete("{id}")]
    public ActionResult DeleteUser(int id)
    {
        try
        {
            var deletedUser = _userBL.DeleteUser(id);
            if (deletedUser == null)
            {
                return NotFound(new { Message = $"User with Id {id} not found" });
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { Message = $"Internal server error: {ex.Message}" });
        }
    }
}
