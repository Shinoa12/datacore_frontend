import { useState, Fragment } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { runScript } from "../api/Scripts";

function Test() {
  const scripts = [
    {
      filename: "list_dir.py",
      description: "Listar contenidos del directorio",
    },
    { filename: "hola_mundo.py", description: "Hola mundo" },
    { filename: "cat_prueba.py", description: "Imprimir txt de prueba" },
  ];

  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchScriptOutput = async (name) => {
    setLoading(true);
    try {
      const script = { filename: name };
      const response = await runScript(script);
      setOutput(response.data.output);
    } catch (error) {
      console.error("Error al ejecutar script", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-8 my-6">
      <Box sx={{ color: "primary.main", mb: 2 }}>
        <h1 className="font-bold text-3xl">Pruebas</h1>
      </Box>

      <Box
        sx={{
          px: 2,
          py: 3,
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {scripts.map((script, index) => (
          <Fragment key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <p className="font-semibold">{script.description}</p>
                <p className="text-sm font-mono">{script.filename}</p>
              </Box>
              <Button
                variant="contained"
                onClick={() => fetchScriptOutput(script.filename)}
              >
                Ejecutar
              </Button>
            </Box>
            <Divider />
          </Fragment>
        ))}
      </Box>

      <Box sx={{ color: "primary.main", my: 2 }}>
        <h1 className="font-bold text-xl">Output</h1>
      </Box>
      <Box
        sx={{
          mt: 2,
          p: 2,
          backgroundColor: "#F0F0F0",
          height: "20rem",
          borderRadius: "0.25rem",
          fontFamily: "monospace",
          whiteSpace: "pre-wrap",
          color: output === "" || loading ? "gray" : "inherit",
        }}
      >
        {loading ? (
          <p>Cargando...</p>
        ) : output === "" ? (
          <p>Ejecuta un script...</p>
        ) : (
          <p>{output}</p>
        )}
      </Box>
    </div>
  );
}

export default Test;
