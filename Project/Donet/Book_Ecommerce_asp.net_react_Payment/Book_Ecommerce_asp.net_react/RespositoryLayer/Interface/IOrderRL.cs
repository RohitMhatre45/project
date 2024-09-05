using System.Collections.Generic;
using System.Threading.Tasks;
using Model;
using RespositoryLayer.Entity;

namespace RespositoryLayer.Interface
{
    public interface IOrderRL
    {
        Task<OrderEntity> PlaceOrder(OrderDTO orderDTO);
        Task<List<OrderEntity>> GetOrdersByUserId(int userId);
        Task<OrderEntity> GetOrderById(int orderId);
    }
}
