package com.nil.coupons.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;

import com.nil.coupons.beans.TokenTypeAndId;
import com.nil.coupons.beans.UserData;
import com.nil.coupons.dao.ICustomerDao;
import com.nil.coupons.dao.IUserDao;
import com.nil.coupons.entities.User;
import com.nil.coupons.enums.ErrorType;
import com.nil.coupons.exceptions.ApplicationException;
import com.nil.coupons.logic.ICacheManager;

@Controller
public class UserController {

	@Autowired
	private IUserDao userDao;
	@Autowired
	private ICustomerDao customerDao;

	@Autowired
	private ICacheManager cacheManager;

	public User getOneUser(long userId) {
		return userDao.findById(userId).get();
	}

	public long createUser(User user) throws ApplicationException {
		validateUserInsert(user);
		userDao.save(user);
		return user.getUserId();
	}

	public void updateUser(User user) {
		userDao.save(user);
	}

	@Transactional
	public void deleteUser(long userId) {
		if (customerDao.findById(userId).get() != null) {
			customerDao.deleteById(userId);
			return;
		}
		userDao.deleteById(userId);
	}

	public List<User> getAllUsers() {
		return (List<User>) userDao.findAll();
	}

	public TokenTypeAndId login(User user) throws ApplicationException {

		TokenTypeAndId tokenTypeAndId = new TokenTypeAndId();
		UserData userData = new UserData();
		User userLoggingIn = userDao.findByUserNameAndUserPassword(user.getUserName(), user.getUserPassword());

		if (userLoggingIn == null) {
			throw new ApplicationException(ErrorType.LOGIN_FAILED, "Failed To Log In");
		}

		User userLoginOk = userDao.findByUserName(user.getUserName());

		int token = generateEncryptedToken(userLoginOk.getUserName());

		if (userLoginOk.getCompany() != null) {
			userData = new UserData(userLoginOk.getUserId(), userLoginOk.getCompany().getCompanyId(),
					userLoginOk.getUserType());
			tokenTypeAndId = new TokenTypeAndId(token, userLoginOk.getUserType(), userLoginOk.getUserId(),
					userLoginOk.getCompany().getCompanyId());
		}
		userData = new UserData(userLoginOk.getUserId(), null, userLoginOk.getUserType());
		tokenTypeAndId = new TokenTypeAndId(token, userLoginOk.getUserType(), userLoginOk.getUserId(), null);

		cacheManager.put(token, userData);

		return tokenTypeAndId;

	}

	private int generateEncryptedToken(String user) {
		String token = "Salt - junk data" + user + "Sheker kolshehu";
		return token.hashCode();
	}

	private void validateUserInsert(User user) throws ApplicationException {
		User userCheck = userDao.findByUserName(user.getUserName());

		if (userCheck != null) {
			throw new ApplicationException(ErrorType.INSERTION_ERROR, "User Name is taken.");
		}
	}

}
