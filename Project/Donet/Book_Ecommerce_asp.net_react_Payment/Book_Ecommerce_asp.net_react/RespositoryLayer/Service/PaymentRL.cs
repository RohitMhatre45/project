using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.Entity;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System.Security.Cryptography;



namespace RespositoryLayer.Service
{
    

    public class PaymentRL : IPaymentRL
    {
        
        private readonly BookEcommerceContext _context;

        public PaymentRL(BookEcommerceContext context)
        {
            _context = context;
        }

        public async Task<PaymentEntity> SavePaymentDetails(PaymentDTO paymentDTO)
        {
            var payment = new PaymentEntity
            {
                OrderId = paymentDTO.OrderId,
                RazorpayPaymentId = paymentDTO.RazorpayPaymentId,
                RazorpayOrderId = paymentDTO.RazorpayOrderId,
                RazorpaySignature = paymentDTO.RazorpaySignature,
                PaymentStatus = paymentDTO.PaymentStatus,
                PaymentDate = DateTime.Now
            };

            await _context.Payments.AddAsync(payment);
            await _context.SaveChangesAsync();
            return payment;
        }

        public async Task<bool> VerifyPayment(string paymentId, string orderId, string signature)
        {
            var generatedSignature = GenerateSignature(paymentId, orderId);
            return signature == generatedSignature;
        }

        private string GenerateSignature(string paymentId, string orderId)
        {
            var secret = "R4Yvaud3JuqLcVnP5CUqXrJX"; // Replace with your Razorpay secret
            var data = $"{orderId}|{paymentId}";
            using (var hmac = new HMACSHA256(Encoding.UTF8.GetBytes(secret)))
            {
                var hash = hmac.ComputeHash(Encoding.UTF8.GetBytes(data));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
    }

}
