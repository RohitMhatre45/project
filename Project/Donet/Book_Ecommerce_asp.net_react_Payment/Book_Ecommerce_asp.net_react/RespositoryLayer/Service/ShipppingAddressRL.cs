using Microsoft.EntityFrameworkCore;
using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity.RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RespositoryLayer.Service
{
    public class ShippingAddressRL: IShippingAddressRL
    {
        private readonly BookEcommerceContext _context;

        public ShippingAddressRL(BookEcommerceContext context)
        {
            _context = context;
        }

        public ShippingAddressEntity CreateShippingAddress(ShippingAddressDTO model)
        {
            try
            {
                var shippingAddress = new ShippingAddressEntity
                {
                    UserId = model.UserId,
                    FullAddress = model.FullAddress,
                    State = model.State,
                    City = model.City,
                    ZipCode = model.ZipCode,

                };

                _context.shippingAddress.Add(shippingAddress);
                _context.SaveChanges();

                return shippingAddress;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public ShippingAddressEntity GetShippingAddressById(int id)
        {
            try
            {
                var shippingAddress = _context.shippingAddress.Find(id);
                if (shippingAddress == null)
                {
                    throw new ShippingAddressException($"Shipping address with Id {id} does not exist.");
                }

                return shippingAddress;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<ShippingAddressEntity> GetAllShippingAddresses()
        {
            try
            {
                return _context.shippingAddress.ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public ShippingAddressEntity UpdateShippingAddress(int id, ShippingAddressDTO model)
        {
            try
            {
                var shippingAddress = _context.shippingAddress.Find(id);
                if (shippingAddress == null)
                {
                    throw new ShippingAddressException($"Shipping address with Id {id} does not exist.");
                }

                shippingAddress.FullAddress = model.FullAddress;
                shippingAddress.State = model.State;
                shippingAddress.City = model.City;
                shippingAddress.ZipCode = model.ZipCode;


                _context.shippingAddress.Update(shippingAddress);
                _context.SaveChanges();

                return shippingAddress;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public ShippingAddressEntity DeleteShippingAddress(int id)
        {
            try
            {
                var shippingAddress = _context.shippingAddress.Find(id);
                if (shippingAddress == null)
                {
                    throw new Exception($"Shipping address with Id {id} does not exist.");
                }

                _context.shippingAddress.Remove(shippingAddress);
                _context.SaveChanges();

                return shippingAddress;
            }
            catch (ShippingAddressException ex)
            {
                throw;
            }
        }
    }
}
