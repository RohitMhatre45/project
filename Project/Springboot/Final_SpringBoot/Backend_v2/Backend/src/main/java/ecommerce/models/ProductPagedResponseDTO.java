package ecommerce.models;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductPagedResponseDTO {
	
	private List<ProductResponseDTO> plist;
	
	private int current;
	
	private long total;
	
	private int pagesize;

}
