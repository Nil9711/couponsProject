package com.nil.coupons.logic;

public interface ICacheManager {

	void put(Object key, Object value);

	Object get(Object key);

}
