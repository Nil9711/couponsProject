package com.nil.coupons.dao;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import com.nil.coupons.entities.User;

public interface IUserDao extends CrudRepository<User, Long> {

	@Query(value = "DELETE FROM users WHERE company_id = :companyId", nativeQuery = true)
	public void deleteUsersByCompanyId(@Param("companyId") long companyId);

	public User findByUserName(String userName);

	public User findByUserNameAndUserPassword(String userName, String userPassword);

}
