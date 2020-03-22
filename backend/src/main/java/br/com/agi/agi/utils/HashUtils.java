package br.com.agi.agi.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class HashUtils {

	/**
	 * Indicates that the hash is a bcrypt hash.
	 * @link https://en.wikipedia.org/wiki/Bcrypt#Description
	 */
	private static final String HASH_IN_MODULAR_CRYPT_FORMAT = "$2a$";

	/**
	 * Number of hashes rounds performed by Bcrypt algorithm.
	 */
	private static final int BCRYPT_ROUNDS = 12;

	/**
	 * Generate hash for a password with bcrypt algorithm.
	 * 
	 * @param rawPassword Password to be encoded.
	 * @return String of size 60 with the password encoded in the crypt format 3.
	 */
	public static String hashPassword(String rawPassword) {
		String salt = BCrypt.gensalt(BCRYPT_ROUNDS);
		return BCrypt.hashpw(rawPassword, salt);
	}

	/**
	 * Checks if the raw password matches the encoded password.
	 * @param rawPassword Password sent via request
	 * @param encodedPassword Encoded password
	 *
	 * @return boolean if the passwords matches.
	 */
	public static boolean checkPassword(String rawPassword, String encodedPassword) {
		if (null == encodedPassword || !encodedPassword.startsWith(HASH_IN_MODULAR_CRYPT_FORMAT))
			throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");

		return BCrypt.checkpw(rawPassword, encodedPassword);
	}

}
