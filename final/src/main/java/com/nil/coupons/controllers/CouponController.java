package com.nil.coupons.controllers;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.nil.coupons.dao.ICompanyDao;
import com.nil.coupons.dao.ICouponDao;
import com.nil.coupons.dao.IPurchaseDao;
import com.nil.coupons.entities.Company;
import com.nil.coupons.entities.Coupon;
import com.nil.coupons.enums.Category;
import com.nil.coupons.enums.ErrorType;
import com.nil.coupons.exceptions.ApplicationException;

@Controller
public class CouponController {

	@Autowired
	private ICouponDao couponDao;
	@Autowired
	private IPurchaseDao purchaseDao;
	@Autowired
	private ICompanyDao companyDao;

	public long addCoupon(Coupon coupon) throws ApplicationException {
		validateCouponInsert(coupon);
		couponDao.save(coupon);
		return coupon.getCouponId();
	}

	public void updateCoupon(Coupon coupon) throws ApplicationException {
		validateCouponUpdate(coupon);
		couponDao.save(coupon);
	}

	public Coupon getOneCoupon(long couponId) throws ApplicationException {
		Optional<Coupon> optionalCouponEntity = couponDao.findById(couponId);

		Coupon couponEntity = optionalCouponEntity.get();

		return couponEntity;
	}

	@Transactional
	public void deleteCoupon(long couponId) throws ApplicationException {
		purchaseDao.deletePurchasesByCouponId(couponId);
		couponDao.deleteById(couponId);
	}

	public List<Coupon> getAllCoupons() throws ApplicationException {
		return (List<Coupon>) couponDao.findAll();
	}

	public List<Coupon> getAllCouponsByPrice(Double maxPrice) throws ApplicationException {
		return couponDao.getAllCouponsByPrice(maxPrice);
	}

	public List<Coupon> getAllCouponsByCategory(Category category) throws ApplicationException {
		return couponDao.getAllCouponsByCategory(category);
	}

	public List<Coupon> getAllCouponsByCompany(long companyId) throws ApplicationException {
		return couponDao.getAllCouponsByCompany(companyId);
	}

	public List<Coupon> getAllCouponsByCustomer(long customerId) throws ApplicationException {
		return couponDao.getAllCouponsByCustomer(customerId);
	}

	private void validateCouponInsert(Coupon coupon) throws ApplicationException {

		validateCompanyExists(coupon.getCompany());

		validateCouponTitle(coupon.getCouponTitle());

		validateCouponDescription(coupon.getCouponDescription());

		validateCouponAmount(coupon.getAmount());

		validateCouponPrice(coupon.getPrice());

		validateCouponDate(coupon.getStartDate(), coupon.getEndDate());

	}

	private void validateCouponUpdate(Coupon coupon) throws ApplicationException {

		if (!couponDao.existsById(coupon.getCouponId())) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Coupon was not found while trying to update it");
		}

		validateCompanyExists(coupon.getCompany());

		validateCouponTitle(coupon.getCouponTitle());

		validateCouponDescription(coupon.getCouponDescription());

		validateCouponAmount(coupon.getAmount());

		validateCouponPrice(coupon.getPrice());

		validateCouponDate(coupon.getStartDate(), coupon.getEndDate());

		validateCouponCompanyIdUnchanged(coupon);

	}

	private void validateCouponTitle(String title) throws ApplicationException {
		if (title.length() < 5) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "coupon is title is too short.");
		}
		if (couponDao.findByCouponTitle(title) != null) {
			throw new ApplicationException(ErrorType.DUPLICATE_ENTRY, "Coupon Title is Taken in this company.");
		}
	}

	private void validateCouponDescription(String description) throws ApplicationException {
		if (description.length() < 5) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "coupon is description is too short.");
		}
	}

	private void validateCompanyExists(Company company) throws ApplicationException {

		if (company == null) {
			throw new ApplicationException(ErrorType.INSERTION_ERROR,
					"Failed to find company while adding a coupon to it.");
		}
		if (!companyDao.existsById(company.getCompanyId())) {
			throw new ApplicationException(ErrorType.INSERTION_ERROR,
					"Failed to find company while adding a coupon to it.");
		}
	}

	private void validateCouponAmount(int amount) throws ApplicationException {
		if (amount < 0) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "coupon amount cant be less than 0.");
		}
	}

	private void validateCouponPrice(Double price) throws ApplicationException {
		if (price <= 0) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "coupon price cant be 0 or under.");
		}
	}

	private void validateCouponDate(Date startDate, Date endDate) throws ApplicationException {

		Date currentDate = new Date();

		if (endDate.after(startDate) && endDate.after(currentDate)) {
			return;
		}

		throw new ApplicationException(ErrorType.INVALID_INPUT, "invalid coupon date");

	}

	private void validateCouponCompanyIdUnchanged(Coupon coupon) throws ApplicationException {
		Optional<Company> optionalCompanyEntity = companyDao.findById(coupon.getCompany().getCompanyId());

		Company companyEntity = optionalCompanyEntity.get();

		if (companyEntity.getCompanyId() != coupon.getCompany().getCompanyId()) {
			throw new ApplicationException(ErrorType.GENERAL_ERROR, "Cant update coupon's company ID");
		}
	}
}