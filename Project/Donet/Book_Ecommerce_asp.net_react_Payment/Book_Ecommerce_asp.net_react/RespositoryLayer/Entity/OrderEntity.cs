using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace RespositoryLayer.Entity
{
    public class OrderEntity
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public UserEntity User { get; set; }
        [ForeignKey("ShippingAddressEntity")]
        public int ShippingAddressId { get; set; }
        public ShippingAddressEntity ShippingAddress { get; set; }
        [ForeignKey("CartEntity")]
        public int CartId { get; set; }
        public CartEntity Cart { get; set; }

        [ForeignKey("ProductEntity")]
        public int ProductId { get; set; }

        public ProductEntity Product { get; set; }
        public int Quantity { get; set; }
        public double TotalPrice { get; set; }

        // New Payment Entity Reference
        public PaymentEntity Payment { get; set; }
    }
}
