import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";

var routes = [
  {
    path: "/",
    name: "Home",
    icon: "ni ni-tv-2 text-primary",
    component: Home,
    layout: "/admin",
    privateRoute: true
  },
  {
    path: "/",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    privateRoute: false
  }
];
export default routes;
