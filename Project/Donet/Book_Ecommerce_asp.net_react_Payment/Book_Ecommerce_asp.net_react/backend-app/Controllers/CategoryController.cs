using BusinessLayer.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.CustomException;

namespace backend_app.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryBL categoryBL;
        private readonly  ResponseML responseML;

        public  CategoryController(ICategoryBL categoryBL)
        {
            this.categoryBL = categoryBL;
            responseML = new ResponseML();
        }

        [HttpPost("Adding-Category")]
        public ActionResult CreateCategory(CategoryDTO model)
        {
            try
            {
                var result = categoryBL.CreateCategory(model);

                responseML.Success = true;
                responseML.Message = $"Category id :{result.CategoryId} created Succefully ";
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
            [HttpGet("Get-All-Categorys")]
            public ActionResult GetAllCategory()
            {
                try
                {
                    var result = categoryBL.GetAllCategories();

                    responseML.Success = true;
                    responseML.Message = "Fetching all products details";
                    responseML.Data = result;

                    return StatusCode(200, responseML);
                }
                catch (CategoryException ex)
                {
                    responseML.Success = false;
                    responseML.Message = ex.Message;

                    return StatusCode(404, responseML);
                }
            }

        [HttpGet("Get-All-Category_id/{id}")]
        public ActionResult GetCategoryById(int id)
        {
            try
            {
                var result = categoryBL.GetCategoryId(id);

                responseML.Success = true;
                responseML.Message = "Fetching all products details";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (CategoryException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }


        [HttpPut("Update_Category_By_Id/{id}")]
        public ActionResult UpdateCategory(int id , CategoryDTO model)
        {
            try
            {
                var result = categoryBL.UpdateCategory(id, model);


                responseML.Success = true;
                responseML.Message = $"Category Id : {id} Updated Successfully";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (CategoryException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }

        [HttpDelete("delete_Category_by_Id/{id}")]
        public ActionResult DeleteCategory(int id)
        {
            try
            {
                var result = categoryBL.DeleteCategory(id);


                responseML.Success = true;
                responseML.Message = $"Category Id : {id} Deleted Successfully";
                responseML.Data = result;

                return StatusCode(200, responseML);
            }
            catch (CategoryException ex)
            {
                responseML.Success = false;
                responseML.Message = ex.Message;

                return StatusCode(404, responseML);
            }
        }


    }
}
