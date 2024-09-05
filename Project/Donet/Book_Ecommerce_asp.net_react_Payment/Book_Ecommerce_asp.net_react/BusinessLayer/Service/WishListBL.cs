using BusinessLayer.Interface;
using Model;
using RepositoryLayer.Entity;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using RespositoryLayer.Service;
using System;
using System.Collections.Generic;

namespace BusinessLayer.Service
{
    public class WishListBL : IWishListBL
    {
        private readonly IWishlistRL wishListRL;

        public WishListBL(IWishlistRL wishListRL)
        {
            this.wishListRL = wishListRL ?? throw new ArgumentNullException(nameof(wishListRL));
        }

        public WishListEntity CreateWishList(WishListDTO model)
        {
            try
            {
                return wishListRL.CreateWishList(model);
            }
            catch (WishListException)
            {
                throw;
            }
        }

        public List<WishListEntity> GetAllWishLists()
        {
            try
            {
                return wishListRL.GetAllWishList();
            }
            catch (WishListException)
            {
                throw;
            }
        }

        public WishListEntity GetWishListById(int id)
        {
            try
            {
                return wishListRL.GetWishListById(id);
            }
            catch (WishListException)
            {
                throw;
            }
        }

        public WishListEntity UpdateWishList(int id, WishListDTO model)
        {
            try
            {
                return wishListRL.UpdateWishList(id, model);
            }
            catch (WishListException)
            {
                throw;
            }
        }

        public WishListEntity DeleteWishList(int id)
        {
            try
            {
                return wishListRL.DeleteWishList(id);
            }
            catch (WishListException)
            {
                throw;
            }
        }
    }
}
