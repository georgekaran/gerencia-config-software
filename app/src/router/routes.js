import UserList from "../pages/User/UserList";
import Home from "../pages/Home/Home";
import UserForm from "../pages/User/UserForm";
import ItemList from "../pages/Item/ItemList";
import ItemForm from "../pages/Item/ItemForm";
import MethodPaymentList from "../pages/MethodPayment/MethodPaymentList";
import MethodPaymentForm from "../pages/MethodPayment/MethodPaymentForm";

let routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    exact: true,
    showOnSideBar: true,
    component: Home
  },
  {
    path: "/users",
    name: "Usuários",
    icon: "ni ni-single-02 text-yellow",
    showOnSideBar: true,
    component: UserList
  },
  {
    path: "/users/form",
    showOnSideBar: false,
    component: UserForm
  },
  {
    path: "/users/form/:id",
    showOnSideBar: false,
    component: UserForm
  },
  {
    path: "/items",
    name: "Itens",
    icon: "ni ni-box-2 text-red",
    showOnSideBar: true,
    component: ItemList
  },
  {
    path: "/items/form",
    showOnSideBar: false,
    component: ItemForm
  },
  {
    path: "/items/form/:id",
    showOnSideBar: false,
    component: ItemForm
  },
  {
    path: "/forma-pagamento",
    name: "Forma de pagamento",
    icon: "ni ni-money-coins text-green",
    showOnSideBar: true,
    component: MethodPaymentList
  },
  {
    path: "/forma-pagamento/form",
    showOnSideBar: false,
    component: MethodPaymentForm
  },
  {
    path: "/forma-pagamento/form/:id",
    showOnSideBar: false,
    component: MethodPaymentForm
  }
];

export default routes;
