using Model;
using RespositoryLayer.Entity;
using System.Collections.Generic;

namespace RespositoryLayer.Interface
{
    public interface ICartRL
    {
        CartEntity CreateCart(CartDTO cart);
        List<CartEntity> GetAllCarts();
        CartEntity GetCartById(int id);
        CartEntity UpdateCart(int id, CartDTO cart);
        CartEntity DeleteCart(int id);
    }
}
