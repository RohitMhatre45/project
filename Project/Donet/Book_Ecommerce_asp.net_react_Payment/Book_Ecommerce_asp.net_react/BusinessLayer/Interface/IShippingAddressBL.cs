using Model;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using System.Collections.Generic;

namespace BusinessLayer.Interface
{
    public interface IShippingAddressBL
    {
        ShippingAddressEntity CreateShippingAddress(ShippingAddressDTO address);
        List<ShippingAddressEntity> GetAllShippingAddresses();
        ShippingAddressEntity GetShippingAddressById(int id);
        ShippingAddressEntity UpdateShippingAddress(int id, ShippingAddressDTO address);
        ShippingAddressEntity DeleteShippingAddress(int id);
    }
}
