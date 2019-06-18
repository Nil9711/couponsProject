package com.nil.coupons.dao;

import org.springframework.data.repository.CrudRepository;

import com.nil.coupons.entities.Company;

public interface ICompanyDao extends CrudRepository<Company, Long> {

	public Company findByCompanyEmail(String companyEmail);

	public Company findByCompanyName(String companyName);

}
