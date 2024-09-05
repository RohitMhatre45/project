package ecommerce.models;

import org.springframework.beans.BeanUtils;

import ecommerce.entities.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponseDTO {
	
	private String author;
	// private String brand;
	
	private int prodid;
	
	private String pname;
	
	private String pcat;
	
	private String subcat;
	
	private int price;
	
	private int sellerId;
	
	private String sellerName;
	
	private String photo;
	
	public static ProductResponseDTO fromEntity(Product entity) {
		ProductResponseDTO dto = new ProductResponseDTO();
		dto.setSellerId(entity.getSeller().getId());
		dto.setSellerName(entity.getSeller().getName());
		BeanUtils.copyProperties(entity, dto);
		
		return dto;
	}
}
