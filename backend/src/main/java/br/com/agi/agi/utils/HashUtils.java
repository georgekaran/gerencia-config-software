package br.com.agi.agi.utils;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class HashUtils {

	/**
	 * Workload ao gerar hash de password como bcrypt
	 * 
	 */
	private static int workload = 12;

	/**
	 * Gera o hash de um password, utilizando o algoritmo bcrypt
	 * 
	 * @param password_plaintext A senha a ser criptografada
	 * @return String de tamanho 60 com a senha criptograda no formato crypt(3)
	 */
	public static String hashPassword(String password_plaintext) {
		String salt = BCrypt.gensalt(workload);
		return BCrypt.hashpw(password_plaintext, salt);
	}

	/**
	 * Compara uma senha com um valor criptografado
	 * 
	 * @param senhaEnviada A senha recebida na requisição
	 * @param senhaSalva   A senha criptografada salva
	 * @return boolean - verdadeiro se a senhas combinam
	 */
	public static boolean checkPassword(String senhaEnviada, String senhaSalva) {
		if (null == senhaSalva || !senhaSalva.startsWith("$2a$"))
			throw new java.lang.IllegalArgumentException("Invalid hash provided for comparison");

		return BCrypt.checkpw(senhaEnviada, senhaSalva);
	}

}
