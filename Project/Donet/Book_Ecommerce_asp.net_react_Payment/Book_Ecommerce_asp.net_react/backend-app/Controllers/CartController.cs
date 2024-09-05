using BusinessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using System;

namespace backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartBL cartBL;
        private readonly ResponseML responseML;

        public CartController(ICartBL cartBL)
        {
            this.cartBL = cartBL;
            responseML = new ResponseML();
        }

        [HttpPost("Add-Cart")]
        public ActionResult<ResponseML> CreateCart([FromBody] CartDTO model)
        {
            try
            {
                if (model == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdCart = cartBL.CreateCart(model);
                
                responseML.Success = true;
                responseML.Message = "Product Addded to cart successfully";
                responseML.Data = createdCart;

                return StatusCode(201, responseML);
            }
            catch (CartException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(500, responseML);
            }
        }
        

        [HttpGet("Get-All-Carts")]
        public ActionResult GetAllCarts()
        {
            try
            {
                var result = cartBL.GetAllCarts();

                responseML.Success = true;
                responseML.Message = "Fetching all carts.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (Exception ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(400, responseML);
            }
        }

        [HttpGet("Get-Cart-By-Id/{id}")]
        public ActionResult GetCartById(int id)
        {
            try
            {
                var result = cartBL.GetCartById(id);

                responseML.Success = true;
                responseML.Message = $"Fetching details of cart with id : {id}.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (Exception ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(400, responseML);
            }
        }

        [HttpPut("Update-Cart-By-Id/{id}")]
        public ActionResult UpdateCart(int id, CartDTO cart)
        {
            try
            {
                var result = cartBL.UpdateCart(id, cart);

                responseML.Success = true;
                responseML.Message = $"Cart Id : {id} updated successfully.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (Exception ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(400, responseML);
            }
        }

        [HttpDelete("Delete-Cart-By-Id/{id}")]
        public ActionResult DeleteCart(int id)
        {
            try
            {
                var result = cartBL.DeleteCart(id);

                responseML.Success = true;
                responseML.Message = $"Cart Id : {id} deleted successfully.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (Exception ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(400, responseML);
            }
        }
    }
}
