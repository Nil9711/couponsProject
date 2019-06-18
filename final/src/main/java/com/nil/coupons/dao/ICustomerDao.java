package com.nil.coupons.dao;

import org.springframework.data.repository.CrudRepository;

import com.nil.coupons.entities.Customer;

public interface ICustomerDao extends CrudRepository<Customer, Long> {

}
