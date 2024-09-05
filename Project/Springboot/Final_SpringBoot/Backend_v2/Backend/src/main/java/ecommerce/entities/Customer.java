package ecommerce.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "customers_table")
public class Customer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@ApiModelProperty(notes = "Database generated Customer Id")
	@Column(name = "customer_id")
	@JsonProperty("id")
	private int id;
	
	@ApiModelProperty(notes = "Name of the customer")
	@Column(name = "customer_name")
	@JsonProperty("name")
	private String name;
	
	private String city;
	
	@Column(name = "customer_emailID")
	@JsonProperty("userid")
	private String userid;
	
	@Column(name = "customer_password")
	@JsonProperty("pwd")
	private String pwd;
	
	@Column(name = "customer_phoneNo")
	@JsonProperty("phone")
	private String phone;
	
	private String gender;
	
	@Column(name = "created_timestamp", updatable = false)
	private LocalDate createdTimestamp = LocalDate.now();

}
