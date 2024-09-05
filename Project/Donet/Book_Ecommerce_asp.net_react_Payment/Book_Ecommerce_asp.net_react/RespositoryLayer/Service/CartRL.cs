using Microsoft.EntityFrameworkCore;
using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;

namespace RespositoryLayer.Service
{
    public class CartRL : ICartRL
    {
        private readonly BookEcommerceContext _context;

        public CartRL(BookEcommerceContext context)
        {
            _context = context;
        }

        public CartEntity CreateCart(CartDTO cart)
        {
            try
            {
                var existingCart = _context.cart.FirstOrDefault(c => c.ProductId == cart.ProductId);
                if (existingCart != null)
                {
                    throw new CartException("Product Already added to cart");
                }

               CartEntity cartEntity = new CartEntity()
               {
                   UserId = cart.UserId,
                   ProductId = cart.ProductId,
                   Quantity = cart.Quantity
               };

                _context.cart.Add(cartEntity);
                _context.SaveChanges();

                return cartEntity;

            }
            catch (Exception)
            {
                throw;
            }
        }

        public CartEntity DeleteCart(int id)
        {
            try
            {
                var cartEntity = _context.cart.Find(id);
                if (cartEntity == null)
                {
                    throw new CartException($"Cart with Id: {id} does not exist");
                }

                _context.cart.Remove(cartEntity);
                _context.SaveChanges();

                return cartEntity;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public List<CartEntity> GetAllCarts()
        {
            try
            {
                return _context.cart.Include(c => c.Product)
                                    .Include(c => c.User)
                                    .ToList();
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public CartEntity GetCartById(int id)
        {
            try
            {
                var cartEntity = _context.cart.Include(c => c.Product)
                                              .Include(c => c.User)
                                              .FirstOrDefault(c => c.CartId == id);

                if (cartEntity == null)
                {
                    throw new CartException($"Cart with Id: {id} does not exist");
                }

                return cartEntity;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        public CartEntity UpdateCart(int id, CartDTO cart)
        {
            try
            {
                var cartEntity = _context.cart.Find(id);
                if (cartEntity == null)
                {
                    throw new CartException($"Cart with Id: {id} does not exist");
                }

           
                cartEntity.Quantity = cart.Quantity;

                _context.cart.Update(cartEntity);
                _context.SaveChanges();

                return cartEntity;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

       
    }
}