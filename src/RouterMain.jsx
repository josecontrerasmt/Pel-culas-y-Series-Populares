import {
  HashRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/Home";
import Info from "./pages/Info";
import AddList from "./Components/AddList";
import WatchList from "./pages/WatchList";
import { useContext } from "react";
import AppContext from "./context/AppContext";
import GenerosPage from "./pages/GenerosPage";
import ListPage from "./pages/ListPage";
import SearchPage from "./pages/SearchPage";
import Error from "./pages/Error";

export default function RouterMain() {
    const {dataOption}=useContext(AppContext)
  return (
    <HashRouter>
        <div>
          <AddList />
          <WatchList/>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${dataOption}/:id`} element={<Info />} />
          <Route path={`/${dataOption}/:genero/:id`} element={<GenerosPage />} />
          <Route path={`/${dataOption}/lista/:id`} element={<ListPage/>} />
          <Route path={`/${dataOption}/search/:query`} element={<SearchPage/>} />
          <Route path="*" element={<Error/>} />
        </Routes>
    </HashRouter>
  )
}
