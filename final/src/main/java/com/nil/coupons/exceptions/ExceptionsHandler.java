
package com.nil.coupons.exceptions;

import com.nil.coupons.beans.ErrorBean;
import com.nil.coupons.enums.ErrorType;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsHandler {

	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ErrorBean> handleError(ApplicationException e) {
		ErrorBean errorBean = new ErrorBean(500, e.getErrorType(), e.getMessage());

		if (e instanceof ApplicationException) {

			return new ResponseEntity<ErrorBean>(errorBean, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<ErrorBean>(errorBean, HttpStatus.INTERNAL_SERVER_ERROR);

	}

	@ExceptionHandler(Throwable.class)
	public ResponseEntity<ErrorBean> handleError(Throwable e) {

		e.printStackTrace();

		ErrorBean errorBean = new ErrorBean(600, ErrorType.INTERNAL_SERVER_ERROR,
				ErrorType.INTERNAL_SERVER_ERROR.getInternalMessage());

		return new ResponseEntity<ErrorBean>(errorBean, HttpStatus.INTERNAL_SERVER_ERROR);

	}

}