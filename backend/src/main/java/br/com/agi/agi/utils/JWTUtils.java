package br.com.agi.agi.utils;

import br.com.agi.agi.models.Usuario;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

public class JWTUtils {

	/**
	 * Gera um token JWT para autenticar o usuário
	 * 
	 * @param Usuario user Instância do usuário a ser autenticado
     * @param String secret Seed para geração do token. Deve ser a mesma utilizada para autenticar
	 */
	public static HashMap<String, String> generateJWT(Usuario user, String secret) {

        Date expiresAt = getExpirationTime();

        String jwt = JWT.create()
                .withClaim("email", user.getEmail())
                .withExpiresAt(expiresAt)
                .sign(Algorithm.HMAC256(secret));
        
        HashMap<String, String> output = new HashMap<>();
        output.put("token", jwt);
        output.put("type", "bearer");
        output.put("expires_at", "" + expiresAt.getTime());

        return output;
    }
    
    private static Date getExpirationTime() {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.HOUR_OF_DAY, 1);
        return calendar.getTime();
    }

}
