import Box from "@mui/material/Box";

function Ayuda() {
  return (
    <div className="mx-8 my-6">
      <Box
        sx={{
          color: "primary.main",
          mt: 4,
        }}
      >
        <p className="font-bold text-3xl mb-3">
          {localStorage.getItem("first_name")}, ¿necesitas ayuda?
        </p>
        <p className="font-semibold text-2xl">¡Contáctanos!</p>
        <hr
          className="mt-6"
          style={{
            width: "100%",
            borderTop: "4px solid",
          }}
        />
      </Box>
      <Box
        sx={{
          pt: 4,
          color: "primary.main",
        }}
      >
        <p>
          Si estás experimentando dificultades o tienes alguna pregunta, no
          dudes en comunicarte con nuestro equipo.
        </p>
        <p className="mb-4">
          Estamos aquí para ayudarte en todo lo que necesites.
        </p>
        <p className="mb-1">Contáctanos al correo</p>
        <p className="font-bold mb-4">email@pucp.edu.pe</p>
        <p className="">Estaremos encantados de ayudarte.</p>
      </Box>
    </div>
  );
}
export default Ayuda;
