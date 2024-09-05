package ecommerce.models;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartDTO {

	private int prodid;
	
	private String pcat;
	
	private String pname;
	
	private int price;
	
	private int qty;	
	
}
