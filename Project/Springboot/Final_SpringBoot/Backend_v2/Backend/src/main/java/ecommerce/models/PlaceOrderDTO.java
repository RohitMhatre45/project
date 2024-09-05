package ecommerce.models;

import java.util.List;

import ecommerce.entities.Address;
import ecommerce.entities.Payment;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class PlaceOrderDTO {

	private Address address;
	
	private List<CartDTO> cart;
	
	private Payment payment;
	
	private int customerid;
			
}
