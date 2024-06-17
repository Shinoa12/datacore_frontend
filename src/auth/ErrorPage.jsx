import React from 'react';
import { Link } from 'react-router-dom';
import warningImg from '../assets/warning.png';

const ErrorPage = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-lg">
        <div className="flex flex-col items-center p-6">
          <img src={warningImg} alt="Advertencia" className="w-12 h-12 mb-4" />
          <h5 className="text-lg font-bold mb-2">Advertencia</h5>
          <p className="text-center mb-2">
            Ups, parece que has llegado a una zona exclusiva.
          </p>
          <p className="text-center mb-2">
            Si necesitas acceder o tienes alguna pregunta, no dudes en contactarte con nuestro equipo en el DAI a través del siguiente correo: 
            <span className="font-semibold"> correo@pucp.edu.pe </span>
            y estaremos encantados de asistirte.
          </p>
          <p className="text-center mb-4">¡Gracias por tu comprensión!</p>
          <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Cerrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
