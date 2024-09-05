using BusinessLayer.Interface;
using Model;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Service
{
    public class CartBL : ICartBL
    {
        private readonly ICartRL cartRL;

        public CartBL(ICartRL cartRL)
        {
            this.cartRL = cartRL;
        }

        public CartEntity CreateCart(CartDTO cart)
        {
            try
            {
                return cartRL.CreateCart(cart);
            }
            catch (CartException)
            {
                throw;
            }
        }

        public List<CartEntity> GetAllCarts()
        {
            try
            {
                return cartRL.GetAllCarts();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CartEntity GetCartById(int id)
        {
            try
            {
                return cartRL.GetCartById(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CartEntity UpdateCart(int id, CartDTO cart)
        {
            try
            {
                return cartRL.UpdateCart(id, cart);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public CartEntity DeleteCart(int id)
        {
            try
            {
                return cartRL.DeleteCart(id);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
