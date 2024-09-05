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
    public class ShippingAddressController : ControllerBase
    {
        private readonly IShippingAddressBL shippingAddressBL;
        private readonly ResponseML responseML;

        public ShippingAddressController(IShippingAddressBL shippingAddressBL)
        {
            this.shippingAddressBL = shippingAddressBL;
            responseML = new ResponseML();
        }

        [HttpPost("Add-ShippingAddress")]
        public ActionResult<ResponseML> CreateShippingAddress([FromBody] ShippingAddressDTO model)
        {
            try
            {
                if (model == null || !ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var createdAddress = shippingAddressBL.CreateShippingAddress(model);

                responseML.Success = true;
                responseML.Message = "Shipping address added successfully.";
                responseML.Data = createdAddress;

                return StatusCode(201, responseML);
            }
            catch (ShippingAddressException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(500, responseML);
            }
        }

        [HttpGet("Get-All-ShippingAddresses")]
        public ActionResult GetAllShippingAddresses()
        {
            try
            {
                var result = shippingAddressBL.GetAllShippingAddresses();

                responseML.Success = true;
                responseML.Message = "Fetching all shipping addresses.";
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

        [HttpGet("Get-ShippingAddress-By-Id/{id}")]
        public ActionResult GetShippingAddressById(int id)
        {
            try
            {
                var result = shippingAddressBL.GetShippingAddressById(id);

                responseML.Success = true;
                responseML.Message = $"Fetching details of shipping address with id: {id}.";
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

        [HttpPut("Update-ShippingAddress-By-Id/{id}")]
        public ActionResult UpdateShippingAddress(int id, [FromBody] ShippingAddressDTO address)
        {
            try
            {
                var result = shippingAddressBL.UpdateShippingAddress(id, address);

                responseML.Success = true;
                responseML.Message = $"Shipping address Id: {id} updated successfully.";
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

        [HttpDelete("Delete-ShippingAddress-By-Id/{id}")]
        public ActionResult DeleteShippingAddress(int id)
        {
            try
            {
                var result = shippingAddressBL.DeleteShippingAddress(id);

                responseML.Success = true;
                responseML.Message = $"Shipping address Id: {id} deleted successfully.";
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
