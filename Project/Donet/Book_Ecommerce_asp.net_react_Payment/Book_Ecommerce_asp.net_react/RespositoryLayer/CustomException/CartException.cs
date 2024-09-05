using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.CustomException
{
    public class CartException : Exception
    {
        public CartException(string message) : base(message) { }
    }

}
