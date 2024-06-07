import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faFile } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import ModalSolicitudExito from '../components/ModalSolicitudExito';
import CPUDropdown from '../components/CPUDropdown';
import { createSolicitud} from '../api/Solicitudes';
import pdfGuia from '../img/Manual de usuario para investigador.pdf';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';


function CPUSolicitud() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [showDropMessage, setShowDropMessage] = useState(true);
    const [executionParameters, setExecutionParameters] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [selectedCPU, setSelectedCPU] = useState({
        frecuencia_cpu: "",
        id_recurso : {
            estado: true ,
            id_recurso: 1,
            solicitudes_encoladas: "",
            tamano_ram: "",
            ubicacion: "",
        },
        
        nombre: "",
        numero_nucleos_cpu: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (event) => {
        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.target.files)]);
        setShowDropMessage(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        setSelectedFiles(prevFiles => [...prevFiles, ...Array.from(event.dataTransfer.files)]);
        setShowDropMessage(false);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleRemoveFile = (fileToRemove) => {
        setSelectedFiles(prevFiles => prevFiles.filter(file => file !== fileToRemove));
        if (selectedFiles.length === 1) {
            setShowDropMessage(true);
        }
    };

    const handleExecutionParametersChange = (event) => {
        setExecutionParameters(event.target.value);
    };

    async function handleCrearClick () {
        await createSolicitud(localStorage.getItem('id_user'),selectedCPU.id_recurso.id_recurso , executionParameters , selectedFiles)
        .then(response => {
            console.log('Solicitud creada con éxito:', response.data);
            setShowModal(true);
        })
        .catch(error => {
            console.error('Error al crear la solicitud:', error);
        });
    };

    const handleModalOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };


    const handleCPUChange = (event) => { 
        setSelectedCPU(event.target.value);
        console.log(selectedCPU);
    };

    return (
        <div className="ml-4 mt-4" style={{ display: 'flex', flexDirection: 'column' }}>
            <h1 style={{ color: "rgb(4, 35, 84)" }} className="font-bold text-3xl mb-4">
                CPU disponibles
            </h1>
            <div style={{ display: 'flex', flex: 1 }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Recurso computacional
                        </strong>
                    </h2>
                    <CPUDropdown value={selectedCPU} onChange={handleCPUChange} />
                    <br></br>
                    <br></br>
                    <h2 style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Detalle del recurso
                        </strong>
                    </h2>
                    <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.08)', padding: '20px', borderRadius: '5px', marginTop: '20px'}}>
                        <p style={{ marginBottom: '10px' }}><strong>Cantidad de núcleos: {selectedCPU.numero_nucleos_cpu}</strong></p>
                        <p style={{ marginBottom: '10px' }}><strong>Frecuencia del procesador: {selectedCPU.frecuencia_cpu}</strong></p>
                        <p style={{ marginBottom: '10px' }}><strong>Tamaño de memoria RAM: {selectedCPU.id_recurso.tamano_ram}</strong></p>
                        {/* <p style={{ marginBottom: '10px' }}><strong>Sistema Operativo:</strong></p> */}
                        <div style={{ textAlign: 'center' }}>
                            <button onClick={openModal} style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#162447', color: '#fff', border: 'none', cursor: 'pointer' }} >
                                Descubre más sobre el recurso
                            </button>
                            {isModalOpen && (
                                <div style={{ position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <div style={{ position: 'relative', zIndex: '1000', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', width: '90%', maxWidth: '1000px', height: '80%', maxHeight: '800px', textAlign: 'left' }} >
                                        <h2 style={{ color: "rgb(4, 35, 84)" }} className="font-bold text-3xl mb-4">Librerías</h2>
                                        <span style={{ position: 'absolute', top: '20px', right: '20px', cursor: 'pointer' }} onClick={closeModal}>
                                            <FontAwesomeIcon icon={faTimes} style={{ fontSize: '24px' }}/>
                                        </span>
                                        <FormControl required sx={{ minWidth: 240, width: '100%' }}>
                                            <InputLabel id="modal-herramientas-label">Herramientas</InputLabel>
                                            <Select
                                                labelId="modal-herramientas-label"
                                                id="modal-herramientas"
                                                value={selectedOption}
                                                onChange={handleModalOptionChange}
                                                label="Herramientas"
                                                style={{ width: '50%', marginTop: '20px' }}
                                            >
                                                <MenuItem value="">Seleccionar opción</MenuItem>
                                                <MenuItem value="opcion1">Opción 1</MenuItem>
                                                <MenuItem value="opcion2">Opción 2</MenuItem>
                                                <MenuItem value="opcion3">Opción 3</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div style={{ position: 'absolute', bottom: '20px', left: '20px' }}>
                                            <strong style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>Si NO encontraste tu librería aquí dirígete al icono de ayuda en la sección anterior y comunícate con nuestro equipo.</strong>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <br></br>
                    <h2 style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Posición en cola del recurso
                        </strong>
                    </h2>

                    <div style={{
                        position: 'relative',
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                        padding: '10px',
                        borderRadius: '5px',
                        textAlign: 'left',
                        minWidth: '30px',
                    }}>
                        <span style={{ color: "rgb(4, 35, 84)" }}>{selectedCPU.id_recurso.solicitudes_encoladas}</span>
                    </div>
                </div>
                <div style={{ flex: 1, marginLeft: '20px', marginRight: '30px', height: '400px' }}>
                    <h2 style={{ fontSize: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Archivos
                        </strong>
                    </h2>
                    <div style={{ border: '2px dashed #ccc', borderRadius: '5px', padding: '20px', textAlign: 'center', cursor: 'pointer', position: 'static', height: '200px' }} onDrop={handleDrop} onDragOver={handleDragOver} >
                        {!selectedFiles.length && (
                            <label style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                                Haz clic para elegir un archivo
                                <input type="file" style={{ display: 'none' }} onChange={handleFileChange} multiple />
                            </label>
                        )}
                        {!selectedFiles.length && showDropMessage && <span> o arrastra y suelta archivos aquí</span>}
                        {selectedFiles.length > 0 && (
                            <div style={{ marginTop: '10px', textAlign: 'left' }}>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {selectedFiles.map((file, index) => (
                                        <li key={index} style={{ marginBottom: '5px' }}>
                                            <FontAwesomeIcon icon={faFile} style={{ marginRight: '5px' }} />
                                            {file.name}
                                            <FontAwesomeIcon icon={faTimes} style={{ marginLeft: '5px', cursor: 'pointer' }} onClick={() => handleRemoveFile(file)} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <h2 style={{ fontSize: '20px', marginTop: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Parámetros de ejecución
                        </strong>
                    </h2>
                    <input type="text" value={executionParameters} onChange={handleExecutionParametersChange} placeholder="Agregar parámetros..." style={{ width: '100%', height: '100px', fontSize: '16px', fontStyle: 'italic', textAlign: 'left', paddingLeft: '20px', t: '20px', paddingTop: '20px', paddingBottom: '20px', backgroundColor: 'rgba(0, 0, 0, 0.08)', border: 'none', borderRadius: '5px', boxSizing: 'border-box' }} />
                    <h2 style={{ fontSize: '15px', marginTop: '20px', marginBottom: '10px', color: "rgb(4, 35, 84)" }}>
                        <strong>
                            Si aún no entiendes la pantalla o cómo crear tu solicitud, ¡NO TE PREOCUPES! <br></br>
                            Te invitamos a descubrir una guía fácil y sin complicaciones. <br></br>
                            <a href={pdfGuia} download style={{ textDecoration: 'underline' }}>HAZ CLICK AQUÍ</a>
                        </strong>
                    </h2>
                    <div style={{ textAlign: 'right' }}>
                        <Link to="/recursos-ofrecidos">
                            <button style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#162447', color: '#fff', border: 'none', cursor: 'pointer', width: '100px' }}>
                                Regresar
                            </button>
                        </Link>
                        <button
                            style={{ padding: '10px 20px', marginLeft: '40px', fontSize: '16px', borderRadius: '5px', backgroundColor: '#162447', color: '#fff', border: 'none', cursor: 'pointer', width: '100px' }}
                            onClick={handleCrearClick} 
                        >
                            Crear
                        </button>
                        {showModal && <ModalSolicitudExito />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CPUSolicitud;
