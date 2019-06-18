package com.nil.coupons.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nil.coupons.controllers.PurchaseController;
import com.nil.coupons.entities.Purchase;
import com.nil.coupons.exceptions.ApplicationException;

@RestController
@RequestMapping("/purchases")
public class PurchaseApi {

	@Autowired
	private PurchaseController purchaseController;

	@PostMapping
	public void addPurchase(@RequestBody Purchase purchase) throws ApplicationException {
		purchaseController.addPurchase(purchase);
	}

	@GetMapping("/{purchaseId}")
	public Purchase getPurchase(@PathVariable("purchaseId") long purchaseId) throws ApplicationException {
		return purchaseController.getOnePurchase(purchaseId);
	}

	@GetMapping
	public List<Purchase> getAllPurchases() throws ApplicationException {
		return purchaseController.getAllPurchases();
	}

	@GetMapping("/ByCustomerId")
	public List<Purchase> getPurchasesByCustomerId(@RequestParam("customerId") long customerId)
			throws ApplicationException {
		return purchaseController.getPurchasesByCustomerId(customerId);
	}

	@GetMapping("/ByCustomerIdAndCouponId")
	public List<Purchase> getPurchasesByCustomerIdAndCouponId(@RequestParam("customerId") long customerId,
			@RequestParam("couponId") long couponId) throws ApplicationException {
		return purchaseController.getPurchasesByCustomerIdAndCouponId(customerId, couponId);
	}

	@DeleteMapping("/{purchaseId}")
	public void deletePurchase(@PathVariable("purchaseId") long purchaseId) throws ApplicationException {
		purchaseController.deletePurchase(purchaseId);
	}
}
