﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model
{
    public class ShippingAddressDTO
    {
        public int UserId { get; set; }
     

        public string FullAddress { get; set; }

       
        public string State { get; set; }

      
        public string City { get; set; }

      
        public string ZipCode { get; set; }

    }
}
