import HomePage from "./pages/HomePages";
import CreatePage from "./pages/CreatePage";
import ListPage from "./pages/ListPage";
import AdminPage from "./pages/AdminPage";
import EditPage from "./pages/EditPage";
import ShowPage from "./pages/ShowPage";
import NotFoundPage from "./pages/NotFoundPage";

const routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/blogs',
    component: ListPage
  },
  {
    path: '/admin',
    component: AdminPage,
    auth: true
  },
  {
    path: '/blogs/create',
    component: CreatePage,
    auth: true
  },
  {
    path: '/blogs/:id/edit',
    component: EditPage,
    auth: true
  },
  {
    path: '/blogs/:id',
    component: ShowPage
  }, 
  {
    path: '*',
    component: NotFoundPage
  }
]

export default routes;


