import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import solicitudImg from "../assets/solicitud_home.png";

function Home() {
  return (
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
        </>
      )}
    </div>
  );
}

export default Home;
