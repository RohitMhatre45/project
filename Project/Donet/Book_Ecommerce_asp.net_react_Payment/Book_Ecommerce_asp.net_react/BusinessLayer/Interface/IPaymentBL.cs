using Model;
using RespositoryLayer.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BusinessLayer.Interface
{
    public interface IPaymentBL
    {
        Task<PaymentEntity> SavePaymentDetails(PaymentDTO paymentDTO);
        Task<bool> VerifyPayment(string paymentId, string orderId, string signature);
    }
}
