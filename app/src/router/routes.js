import UserList from "../pages/User/UserList";
import Home from "../pages/Home/Home";

let routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    exact: true,
    component: Home
  },
  {
    path: "/users",
    name: "Usuários",
    icon: "ni ni-single-02 text-yellow",
    component: UserList
  }
];

export default routes;
