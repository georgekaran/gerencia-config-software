import { User as UserAPI, Item as ItemAPI } from '../utils/Api/Api';
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

}

export default FetchFactory;