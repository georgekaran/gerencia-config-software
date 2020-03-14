package br.com.agi.agi.utils;

public class ObjectUtils {

    /**
     * Verifica se algum objeto da lista está nulo ou vazio (em caso de Strings)
     * @param objects
     * @return
     */
    public static boolean nullOrEmpty(Object... objects) {

        for (Object obj : objects) {
            if (obj == null) {
                return true;
            }

            if (obj instanceof String) {
                String o = (String) obj;
                if (o.equals("")) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Verifica se algum objeto da lista está nulo e retorna a String sem espaços
     * @param String
     * @return
     */
    public static String trim(String value) {
        return value != null ? value.trim() : value;
    }

    /**
     * Verifica se algum objeto da lista está nulo ou vazio (Lista vazia)
     * @param objects
     * @return
     */
    public static boolean nullOrEmpty(Iterable<?>... iterables){
        for(Iterable<?> iterable : iterables) {
            if(iterable == null)
                return true;
            java.util.Iterator<?> iterator = iterable.iterator();
            if(!iterator.hasNext())
                return true;
        }
        return false;
    }
}
