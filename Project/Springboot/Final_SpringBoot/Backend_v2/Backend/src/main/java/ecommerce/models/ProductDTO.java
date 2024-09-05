package ecommerce.models;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

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
public class ProductDTO {

	private int prodid;

	private String pname;

	private String pcat;

	private String subcat;

	private int price;

	private int sellerId;

	// private String brand;
	private String author;

	private MultipartFile pic;

	public static Product toEntity(ProductDTO dto) {
		Product entity = new Product();
		BeanUtils.copyProperties(dto, entity, "pic");
		return entity;
	}
}
