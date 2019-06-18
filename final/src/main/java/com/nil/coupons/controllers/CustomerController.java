package com.nil.coupons.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.nil.coupons.dao.ICustomerDao;
import com.nil.coupons.dao.IPurchaseDao;
import com.nil.coupons.dao.IUserDao;
import com.nil.coupons.entities.Customer;
import com.nil.coupons.enums.ErrorType;
import com.nil.coupons.exceptions.ApplicationException;

@Controller
public class CustomerController {

	@Autowired
	private ICustomerDao customerDao;

	public long addCustomer(Customer customer) throws ApplicationException {
		validateCustomer(customer);
		customerDao.save(customer);
		return customer.getCustomerId();
	}

	public Customer getOneCustomer(long customerId) throws ApplicationException {

		return customerDao.findById(customerId).get();
	}

	public List<Customer> getAllCustomers() throws ApplicationException {

		return (List<Customer>) customerDao.findAll();
	}

	public void updateCustomer(Customer customer) throws ApplicationException {
		validateCustomer(customer);
		customerDao.save(customer);
	}

	public void deleteCustomer(long customerId) throws ApplicationException {
		customerDao.deleteById(customerId);
	}

	private void validateCustomer(Customer customer) throws ApplicationException {
		if (customer.getCustomerFirstName().length() < 2) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "First Name too short");
		}
		if (customer.getCustomerLastName().length() < 2) {
			throw new ApplicationException(ErrorType.INVALID_INPUT, "Last Name too short");

		}
	}
}
