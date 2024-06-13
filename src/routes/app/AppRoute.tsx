// Third party
import { Link, Outlet } from "react-router-dom";
// Components
import { Image } from "@/components/ui/image";
import { Navigation } from "@/components/ui/navigation";
// Styles
import styles from "./AppRoute.module.css";
// Assets
import {
  icon_nav_bookmark,
  icon_nav_home,
  icon_nav_movies,
  icon_nav_tv_series,
  logo,
  user,
} from "@/assets/images/icons";

export function AppRoute() {
  return (
    <div className={styles.container}>
      <header>
        <Navigation className="container">
          <Link to="/">
            <Image src={logo}></Image>
          </Link>
          <Link to="/">
            <Image src={icon_nav_home}></Image>
          </Link>
          <Link to="/movies">
            <Image src={icon_nav_movies}></Image>
          </Link>
          <Link to="/tv">
            <Image src={icon_nav_tv_series}></Image>
          </Link>
          <Link to="/bookmark">
            <Image src={icon_nav_bookmark}></Image>
          </Link>
          <Link to="/">
            <Image src={user}></Image>
          </Link>
        </Navigation>
      </header>
      <main className="macro-grid">
        <Outlet />
      </main>
    </div>
  );
}
