import UserList from "../pages/User/UserList";
import Home from "../pages/Home/Home";
import UserForm from "../pages/User/UserForm";

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
  }
];

export default routes;
