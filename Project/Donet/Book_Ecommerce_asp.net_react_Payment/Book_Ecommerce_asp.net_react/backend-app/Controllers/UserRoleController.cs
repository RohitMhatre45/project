using BusinessLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.CustomException;

namespace backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserRoleController : ControllerBase
    {

        private readonly IUserRoleBL userRoleBL;
        private readonly ResponseML responseML;

        public UserRoleController(IUserRoleBL userRoleBL)
        {
            this.userRoleBL = userRoleBL;
            responseML = new ResponseML();
        }

        [HttpPost("Adding-UserRole")]
        public ActionResult CreateUserRole(UserRoleDTO model)
        {
            try
            {
                var result = userRoleBL.CreateUserRole(model);

                responseML.Success = true;
                responseML.Message = $"Userid id :{result.UserRoleId} created Succefully ";
                responseML.Data = result;

                return StatusCode(201, responseML);
            }
            catch (CategoryException ex)
            {

                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);

            }
        }
        [HttpGet("Get-All-UserRoles")]
        public ActionResult GetAllUserRoles()
        {
            try
            {
                var result = userRoleBL.GetAllUserRoles();

                responseML.Success = true;
                responseML.Message = "Fetching all user roles details";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (UserRoleException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpGet("Get-UserRole-By-Id/{id}")]
        public ActionResult GetUserRoleById(int id)
        {
            try
            {
                var result = userRoleBL.GetUserRoleById(id);

                responseML.Success = true;
                responseML.Message = "Fetching user role details";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (UserRoleException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpPut("Update-UserRole-By-Id/{id}")]
        public ActionResult UpdateUserRole(int id, UserRoleDTO model)
        {
            try
            {
                var result = userRoleBL.UpdateUserRole(id, model);

                responseML.Success = true;
                responseML.Message = $"UserRole Id : {id} Updated Successfully";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (UserRoleException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpDelete("Delete-UserRole-By-Id/{id}")]
        public ActionResult DeleteUserRole(int id)
        {
            try
            {
                var result = userRoleBL.DeleteUserRole(id);

                responseML.Success = true;
                responseML.Message = $"UserRole Id : {id} Deleted Successfully";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (UserRoleException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }


    }
}
