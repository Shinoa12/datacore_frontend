import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext.jsx";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from "@mui/icons-material/Help";

function Navbar({ sidebarToggle, setSidebarToggle }) {
  const theme = useTheme();
  const { handlerLogout } = useContext(AuthContext);

  return (
    <div
      className={`fixed top-0 right-0 z-10 w-full transition-all duration-300`}
      style={{
        width: sidebarToggle ? "100%" : "calc(100% - 16rem)", // 16rem (64 * 0.25rem) es el ancho de la sidebar
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <nav
        className="px-6 py-6 flex justify-between"
      >
        <div className="flex flex-row items-center">
          <IconButton onClick={() => setSidebarToggle(!sidebarToggle)}>
            <MenuIcon
              sx={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </IconButton>

          <Link to="/">
            <img
              src="/src/assets/datacore_logo.svg"
              alt="DataCore"
              style={{ height: "60px", marginLeft: "1.75rem" }}
            />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <IconButton component={Link} to="/ayuda">
            <HelpIcon
              sx={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </IconButton>
          <IconButton onClick={handlerLogout}>
            <LogoutIcon
              sx={{
                color: "white",
                fontSize: "1.75rem",
              }}
            />
          </IconButton>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
