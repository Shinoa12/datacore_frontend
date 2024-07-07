import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import solicitudImg from "../assets/solicitud_home.png?url";
import { Bar, Pie, Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  getRequestsByMonth,
  getRequestsByResource,
  getRequestsBySpecialty,
  getAverageProcessingDuration,
  getSolicitudesCreadas,
  getSolicitudesEnProceso,
  getSolicitudesFinalizadas,
} from "../api/Home";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Home() {
  const [requestsByMonth, setRequestsByMonth] = useState([]);
  const [requestsByResource, setRequestsByResource] = useState({});
  const [requestsBySpecialty, setRequestsBySpecialty] = useState([]);
  const [averageProcessingDuration, setAverageProcessingDuration] =
    useState(null);
  const [solicitudesCreadas, setSolicitudesCreadas] = useState(0);
  const [solicitudesEnProceso, setSolicitudesEnProceso] = useState(0);
  const [solicitudesFinalizadas, setSolicitudesFinalizadas] = useState(0);

  useEffect(() => {
    getRequestsByMonth().then((response) => setRequestsByMonth(response.data));
    getRequestsByResource().then((response) =>
      setRequestsByResource(response.data)
    );
    getRequestsBySpecialty().then((response) =>
      setRequestsBySpecialty(response.data)
    );
    getAverageProcessingDuration().then((response) =>
      setAverageProcessingDuration(response.data.avg_duration)
    );
    getSolicitudesCreadas().then((response) =>
      setSolicitudesCreadas(response.data.count)
    );
    getSolicitudesEnProceso().then((response) =>
      setSolicitudesEnProceso(response.data.count)
    );
    getSolicitudesFinalizadas().then((response) =>
      setSolicitudesFinalizadas(response.data.count)
    );
  }, []);

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString("es-ES", { month: "long" });
  };

  const solicitudesPorMesData = {
    labels: requestsByMonth.map((item) => getMonthName(item.month)),
    datasets: [
      {
        label: "Solicitudes",
        data: requestsByMonth.map((item) => item.count),
        backgroundColor: "rgba(0, 0, 128,0.4)",
        borderColor: "rgba(0, 0, 128)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  const opcionesGraficoDeLineas = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const solicitudesPorRecursoData = {
    labels: Object.keys(requestsByResource),
    datasets: [
      {
        label: "",
        data: Object.values(requestsByResource),
        backgroundColor: ["#B9333A", "#424C73"],
      },
    ],
  };

  const colores = [
    "rgba(255, 99, 132, 0.9)",
    "rgba(54, 162, 235, 0.9)",
    "rgba(255, 206, 86, 0.9)",
    "rgba(75, 192, 192, 0.9)",
    "rgba(153, 102, 255, 0.9)",
    "rgba(255, 159, 64, 0.9)",
    "rgba(0, 128, 0, 0.9)",
    "rgba(0, 0, 128, 0.9)",
    "rgba(128, 0, 128, 0.9)",
    "rgba(128, 128, 0, 0.9)",
    "rgba(0, 128, 128, 0.9)",
  ];

  const solicitudesPorEspecialidadData = {
    labels: requestsBySpecialty.map((item) => item.nombre),
    datasets: [
      {
        data: requestsBySpecialty.map((item) => item.count),
        backgroundColor: colores,
      },
    ],
  };

  const duracionProcesamientoData = {
    labels: ["0-1 horas", "1-2 horas", "2-3 horas", "3-4 horas", "4+ horas"],
    datasets: [
      {
        label: "",
        data: averageProcessingDuration
          ? [
              averageProcessingDuration["0-1 horas"],
              averageProcessingDuration["1-2 horas"],
              averageProcessingDuration["2-3 horas"],
              averageProcessingDuration["3-4 horas"],
              averageProcessingDuration["4+ horas"],
            ]
          : [],
        backgroundColor: "#424C73",
      },
    ],
  };

  const downloadPDF = () => {
    const input = document.getElementById("charts");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("dashboard-report.pdf");
    });
  };

  const styles = {
    dashboard: {
      padding: "20px",
      backgroundColor: "#f5f5f5",
    },
    metrics: {
      display: "flex",
      justifyContent: "space-around",
      marginBottom: "20px",
    },
    metric: {
      padding: "10px 10px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      textAlign: "center",
      width: "250px",
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
    created: {
      backgroundColor: "#4CAF50",
    },
    inProgress: {
      backgroundColor: "#FFC107",
    },
    finished: {
      backgroundColor: "#F44336",
    },
    metricTitle: {
      fontSize: "18px",
      fontWeight: "bold",
      marginBottom: 0,
    },
    metricValue: {
      fontSize: "40px",
      fontWeight: "bold",
      margin: 0,
    },
    charts: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
    },
    chart: {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      margin: "10px",
      width: "45%",
    },
    pieChartContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      width: "100%",
    },
    pieChart: {
      width: "380px",
      height: "380px",
      margin: "0 auto",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    },
  };

  return (
    <>
      <div className="mx-4 my-4">
        {localStorage.getItem("is_admin") === "false" ? (
          <>
            <Box
              sx={{
                color: "primary.main",
                textAlign: "center",
                mt: 4,
                mb: 6,
              }}
            >
              <p className="font-bold text-3xl mb-3">
                Hola, {localStorage.getItem("first_name")}.
              </p>
              <p className="font-semibold text-2xl">¿Qué tal tu día?</p>

              <hr
                className="mt-6"
                style={{ width: "100%", borderTop: "4px solid" }}
              />
            </Box>

            <Box
              sx={{
                mx: "auto",
                width: "24rem",
                borderRadius: "0.25rem",
                boxShadow: "0 0.25rem 0.5rem 0 rgba(0, 0, 0, 0.2)",
                textAlign: "center",
              }}
            >
              <Box>
                <img
                  src={solicitudImg}
                  alt="Solicitud"
                  style={{ width: "50%", margin: "auto" }}
                />
              </Box>
              <Box sx={{ color: "primary.main", px: 2, pt: 2, pb: 4 }}>
                <p className="text-xl font-bold mb-4">
                  Solicitudes de recursos computacionales especializados
                </p>
                <p className="mb-6">
                  Elige y reserva un CPU o GPU para iniciar el procesamiento de
                  tus datos
                </p>
                <Button
                  component={Link}
                  to="/recursos-ofrecidos"
                  variant="contained"
                  startIcon={<AddIcon />}
                >
                  Nueva solicitud
                </Button>
              </Box>
            </Box>
          </>
        ) : (
          <>
            <Box
              sx={{
                color: "primary.main",
                textAlign: "center",
                mt: 4,
              }}
            >
              <p className="font-bold text-3xl mb-3">
                Bienvenido, {localStorage.getItem("first_name")}.
              </p>
              <p className="font-semibold text-2xl">
                Puedes revisar los módulos en la barra lateral.
              </p>
              <hr
                className="mt-6"
                style={{
                  width: "100%",
                  borderTop: "4px solid",
                }}
              />
            </Box>
            <div style={styles.dashboard}>
              <div style={styles.metrics}>
                <div style={{ ...styles.metric, ...styles.created }}>
                  <div style={styles.metricTitle}>Solicitudes Creadas</div>
                  <div style={styles.metricValue}>{solicitudesCreadas}</div>
                </div>
                <div style={{ ...styles.metric, ...styles.inProgress }}>
                  <div style={styles.metricTitle}>Solicitudes en Proceso</div>
                  <div style={styles.metricValue}>{solicitudesEnProceso}</div>
                </div>
                <div style={{ ...styles.metric, ...styles.finished }}>
                  <div style={styles.metricTitle}>Solicitudes Finalizadas</div>
                  <div style={styles.metricValue}>{solicitudesFinalizadas}</div>
                </div>
              </div>
              <div style={styles.charts} id="charts">
                <div style={styles.chart}>
                  <h1
                    className="font-bold text-xl"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Cantidad de Solicitudes por Mes
                  </h1>
                  <Line
                    data={solicitudesPorMesData}
                    options={opcionesGraficoDeLineas}
                  />
                </div>
                <div style={styles.chart}>
                  <h1
                    className="font-bold text-xl"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Número de Solicitudes por Recurso
                  </h1>
                  <Bar
                    data={solicitudesPorRecursoData}
                    options={{ plugins: { legend: { display: false } } }}
                  />
                </div>
                <div style={styles.chart}>
                  <h1
                    className="font-bold text-xl"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Número de Solicitudes por Especialidad
                  </h1>
                  <div style={styles.pieChartContainer}>
                    <div style={styles.pieChart}>
                      <Pie
                        data={solicitudesPorEspecialidadData}
                        options={{ plugins: { legend: { position: "left" } } }}
                      />
                    </div>
                  </div>
                </div>
                <div style={styles.chart}>
                  <h1
                    className="font-bold text-xl"
                    style={{ textAlign: "center", marginBottom: "5px" }}
                  >
                    Duración Promedio de Procesamiento de Solicitud
                  </h1>
                  <Bar
                    data={duracionProcesamientoData}
                    options={{ plugins: { legend: { display: false } } }}
                  />
                </div>
              </div>
              <div style={styles.buttonContainer}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={downloadPDF}
                >
                  Descargar Reporte PDF
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
