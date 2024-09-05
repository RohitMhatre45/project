using Model;
using RespositoryLayer.ContextDB;
using RespositoryLayer.Entity;
using RespositoryLayer.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Service
{
    using BusinessLayer.Interface;
    using System.Threading.Tasks;

    public class PaymentBL : IPaymentBL
    {
        private readonly IPaymentRL _paymentRL;

        public PaymentBL(IPaymentRL paymentRL)
        {
            _paymentRL = paymentRL;
        }

        public async Task<PaymentEntity> SavePaymentDetails(PaymentDTO paymentDTO)
        {
            return await _paymentRL.SavePaymentDetails(paymentDTO);
        }

        public async Task<bool> VerifyPayment(string paymentId, string orderId, string signature)
        {
            return await _paymentRL.VerifyPayment(paymentId, orderId, signature);
        }
    }

}
