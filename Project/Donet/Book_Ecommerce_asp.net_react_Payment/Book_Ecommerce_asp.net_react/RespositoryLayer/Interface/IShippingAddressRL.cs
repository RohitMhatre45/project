using Model;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using System.Collections.Generic;

namespace RespositoryLayer.Interface
{
    public interface IShippingAddressRL
    {
     
        ShippingAddressEntity CreateShippingAddress(ShippingAddressDTO model);

      
        ShippingAddressEntity GetShippingAddressById(int id);

     
        List<ShippingAddressEntity> GetAllShippingAddresses();

       
        ShippingAddressEntity UpdateShippingAddress(int id, ShippingAddressDTO model);


        ShippingAddressEntity DeleteShippingAddress(int id);
    }
}
