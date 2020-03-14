package br.com.agi.agi.utils;

import java.math.BigDecimal;

public class NumberUtils {

    public static BigDecimal convertToBigDecimal(String value) {
        try {
            return new BigDecimal(value);
        } catch (Exception e) {
            return BigDecimal.ZERO;
        }
    }
}
