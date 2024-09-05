using Model;
using RepositoryLayer.Entity;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interface
{
    public interface IWishListBL
    {

        WishListEntity CreateWishList(WishListDTO model);
        List<WishListEntity> GetAllWishLists();
        WishListEntity GetWishListById(int id);
        WishListEntity UpdateWishList(int id, WishListDTO model);
        WishListEntity DeleteWishList(int id);

    }
}
