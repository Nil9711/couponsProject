
package com.nil.coupons.exceptions;

import com.nil.coupons.beans.ErrorBean;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsHandler implements ExceptionMapper<Throwable> {

	@ExceptionHandler
	public Response toResponse(Throwable exception) {
		exception.printStackTrace();
		if (exception instanceof ApplicationException) {
			ApplicationException e = (ApplicationException) exception;
			int internalErrorCode = e.getErrorType().getInternalErrorCode();
			String internalMessage = e.getMessage();
			String externalMessage = "Error";
			ErrorBean errorBean = new ErrorBean(internalErrorCode, internalMessage, externalMessage);
			return Response.status(internalErrorCode).entity(errorBean).build();
		} else if (exception instanceof Exception) {
			String internalMessage = exception.getMessage();
			ErrorBean errorBean = new ErrorBean(601, internalMessage, "General error");
			return Response.status(601).entity(errorBean).build();
		}
		return Response.status(500).entity(null).build();
	}
}