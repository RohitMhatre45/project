using System.Threading.Tasks;
using BusinessLayer.Interface;
using Model;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;

namespace BusinessLayer.Service
{
    public class OrderBL : IOrderBL
    {
        private readonly IOrderRL _orderRL;

        public OrderBL(IOrderRL orderRL)
        {
            _orderRL = orderRL;
        }

        public async Task<OrderEntity> PlaceOrder(OrderDTO orderDTO)
        {
            return await _orderRL.PlaceOrder(orderDTO);
        }

        public async Task<List<OrderEntity>> GetOrdersByUserId(int userId)
        {
            return await _orderRL.GetOrdersByUserId(userId);
        }

        public async Task<OrderEntity> GetOrderById(int orderId)
        {
            return await _orderRL.GetOrderById(orderId);
        }
    }

}
