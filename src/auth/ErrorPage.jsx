import React from 'react';
import { Link } from 'react-router-dom';
import warningImg from '../assets/warning.png'


const ErrorPage = () => {
  return (
    <div>
      <div
        className="modal show"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header" style={{'alignSelf':'center'}}>
              <div className='header-icon'>
                <img src={warningImg} alt='Advertencia' className='me-2'/>
                <h5 className='modal-title'>Advertencia</h5>
                </div>
            </div>
            <div className="modal-body d-flex flex-column align-items-center" >
              <p className='custom-text'>Ups, parece que has llegado a una zona exclusiva.</p>
              <p className='custom-text' >Si necesitas acceder o tienes alguna pregunta, 
                no dudes en contactarte con nuestro equipo en el DAI a través del </p>
                <p className='custom-text'> siguiente correo: correo@pucp.edu.pe y 
                estaremos encantados de asistirte</p>
                <p className='custom-text'>¡Gracias por tu comprensión</p>
            </div>
            <div className="modal-footer justify-content-center">
              <Link to="/" className="btn btn-primary">
                Cerrar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;