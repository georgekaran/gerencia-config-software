package br.com.agi.agi.utils;

import br.com.agi.agi.models.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

public class JWTUtils {

	/**
	 * Generate a JWT token
	 * 
	 * @param user User's instance to be authenticated.
     * @param secret Seed to generate token. Must be the same used for authentication.
	 */
	public static HashMap<String, Object> generateJWT(Usuario user, String secret) {

        Date expiresAt = getExpirationTime();

        if (ObjectUtils.nullOrEmpty(user.getEmail()))
            throw new IllegalArgumentException("email cannot be null or empty string");

        String jwt = JWT.create()
                .withClaim("email", user.getEmail())
                .withExpiresAt(expiresAt)
                .sign(Algorithm.HMAC256(secret));
        
        HashMap<String, Object> output = new HashMap<>();
        output.put("token", jwt);
        output.put("type", "bearer");
        output.put("expires_at", "" + expiresAt.getTime());

        return output;
    }
    
    private static Date getExpirationTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, 2);
        return calendar.getTime();
    }

}
