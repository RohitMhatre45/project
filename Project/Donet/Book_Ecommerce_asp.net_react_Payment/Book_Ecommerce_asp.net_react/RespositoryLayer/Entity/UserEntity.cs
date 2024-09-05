using Microsoft.EntityFrameworkCore.Diagnostics;
using RepositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RespositoryLayer.Entity
{
    public class UserEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [ForeignKey("UserRoleEntity")]
        public int UserRoleId { get; set; }
        public UserRoleEntity userRole { get; set; }

        [Required]
        [StringLength(255)]
        public string? FullName { get; set; }

        [Required]
        [StringLength(255)]
        [EmailAddress]
        public string? Email { get; set; }

        [Required]
        [StringLength(255)]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [NotMapped]
        [Compare("Password", ErrorMessage = "Password and Confirmation Password do not match.")]
        [DataType(DataType.Password)]
        public string? ConfirmPassword { get; set; }

        [Required]
        [StringLength(50)]
        public string? PhoneNumber { get; set; }

        [Required]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Required]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        

        [JsonIgnore]
        public ICollection<ProductEntity> Products { get; set; }

        [JsonIgnore]
        public ICollection<WishListEntity> Wishlists { get; set; }

        [JsonIgnore]
        public ICollection<CartEntity> Carts { get; set; }

        [JsonIgnore]
        public ICollection<ShippingAddressEntity> ShippingAddresses {  get; set; }   

        [JsonIgnore]
        public ICollection<OrderEntity> Order { get; set; }
    }
}
