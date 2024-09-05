using BusinessLayer.Interface;
using Model;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using RespositoryLayer.Service;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Service
{
    public class ShippingAddressBL : IShippingAddressBL
    {
        private readonly IShippingAddressRL shippingAddressRL;

        public ShippingAddressBL(IShippingAddressRL shippingAddressRL)
        {
            this.shippingAddressRL = shippingAddressRL;
        }

        public ShippingAddressEntity CreateShippingAddress(ShippingAddressDTO address)
        {
            try
            {
                return shippingAddressRL.CreateShippingAddress(address);
            }
            catch (ShippingAddressException ex)
            {
                throw new Exception($"An error occurred while creating the shipping address: {ex.Message}");
            }
        }

        public List<ShippingAddressEntity> GetAllShippingAddresses()
        {
            try
            {
                return shippingAddressRL.GetAllShippingAddresses();
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving shipping addresses: {ex.Message}");
            }
        }

        public ShippingAddressEntity GetShippingAddressById(int id)
        {
            try
            {
                return shippingAddressRL.GetShippingAddressById(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while retrieving the shipping address: {ex.Message}");
            }
        }

        public ShippingAddressEntity UpdateShippingAddress(int id, ShippingAddressDTO address)
        {
            try
            {
                return shippingAddressRL.UpdateShippingAddress(id, address);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while updating the shipping address: {ex.Message}");
            }
        }

        public ShippingAddressEntity DeleteShippingAddress(int id)
        {
            try
            {
                return shippingAddressRL.DeleteShippingAddress(id);
            }
            catch (Exception ex)
            {
                throw new Exception($"An error occurred while deleting the shipping address: {ex.Message}");
            }
        }
    }
}
