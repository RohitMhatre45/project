using Microsoft.EntityFrameworkCore;
using Model;
using RepositoryLayer.Entity;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RespositoryLayer.Service
{
    public class WishlistRL : IWishlistRL
    {
        private readonly BookEcommerceContext _context;

        public WishlistRL(BookEcommerceContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public WishListEntity CreateWishList(WishListDTO model)
        {
            bool userExists = _context.users.Any(u => u.UserId == model.UserId);
            if (!userExists)
            {
                throw new WishListException($"User with Id: {model.UserId} does not exist.");
            }

            bool productExists = _context.products.Any(p => p.ProductId == model.ProductId);
            if (!productExists)
            {
                throw new WishListException($"Product with Id: {model.ProductId} does not exist.");
            }

            var wishList = new WishListEntity()
            {
                UserId = model.UserId,
                ProductId = model.ProductId,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now
            };

            _context.Add(wishList);
            _context.SaveChanges();

            // Load related entities
            _context.Entry(wishList).Reference(w => w.User).Load();
            _context.Entry(wishList).Reference(w => w.Product).Load();

            return wishList;
        }


        public List<WishListEntity> GetAllWishList()
        {
            try
            {
                var wishList = _context.wishlist
                                   .Include(wl => wl.Product)
                                   .Include(wl => wl.User)
                                   .ToList();
                if (wishList.Count == 0)
                {
                    throw new WishListException("No wishlist items found.");
                }
                return wishList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public WishListEntity GetWishListById(int id)
        {
            try
            {
                var wishList = _context.wishlist
                                       .Include(wl => wl.Product)
                                       .Include(wl => wl.User)
                                       .FirstOrDefault(wl => wl.UserId == id);
                if (wishList == null)
                {
                    throw new WishListException($"Wishlist item with Id: {id} does not exist.");
                }
                return wishList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public WishListEntity UpdateWishList(int id, WishListDTO model)
        {
            try
            {
                var wishList = _context.wishlist.FirstOrDefault(wl => wl.Id == id);
                if (wishList == null)
                {
                    throw new WishListException($"Wishlist item with Id: {id} does not exist.");
                }

                wishList.UserId = model.UserId;
                wishList.ProductId = model.ProductId;
                wishList.UpdatedAt = DateTime.Now;

                _context.Update(wishList);
                _context.SaveChanges();

                return wishList;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public WishListEntity DeleteWishList(int id)
        {
            try
            {
                var wishList = _context.wishlist.FirstOrDefault(wl => wl.Id == id);
                if (wishList == null)
                {
                    throw new WishListException($"Wishlist item with Id: {id} does not exist.");
                }

                _context.Remove(wishList);
                _context.SaveChanges();

                return wishList;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
