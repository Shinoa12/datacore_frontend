import {
  FaHome,
  FaUserShield,
  FaUserSlash,
  FaHistory,
  FaInbox,
  FaCog,
  FaRegUserCircle ,
} from "react-icons/fa";
import { BsCpuFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarToggle }) => {
  return (
    <div
      className={`${
        sidebarToggle ? "hidden" : "block"
      } w-64 fixed h-full `}
      style={{ backgroundColor: "rgba(4, 35, 84, 1)" }}
    >
      <div className=" mb-2 text-center bg-white px-4 py-2">
        <FaRegUserCircle size={39} className="inline-block text-dark font-semibold" ></FaRegUserCircle>
        <h4 className="text-dark">{localStorage.getItem('first_name') + ' ' + localStorage.getItem('last_name') }</h4>
        <p className="text-gray-400">{localStorage.getItem('is_admin')==='true' ? "(Administrador)" : "(Usuario)"}</p>
      </div>
     
      <ul className="mt-1 text-white font-semibold">
        {localStorage.getItem('is_admin')==='true' ?
        <>
          <Link to="usuarios-autorizados">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaUserShield className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserShield>
              Usuarios autorizados
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        <Link to="usuarios-no-autorizados">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaUserSlash className="inline-block w-6 h-5 mr-3 -mt-2"></FaUserSlash>
              Usuarios no autorizados
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        <Link to="historial">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaHistory className="inline-block w-6 h-5 mr-3 -mt-2"></FaHistory>
              Historial
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        <Link to="recursos">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <BsCpuFill className="inline-block w-6 h-5 mr-3 -mt-2"></BsCpuFill>
              Recursos
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        <Link to="ajustes">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaCog className="inline-block w-6 h-6 mr-3 -mt-2"></FaCog>
              Ajustes
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        </>
        :
        <>
        <Link to="home">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaHome className="inline-block w-6 h-5 mr-3 -mt-2"></FaHome>
              Home
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />

        <Link to="solicitudes">
          <li className="mb-2 hover:shadow hover:bg-blue-500 py-2 text-center">
            <button className="px-3 text-sm">
              <FaInbox className="inline-block w-6 h-6 mr-3 -mt-2"></FaInbox>
              Solicitudes
            </button>
          </li>
        </Link>
        <hr className="border-4 border-white" />
        </>
      
      }
        

      </ul>
      <div className="mt-auto text-center py-4">
        <img src="/src/assets/datacore_logo.png" alt="DataCore" className="img-fluid mx-auto mb-2" style={{ width: "100px" }} />
      </div>
    </div>
  );
};

export default Sidebar;
