using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class WishListDTO
    {
        public int UserId { get; set; }
        public int ProductId { get; set; }
        

        // Optional: Include additional information about the user and product
        public string UserName { get; set; } // Example additional property
        public string ProductName { get; set; } // Example additional property
        public long ProductPrice { get; set; } //
    }
}
