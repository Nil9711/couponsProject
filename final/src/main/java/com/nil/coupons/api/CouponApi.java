package com.nil.coupons.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nil.coupons.controllers.CouponController;
import com.nil.coupons.entities.Coupon;
import com.nil.coupons.enums.Category;
import com.nil.coupons.exceptions.ApplicationException;

@RestController
@RequestMapping("/coupons")
public class CouponApi {

	@Autowired
	private CouponController couponController;

	@PostMapping
	public long addCoupon(@RequestBody Coupon coupon) throws ApplicationException {
		return couponController.addCoupon(coupon);
	}

	@PutMapping
	public void updateCoupon(@RequestBody Coupon coupon) throws ApplicationException {
		couponController.updateCoupon(coupon);
	}

	@GetMapping("/{couponId}")
	public Coupon getOneCoupon(@PathVariable("couponId") long couponId) throws ApplicationException {
		return couponController.getOneCoupon(couponId);
	}

	@DeleteMapping("/{couponId}")
	public void deleteCoupon(@PathVariable("couponId") long couponId) throws ApplicationException {
		couponController.deleteCoupon(couponId);
	}

	@GetMapping
	public List<Coupon> getAllCoupons() throws ApplicationException {
		return couponController.getAllCoupons();
	}

	@GetMapping("/ByMaxPrice")
	public List<Coupon> getAllCouponsByMaxPrice(@RequestParam("maxPrice") Double maxPrice) throws ApplicationException {
		return couponController.getAllCouponsByPrice(maxPrice);
	}

	@GetMapping("/ByCategory")
	public List<Coupon> getAllCouponsByCategory(@RequestParam("category") String category) throws ApplicationException {
		return couponController.getAllCouponsByCategory(Category.valueOf(category));
	}

	@GetMapping("/ByCompanyId")
	public List<Coupon> getAllCouponsByCompany(@RequestParam("companyId") long companyId) throws ApplicationException {
		return couponController.getAllCouponsByCompany(companyId);
	}

	@GetMapping("/ByCustomerId")
	public List<Coupon> getAllCouponsByCustomer(@RequestParam("customerId") long customerId)
			throws ApplicationException {
		return couponController.getAllCouponsByCustomer(customerId);
	}

}
