using BusinessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.CustomException;

[Route("api/[controller]")]
[ApiController]
public class ProductController : ControllerBase
{
    private readonly IProductBL productBL;
    private readonly IWebHostEnvironment _hostingEnvironment;
    private readonly ResponseML responseML;

    public ProductController(IProductBL productBL, IWebHostEnvironment hostingEnvironment)
    {
        this.productBL = productBL;
        _hostingEnvironment = hostingEnvironment;
        responseML = new ResponseML();
    }

    [HttpPost("Adding-Product")]
    public async Task<ActionResult> CreateProduct([FromForm] ProductDTO model)
    {
        try
        {
            if (model.ImageFile != null)
            {
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", model.ImageFile.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ImageFile.CopyToAsync(stream);
                }
                model.ImageUrl = $"/images/{model.ImageFile.FileName}";
            }

            var result = productBL.CreateProduct(model);

            responseML.Success = true;
            responseML.Message = $"Product Id : {result.ProductId} created Successfully";
            responseML.Data = result;

            return StatusCode(201, responseML);
        }
        catch (ProductException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return StatusCode(404, responseML);
        }
    }

    [HttpGet("Get-All-Product")]
    public ActionResult GetAllProducts()
    {
        try
        {
            var result = productBL.GetAllProducts();

            responseML.Success = true;
            responseML.Message = "Fetching all products details";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (ProductException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return StatusCode(404, responseML);
        }
    }

    [HttpGet("Get-Product_id/{id}")]
    public ActionResult GetProductById(int id)
    {
        try
        {
            var result = productBL.GetProductById(id);

            responseML.Success = true;
            responseML.Message = "Fetching product details";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (ProductException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return StatusCode(404, responseML);
        }
    }

    [HttpPut("Update_Product_By_Id/{id}")]
    public async Task<ActionResult> UpdateProduct(int id, [FromForm] ProductDTO model)
    {
        try
        {
            if (model.ImageFile != null)
            {
                var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "images", model.ImageFile.FileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await model.ImageFile.CopyToAsync(stream);
                }
                model.ImageUrl = $"/images/{model.ImageFile.FileName}";
            }

            var result = productBL.UpdateProduct(id, model);

            responseML.Success = true;
            responseML.Message = $"Product Id : {id} Updated Successfully";
            responseML.Data = result;

            return StatusCode(200, responseML);
        }
        catch (ProductException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return StatusCode(404, responseML);
        }
    }

    [HttpDelete("delete_Product_by_Id/{id}")]
    public ActionResult DeleteProduct(int id)
    {
        try
        {
            var result = productBL.DeleteProduct(id);

            responseML.Success = true;
            responseML.Message = $"Product Id : {id} Deleted Successfully";
            responseML.Data = result;

            return StatusCode(202, responseML);
        }
        catch (ProductException ex)
        {
            responseML.Success = false;
            responseML.Message = ex.Message;

            return StatusCode(404, responseML);
        }
    }
}
