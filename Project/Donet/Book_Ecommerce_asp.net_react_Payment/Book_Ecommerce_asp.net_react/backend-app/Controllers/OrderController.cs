using System.Collections.Generic;
using System.Threading.Tasks;
using BusinessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Model;
using RespositoryLayer.Entity;

[Route("api/[controller]")]
[ApiController]
public class OrderController : ControllerBase
{
    private readonly IOrderBL _orderBL;
    private readonly IPaymentBL _paymentBL;

    public OrderController(IOrderBL orderBL, IPaymentBL paymentBL)
    {
        _orderBL = orderBL;
        _paymentBL = paymentBL;
    }

    [HttpPost("PlaceOrder")]
    public async Task<ActionResult<OrderEntity>> PlaceOrder([FromBody] OrderDTO orderDTO)
    {
        var order = await _orderBL.PlaceOrder(orderDTO);
        return Ok(order);
    }

    [HttpGet("GetOrdersByUser/{userId}")]
    public async Task<ActionResult<List<OrderEntity>>> GetOrdersByUserId(int userId)
    {
        var orders = await _orderBL.GetOrdersByUserId(userId);
        return Ok(orders);
    }

    [HttpPost("VerifyPayment")]
    public async Task<ActionResult<bool>> VerifyPayment([FromBody] PaymentDTO paymentDTO)
    {
        var isValid = await _paymentBL.VerifyPayment(paymentDTO.RazorpayPaymentId, paymentDTO.RazorpayOrderId, paymentDTO.RazorpaySignature);
        if (isValid)
        {
            await _paymentBL.SavePaymentDetails(paymentDTO);
            return Ok(true);
        }
        return BadRequest(false);
    }
}
