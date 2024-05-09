import UpdateUserModal from '../components/UpdateUserModal';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import {getUserById} from '../api/UpdateUserAPI';

function UsuariosAutorizados() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({
    id : 0 ,
    username : "",
    first_name: "",
    last_name : "" ,
    id_facultad : "",
    id_especialidad : "",
    id_estado_persona : "",
    recursos_max : 1
  }); //reemplazar por la lista de todos los usuarios


  async function CargarUsuario(idUser){
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  async function openUpdateUserModal() {
    await CargarUsuario(1);
    setOpen(true);
  }

    return (
      <div className="ml-4 mt-4">
        
        {/*El icono se puede iterar de acuerdo a la lista de usuarios*/}
        <EditIcon onClick={openUpdateUserModal} style={{ cursor: 'pointer' }} />


        {/*El componente modal se puede usar para todos los iconos, para ello se le debe de setear el user correspondiente*/}
        <UpdateUserModal open = {open} setOpen = {setOpen} user = {user}></UpdateUserModal>
      </div>
    );
  }
  
export default UsuariosAutorizados;