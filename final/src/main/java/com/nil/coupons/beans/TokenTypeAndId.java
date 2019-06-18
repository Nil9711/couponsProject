package com.nil.coupons.beans;

import com.nil.coupons.enums.ClientType;

public class TokenTypeAndId {

	private int token;
	private ClientType type;
	private long userId;
	private Long companyId;

	public int getToken() {
		return token;
	}

	public void setToken(int token) {
		this.token = token;
	}

	public ClientType getType() {
		return type;
	}

	public void setType(ClientType type) {
		this.type = type;
	}

	public TokenTypeAndId(int token, ClientType type, long userId, Long companyId) {
		this.token = token;
		this.type = type;
		this.userId = userId;
		this.companyId = companyId;
	}

	public TokenTypeAndId() {
		super();
	}




	public Long getCompanyId() {
		return companyId;
	}

	public void setCompanyId(Long companyId) {
		this.companyId = companyId;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}
}
