import { User as UserAPI, Item as ItemAPI, FormaPagamento as FormaPagamentoAPI } from '../utils/Api/Api';
import useFetchAll from "./fetch/useFetchAll";
import useFetchOne from "./fetch/useFetchOne";

class FetchFactory {

  static fetchUsers(props) {
    return useFetchAll(props, UserAPI);
  }

  static fetchUser(id) {
    return useFetchOne(id, UserAPI);
  }

  static fetchItems(props) {
    return useFetchAll(props, ItemAPI);
  }

  static fetchItem(id) {
    return useFetchOne(id, ItemAPI);
  }

  static fetchFormasPagamento(props) {
    return useFetchAll(props, FormaPagamentoAPI);
  }

  static fetchFormaPagamento(id) {
    return useFetchOne(id, FormaPagamentoAPI);
  }

}

export default FetchFactory;