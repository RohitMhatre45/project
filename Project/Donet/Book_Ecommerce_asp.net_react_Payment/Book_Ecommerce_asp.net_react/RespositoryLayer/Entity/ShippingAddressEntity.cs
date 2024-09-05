using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace RespositoryLayer.Entity
{
   
namespace RespositoryLayer.Entity
    {
        public class ShippingAddressEntity
        {
            [Key]
            [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
            public int ShippingAddressId { get; set; }

            [ForeignKey("UserEntity")]
            public int UserId { get; set; }
            public UserEntity User { get; set; }

            [Required]
            public string FullAddress { get; set; }

            [Required]
            [StringLength(100)]
            public string State { get; set; }

            [Required]
            [StringLength(100)]
            public string City { get; set; }

            [Required]
            [StringLength(20)]
            public string ZipCode { get; set; }

            [JsonIgnore]
            public ICollection<OrderEntity> Order { get; set; }
        }
    }

}

