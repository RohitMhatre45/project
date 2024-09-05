using BusinessLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.CustomException;
using System.Collections.Generic;

namespace backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WishListController : ControllerBase
    {
        private readonly IWishListBL wishListBL;
        private readonly ResponseML responseML;

        public WishListController(IWishListBL wishListBL)
        {
            this.wishListBL = wishListBL;
            responseML = new ResponseML();
        }

        [HttpPost("Add-WishList")]
        public ActionResult CreateWishList(WishListDTO model)
        {
            try
            {
                var result = wishListBL.CreateWishList(model);

                responseML.Success = true;
                responseML.Message = $"WishList item with id :{result.Id} created successfully.";
                responseML.Data = result;

                return StatusCode(201, responseML);
            }
            catch (WishListException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpGet("Get-All-WishLists")]
        public ActionResult GetAllWishLists()
        {
            try
            {
                var result = wishListBL.GetAllWishLists();

                responseML.Success = true;
                responseML.Message = "Fetching all wishlist items.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (WishListException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpGet("Get-WishList/{id}")]
        public ActionResult GetWishListById(int id)
        {
            try
            {
                var result = wishListBL.GetWishListById(id);

                responseML.Success = true;
                responseML.Message = "Fetching wishlist item.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (WishListException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpPut("Update-WishList/{id}")]
        public ActionResult UpdateWishList(int id, WishListDTO model)
        {
            try
            {
                var result = wishListBL.UpdateWishList(id, model);

                responseML.Success = true;
                responseML.Message = $"WishList item with id : {id} updated successfully.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (WishListException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpDelete("Delete-WishList/{id}")]
        public ActionResult DeleteWishList(int id)
        {
            try
            {
                var result = wishListBL.DeleteWishList(id);

                responseML.Success = true;
                responseML.Message = $"WishList item with id : {id} deleted successfully.";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (WishListException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }
    }
}

