package ecommerce.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AccessLevel;
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
@Entity
@Table(name="products_table")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	@JsonProperty("prodid")
	private int prodid;
	
	@Column(name = "product_name")
	@JsonProperty("pname")
	private String pname;
	
	@Column(name = "product_author")
	// @JsonProperty("brand")
	// private String brand;
	@JsonProperty("author")
	private String author;
	
	@Column(name = "product_category")
	@JsonProperty("pcat")
	private String pcat;
	
	@Column(name = "product_subcategory")
	@JsonProperty("subcat")
	private String subcat;
	
	@Column(name = "product_price")
	@JsonProperty("price")
	private int price;
	
	@Column(name = "product_photo")
	@JsonProperty("photo")
	private String photo;
	
	@Setter(AccessLevel.NONE)
	@Column(name = "created_timestamp", updatable = false)
	private LocalDate createdTimestamp = LocalDate.now();
	
	@ManyToOne
	@JoinColumn(name="seller_id")
	private Seller seller;
		
}
