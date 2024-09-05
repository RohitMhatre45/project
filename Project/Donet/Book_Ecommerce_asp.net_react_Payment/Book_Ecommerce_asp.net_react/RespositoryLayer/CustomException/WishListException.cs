using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RespositoryLayer.CustomException
{
    public class WishListException : Exception
    {
        public  WishListException(string message) : base(message) { }
    }

}
