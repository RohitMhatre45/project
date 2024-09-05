using System.Collections.Generic;
using System.Threading.Tasks;
using Model;
using RespositoryLayer.Entity;

namespace BusinessLayer.Interface
{
    public interface IOrderBL
    {
       
        
        Task<OrderEntity> PlaceOrder(OrderDTO orderDTO);
        Task<List<OrderEntity>> GetOrdersByUserId(int userId);
        Task<OrderEntity> GetOrderById(int orderId);
        // Ensure this signature;
    }
}

