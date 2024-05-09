import UpdateUserModal from '../components/UpdateUserModal';
import EditIcon from '@mui/icons-material/Edit';
import * as React from 'react';
import {getUserById} from '../api/UpdateUserAPI';

function UsuariosAutorizados() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({});

  

  async function CargarUsuario(idUser){
    const res = await getUserById(idUser);
    console.log(res);
    setUser(res.data);
  }

  async function openUpdateUserModal(idUser){ //Funcion para abrir el modal
    await CargarUsuario(idUser);
    setOpen(true);
  }

    return (
      <div className="ml-4 mt-4">
        
        {/*El icono se puede iterar de acuerdo a la lista de usuarios colocar el id de usuario en lugar de 1 */}
        <EditIcon onClick={() => openUpdateUserModal(1)} style={{ cursor: 'pointer' }} />
        


        {/*El componente modal se puede usar para todos los iconos, para ello se le debe de setear el user correspondiente*/}
        <UpdateUserModal open = {open} setOpen = {setOpen} user = {user}></UpdateUserModal>
      </div>
    );
  }
  
export default UsuariosAutorizados;