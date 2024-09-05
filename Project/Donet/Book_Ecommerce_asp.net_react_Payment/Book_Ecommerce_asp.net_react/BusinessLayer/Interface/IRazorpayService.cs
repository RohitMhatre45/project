using Model;
using RespositoryLayer.Entity;

namespace BusinessLayer.Interface

{


    public interface IRazorpayService
    {
        Task<string> CreateOrder(int amount);
        Task<bool> VerifyPayment(string paymentId, string orderId, string signature);
    }

}
