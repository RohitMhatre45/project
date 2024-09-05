using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;


namespace Model
{
    public class ProductDTO
    {
        [Required(ErrorMessage = "Product Name is required")]
        [StringLength(100, ErrorMessage = "Product Name cannot exceed 100 characters")]
        public string ProductName { get; set; }

        [StringLength(500, ErrorMessage = "Product Description cannot exceed 500 characters")]
        public string ProductDescription { get; set; } = string.Empty;

        [Required(ErrorMessage = "Category ID is required")]
        public int CategoryId { get; set; }

        [Required(ErrorMessage = "Product Price is required")]
        [Range(0, long.MaxValue, ErrorMessage = "Price must be a positive value")]
        public long ProductPrice { get; set; }

        [Range(0, long.MaxValue, ErrorMessage = "Discount Price must be a positive value")]
        public long DiscountPrice { get; set; }

        [Required(ErrorMessage = "Stock Quantity is required")]
        [Range(0, int.MaxValue, ErrorMessage = "Stock Quantity must be a positive value")]
        public int StockQuantity { get; set; }

        public IFormFile? ImageFile { get; set; }

        public string ImageUrl { get; set; }

        [Required]
        public int UserId { get; set; } // The ID of the seller who added the product
    }

}
