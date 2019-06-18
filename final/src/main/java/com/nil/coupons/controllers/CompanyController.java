package com.nil.coupons.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.nil.coupons.dao.ICompanyDao;
import com.nil.coupons.dao.ICouponDao;
import com.nil.coupons.dao.IPurchaseDao;
import com.nil.coupons.dao.IUserDao;
import com.nil.coupons.entities.Company;
import com.nil.coupons.entities.Coupon;
import com.nil.coupons.enums.ErrorType;
import com.nil.coupons.exceptions.ApplicationException;
import com.nil.coupons.utils.InputChecker;

@Controller
public class CompanyController {

	@Autowired
	private ICompanyDao companyDao;

	public long addCompany(Company company) throws ApplicationException {
		validateCouponInsert(company);
		companyDao.save(company);
		return company.getCompanyId();
	}

	public void updateCompany(Company company) throws ApplicationException {
		validateCouponUpdate(company);
		companyDao.save(company);

	}

	public Company getOneCompany(long companyId) throws ApplicationException {
		Optional<Company> optionalCompanyEntity = companyDao.findById(companyId);

		Company companyEntity = optionalCompanyEntity.get();

		return companyEntity;
	}

	public List<Company> getAllCompanies() throws ApplicationException {
		return (List<Company>) companyDao.findAll();
	}

	@Transactional
	public void deleteCompany(long companyId) throws ApplicationException {
		companyDao.deleteById(companyId);
	}

	private void validateCouponInsert(Company company) throws ApplicationException {
		Company companyToCheckOn = new Company();

		if (company.getCompanyName() == null) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company name cant be null");
		}
		if (company.getCompanyName().length() < 2) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company name is too short");
		}

		companyToCheckOn = companyDao.findByCompanyEmail(company.getCompanyEmail());
		if (companyToCheckOn != null) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company email is Taken");
		}

		companyToCheckOn = companyDao.findByCompanyName(company.getCompanyName());
		if (companyToCheckOn != null) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company name is Taken");
		}

		if (!InputChecker.isEmailValid(company.getCompanyEmail())) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company Email invalid");
		}

	}

	private void validateCouponUpdate(Company company) throws ApplicationException {

		if (company.getCompanyName() == null || company.getCompanyName().length() < 3) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company name needs to be at least 3 characters");
		}

		if (!InputChecker.isEmailValid(company.getCompanyEmail())) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Company Email invalid");
		}

	}

}
