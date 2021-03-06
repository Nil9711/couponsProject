package com.nil.coupons.utils;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class InputChecker {

	public static boolean isEmailValid(String emailToCheck) {

		Matcher matcher = VALID_EMAIL_ADDRESS_REGEX.matcher(emailToCheck);

		if (matcher.find()) {
			return true;
		}

		return false;
	}

	private static final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern
			.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);

}
