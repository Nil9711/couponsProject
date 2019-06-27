package com.nil.coupons.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.nil.coupons.beans.UserData;
import com.nil.coupons.logic.ICacheManager;

@Component
@WebFilter("/*")
public class LoginFilter implements Filter {

	@Autowired
	private ICacheManager cacheManager;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = ((HttpServletRequest) request);
		String path = req.getRequestURI();

		if (path.startsWith("/users/login")) {

			chain.doFilter(request, response); // Just continue chain.
			return;

		}

		if (path.startsWith("/customers") && req.getMethod().equalsIgnoreCase("post")) {

			chain.doFilter(request, response); // Just continue chain.
			return;

		}

		Integer token = Integer.parseInt(req.getParameter("token"));

		UserData userData = (UserData) cacheManager.get(token);

		if (userData != null) {

			request.setAttribute("userData", userData);
			chain.doFilter(request, response);
			return;

		}

		HttpServletResponse res = (HttpServletResponse) response;
		res.setStatus(401);

	}

	@Override
	public void destroy() {

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}

}