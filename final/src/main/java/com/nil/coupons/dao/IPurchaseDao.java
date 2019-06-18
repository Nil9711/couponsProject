package com.nil.coupons.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.nil.coupons.entities.Purchase;

public interface IPurchaseDao extends CrudRepository<Purchase, Long> {

	@Modifying
	@Query(value = "DELETE FROM purchases WHERE coupon_coupon_id = :couponId", nativeQuery = true)
	public void deletePurchasesByCouponId(@Param("couponId") long couponId);

	@Modifying
	@Query(value = "DELETE FROM purchases WHERE coupon_coupon_id IN ( SELECT coupon_id FROM coupons WHERE company_company_id = :companyId)", nativeQuery = true)
	public void deletePurchasesByCompanyId(@Param("companyId") long companyId);

	@Query(value = "SELECT * FROM purchases WHERE customer_user_user_id = :customerId", nativeQuery = true)
	public List<Purchase> getPurchasesByCustomerId(@Param("customerId") long customerId);

	@Query(value = "SELECT * FROM purchases WHERE customer_user_user_id = :customerId AND coupon_coupon_id = :couponId", nativeQuery = true)
	public List<Purchase> getPurchasesByCustomerIdAndCouponId(@Param("customerId") long customerId,
			@Param("couponId") long couponId);

}
