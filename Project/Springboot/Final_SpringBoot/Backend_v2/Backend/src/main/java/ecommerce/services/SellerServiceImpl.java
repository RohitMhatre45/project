package ecommerce.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ecommerce.daos.SellerDao;
import ecommerce.entities.Seller;

@Service
public class SellerServiceImpl implements SellerService {

	@Autowired private SellerDao dao;
	@Override
	public Seller registerSeller(Seller seller) {
		// TODO Auto-generated method stub
		Seller registerSeller = dao.findByUserid(seller.getUserid());
		if(registerSeller == null) {
			return dao.save(seller);
		}
		return null;
	}

	@Override
	public List<Seller> allSellers() {
		// TODO Auto-generated method stub
		return dao.findAll();
	}

	@Override
	public Seller findById(int id) {
		// TODO Auto-generated method stub
		return dao.getById(id);
	}

	@Override
	public Seller validate(String userid, String pwd) {
		Seller seller=dao.findByUserid(userid);
		if(seller!=null && seller.getPwd().equals(pwd)) {
			return seller;
		}
		return null;
	}

	@Override
	public void deleteSeller(int id) {
		// TODO Auto-generated method stub
		Seller seller=dao.getById(id);
		dao.delete(seller);
	}
	
	@Override
	public Seller updateSellerProfile(int id, Seller updatedSeller) {
	    Seller existingSeller = dao.getById(id);

	    if (existingSeller != null) {
	        // You may want to add validation or business logic here before updating
	        existingSeller.setName(updatedSeller.getName());
	        existingSeller.setCity(updatedSeller.getCity());
	        existingSeller.setUserid(updatedSeller.getUserid());
	        existingSeller.setPwd(updatedSeller.getPwd());
	        existingSeller.setPhone(updatedSeller.getPhone());
	        // Add other fields as needed

	        return dao.save(existingSeller);
	    }

	    return null;
	}
}
