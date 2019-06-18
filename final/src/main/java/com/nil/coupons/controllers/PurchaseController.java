package com.nil.coupons.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.nil.coupons.dao.ICouponDao;
import com.nil.coupons.dao.IPurchaseDao;
import com.nil.coupons.entities.Coupon;
import com.nil.coupons.entities.Purchase;
import com.nil.coupons.enums.ErrorType;
import com.nil.coupons.exceptions.ApplicationException;

@Controller
public class PurchaseController {

	@Autowired
	private IPurchaseDao purchaseDao;
	@Autowired
	private ICouponDao couponDao;

	public long addPurchase(Purchase purchase) throws ApplicationException {
		addPurchaseLogic(purchase);
		purchaseDao.save(purchase);
		return purchase.getPurchaseId();
	}

	public Purchase getOnePurchase(long purchaseId) throws ApplicationException {

		return purchaseDao.findById(purchaseId).get();
	}

	public List<Purchase> getAllPurchases() throws ApplicationException {

		return (List<Purchase>) purchaseDao.findAll();
	}

	public List<Purchase> getPurchasesByCustomerId(long customerId) throws ApplicationException {

		return purchaseDao.getPurchasesByCustomerId(customerId);
	}

	public List<Purchase> getPurchasesByCustomerIdAndCouponId(long customerId, long couponId)
			throws ApplicationException {

		return purchaseDao.getPurchasesByCustomerIdAndCouponId(customerId, couponId);
	}

	public void deletePurchase(long purchaseToDelete) throws ApplicationException {
		purchaseDao.deleteById(purchaseToDelete);
	}

	private void addPurchaseLogic(Purchase purchase) throws ApplicationException {

		if (couponDao.findById(purchase.getCoupon().getCouponId()) == null) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Coupon was not found.");
		}

		if (purchase.getPurchaseAmount() < 1) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Purchase amount needs to be 1 or higher");
		}

		if (couponDao.findById(purchase.getCoupon().getCouponId()).get().getAmount()
				- purchase.getPurchaseAmount() < 0) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "not enough coupons in stock");
		}

		Coupon couponBought = couponDao.findById(purchase.getCoupon().getCouponId()).get();
		couponBought.setAmount(couponBought.getAmount() - purchase.getPurchaseAmount());
		couponDao.save(couponBought);

	}

}
