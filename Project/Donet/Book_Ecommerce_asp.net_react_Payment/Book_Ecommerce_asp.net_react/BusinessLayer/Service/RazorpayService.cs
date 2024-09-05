using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Model;
using Razorpay.Api;
using RespositoryLayer.ContextDB;
using RespositoryLayer.CustomException;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

/*public class OrderRL : IOrderRL
{
    private readonly BookEcommerceContext _context;
    private readonly IConfiguration _configuration;
    private readonly string _keyId;
    private readonly string _keySecret;

    public OrderRL(BookEcommerceContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
        _keyId = _configuration["Razorpay:KeyId"];
        _keySecret = _configuration["Razorpay:KeySecret"];
    }

    public async Task<string> PlacedOrder(OrderDTO model, int userId)
    {
        var cartList = await _context.cart
            .Where(c => c.UserId == userId)
            .Include(c => c.Product)
            .ToListAsync();

        if (!cartList.Any())
        {
            throw new OrderException("No items inside cart");
        }

        var newOrders = new List<OrderEntity>();
        var updatedProducts = new List<ProductEntity>();
        var updatedCarts = new List<CartEntity>();

        foreach (var cart in cartList)
        {
            var newOrder = new OrderEntity
            {
                UserId = userId,
                ShippingAddressId = model.ShippingAddressId,
                CartId = cart.CartId,
                ProductId = cart.ProductId,
                Quantity = cart.Quantity,
                TotalPrice = cart.Quantity * cart.Product.DiscountPrice
            };

            newOrders.Add(newOrder);

            var existingProduct = cart.Product;
            existingProduct.StockQuantity -= cart.Quantity;
            updatedProducts.Add(existingProduct);

            updatedCarts.Add(cart);
        }

        await _context.order.AddRangeAsync(newOrders);
        _context.products.UpdateRange(updatedProducts);
        _context.cart.UpdateRange(updatedCarts);

        await _context.SaveChangesAsync();

        return $"User Id : {userId} your order has been placed successfully";
    }

    public async Task<List<OrderEntity>> GetAllPlacedOrderByUserId(int userId)
    {
        var orderList = await _context.order
                                      .Include(o => o.User)
                                      .Include(o => o.ShippingAddress)
                                      .Include(o => o.Cart)
                                      .ThenInclude(c => c.Product)
                                      .Where(o => o.UserId == userId)
                                      .ToListAsync();

        if (!orderList.Any())
        {
            throw new OrderException("No order placed yet!");
        }

        return orderList;
    }

    public async Task<string> CreateOrder(int amount)
    {
        try
        {
            var client = new RazorpayClient(_keyId, _keySecret);

            var orderOptions = new Dictionary<string, object>
            {
                { "amount", amount * 100 }, // Amount in paise
                { "currency", "INR" },
                { "receipt", "order_rcptid_11" },
                { "payment_capture", 1 } // Auto capture
            };

            var order = client.Order.Create(orderOptions);
            return order["id"].ToString();
        }
        catch (Exception ex)
        {
            throw new Exception("Failed to create order", ex);
        }
    }

    public async Task<bool> VerifyPayment(string paymentId, string orderId, string signature)
    {
        try
        {
            var attributes = new Dictionary<string, string>
            {
                { "order_id", orderId },
                { "payment_id", paymentId },
                { "signature", signature }
            };

            var client = new RazorpayClient(_keyId, _keySecret);
            var isValid = client.Payment.VerifySignature(attributes);
            return isValid;
        }
        catch (Exception ex)
        {
            throw new Exception("Payment verification failed", ex);
        }
    }
}*/
