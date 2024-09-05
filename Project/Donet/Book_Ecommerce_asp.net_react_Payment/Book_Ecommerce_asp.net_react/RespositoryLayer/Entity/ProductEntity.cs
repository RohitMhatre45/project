using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using RepositoryLayer.Entity;

namespace RespositoryLayer.Entity
{
    public class ProductEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ProductId { get; set; }

        [Required]
        [StringLength(100)]
        public string ProductName { get; set; }

        [StringLength(500)]
        public string ProductDescription { get; set; } = string.Empty;

        [Required]
        [ForeignKey("Category")]
        public int CategoryId { get; set; }
        public Category Category { get; set; }

        [Required]
        [Range(0, long.MaxValue)]
        public long ProductPrice { get; set; }

        [Range(0, long.MaxValue)]
        public long DiscountPrice { get; set; }

        [Required]
        [Range(0, int.MaxValue)]
        public int StockQuantity { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public string ImageUrl { get; set; }

     

        // Add UserId for Seller
        [ForeignKey("UserEntity")]
        public int UserId { get; set; }
        public UserEntity User { get; set; } 

        [JsonIgnore]
        public ICollection<WishListEntity> Wishlists { get; set; }
        [JsonIgnore]
        public ICollection<CartEntity> Carts { get; set; }

        [JsonIgnore]
        public ICollection<OrderEntity> Order { get; set; }
    }
}
