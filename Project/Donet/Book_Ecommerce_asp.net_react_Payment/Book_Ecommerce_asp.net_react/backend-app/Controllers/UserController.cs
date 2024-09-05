using Microsoft.AspNetCore.Mvc;
using BusinessLayer.Interface;
using Model;
using System.Collections.Generic;
using RespositoryLayer.CustomException;



[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserBL userBL;
    private readonly ResponseML responseML;

    public UserController(IUserBL userBL)
    {
        this.userBL = userBL;
        responseML = new ResponseML();
    }

    [HttpPost("CreateUser")]
    public ActionResult CreateUser(UserDTO model)
    {
        try
        {
            var result = userBL.CreateUser(model);

            responseML.Success = true;
            responseML.Message = $"User Id : {result.UserId} created successfully";
            responseML.Data = result;

            return StatusCode(201, responseML);
        }
        catch (UserException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return BadRequest(responseML);
        }
        
    }

    [HttpGet("GetAllUsers")]
    public ActionResult GetAllUsers()
    {
        try
        {
            var result = userBL.GetAllUsers();

            responseML.Success = true;
            responseML.Message = "Fetching all user details";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (UserException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return NotFound(responseML);
        }
    }

    [HttpGet("GetUser/{id}")]
    public ActionResult GetUserById(int id)
    {
        try
        {
            var result = userBL.GetUserById(id);

            responseML.Success = true;
            responseML.Message = "Fetching user details";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (UserException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return NotFound(responseML);
        }
       
    }

    [HttpPut("UpdateUser/{id}")]
    public ActionResult UpdateUser(int id, UserDTO model)
    {
        try
        {
            var result = userBL.UpdateUser(id, model);

            responseML.Success = true;
            responseML.Message = $"User Id : {id} updated successfully";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (UserException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return BadRequest(responseML);
        }
       
    }

    [HttpDelete("DeleteUser/{id}")]
    public ActionResult DeleteUser(int id)
    {
        try
        {
            var result = userBL.DeleteUser(id);

            responseML.Success = true;
            responseML.Message = $"User Id : {id} deleted successfully";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (UserException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return NotFound(responseML);
        }
      
    }
}

