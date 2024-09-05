using Microsoft.EntityFrameworkCore;
using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;

using System.Security.Cryptography;



namespace RespositoryLayer.Service
{


    public class OrderRL : IOrderRL
    {
        private readonly BookEcommerceContext _context;

        public OrderRL(BookEcommerceContext context)
        {
            _context = context;
        }

        public async Task<OrderEntity> PlaceOrder(OrderDTO orderDTO)
        {
            var order = new OrderEntity
            {
                UserId = orderDTO.UserId,
                ShippingAddressId = orderDTO.ShippingAddressId,
                CartId = orderDTO.CartId,
                ProductId = orderDTO.ProductId,
                Quantity = orderDTO.Quantity,
                TotalPrice = orderDTO.TotalPrice,
            };

            await _context.order.AddAsync(order);
            await _context.SaveChangesAsync();
            return order;
        }

        public async Task<List<OrderEntity>> GetOrdersByUserId(int userId)
        {
            return await _context.order
                .Where(o => o.UserId == userId)
                .Include(o => o.Product)
                .Include(o => o.ShippingAddress)
                .Include(o => o.Cart)
                .ToListAsync();
        }

        public async Task<OrderEntity> GetOrderById(int orderId)
        {
            return await _context.order
                .Include(o => o.Product)
                .Include(o => o.ShippingAddress)
                .Include(o => o.Cart)
                .FirstOrDefaultAsync(o => o.OrderId == orderId);
        }
    }



}
