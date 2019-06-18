package com.nil.coupons.filters;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class CORSFilter implements Filter {

	public CORSFilter() {
	}

	public void destroy() {
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) servletRequest;
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Credentials", "true");
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods",
				"GET, OPTIONS, HEAD, PUT, POST, DELETE");
		((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers",
				"Origin, Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");

		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Credentials", "true");
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Methods",
				"POST, PUT, GET, HEAD, OPTIONS, DELETE");
		((HttpServletResponse) servletResponse).setHeader("Access-Control-Allow-Headers",
				"Origin, Accept, x-auth-token, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
		HttpServletResponse resp = (HttpServletResponse) servletResponse;

		if (request.getMethod().equals("OPTIONS")) {
			resp.setStatus(HttpServletResponse.SC_ACCEPTED);
			return;
		}

		chain.doFilter(request, servletResponse);

	}

	public void init(FilterConfig fConfig) throws ServletException {
	}

}
