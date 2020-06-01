import UserList from "../pages/User/UserList";
import Home from "../pages/Home/Home";
import UserForm from "../pages/User/UserForm";
import ItemList from "../pages/Item/ItemList";
import ItemForm from "../pages/Item/ItemForm";

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
    icon: "ni ni-single-02 text-yellow",
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
  }
];

export default routes;
