using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace RespositoryLayer.Entity
{
    public class CartEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CartId { get; set; }

        [ForeignKey("UserEntity")]
        public int UserId { get; set; } 
        public UserEntity User { get; set; }
        [ForeignKey("ProductEntity")]
        public int ProductId { get; set; }
        public  ProductEntity Product { get; set; }
        public int Quantity { get; set; }

        [JsonIgnore]
        public ICollection<OrderEntity> Order { get; set; }

    }
}



