import {
  FaHome,
  FaUserShield,
  FaUserSlash,
  FaHistory,
  FaInbox,
  FaCog,
  FaRegUserCircle,
} from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={`${sidebarToggle ? "hidden" : "block"} w-64 fixed h-full text-center flex flex-col`}
      
    >
      <div className="text-center px-4 py-2">
        <FaRegUserCircle
          size={39}
          className="inline-block text-dark font-semibold"
        ></FaRegUserCircle>
        <h4 className="text-dark">
          {localStorage.getItem("first_name") +
            " " +
            localStorage.getItem("last_name")}
        </h4>
        <p className="text-gray-400">
          {localStorage.getItem("is_admin") === "true"
            ? "(Administrador)"
            : "(Usuario)"}
        </p>
      </div>

      <div className="flex-grow">
        <ul className="mt-1 text-white font-semibold" style={{ backgroundColor: "rgba(4, 35, 84, 1)" }}>
          {localStorage.getItem("is_admin") === "true" ? (
            <>
              <Link to="usuarios-autorizados" >
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaUserShield className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserShield>
                    Usuarios autorizados
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />
              <Link to="usuarios-desautorizados">
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaUserSlash className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserSlash>
                    Usuarios desautorizados
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />
              <Link to="historial">
                <li className="hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaHistory className="inline-block w-6 h-5 mr-3 -mt-2"></FaHistory>
                    Historial
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />
              <Link to="recursos">
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <BsCpuFill className="inline-block w-6 h-5 mr-3 -mt-2"></BsCpuFill>
                    Recursos
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />
              <Link to="ajustes">
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaCog className="inline-block w-6 h-6 mr-3 -mt-2"></FaCog>
                    Ajustes
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />
            </>
          ) : (
            <>
              <Link to="home">
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaHome className="inline-block w-6 h-5 mr-3 -mt-2"></FaHome>
                    Home
                  </button>
                </li>
              </Link>
              <hr className="border-4 border-white" />

              <Link to="solicitudes">
                <li className=" hover:shadow hover:bg-blue-500 py-2 text-center">
                  <button className="px-3 text-sm">
                    <FaInbox className="inline-block w-6 h-6 mr-3 -mt-2"></FaInbox>
                    Solicitudes
                  </button>
                </li>
              </Link>
            </>
          )}
        </ul>
      </div>
      
      <div className="mt-auto text-center py-4 bg-white flex justify-center items-center">
        <img
          src="/src/assets/Imagen DataCore.png"
          alt="DataCore"
          className="mx-auto mb-2"
          style={{ maxWidth: "80px", height: "auto" }}
        />
        <img
          src="/src/assets/pucp_logo.png"
          alt="PUCP"
          className="mx-auto mb-2"
          style={{ maxWidth: "130px", height: "auto" }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
