import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 90 },
  { field: "correo", headerName: "Correo", width: 200 },
  {
    field: "nombres",
    headerName: "Nombres",
    width: 150,
    editable: true,
  },
  {
    field: "facultad",
    headerName: "Facultad",
    width: 150,
    editable: true,
  },

  {
    field: "age",
    headerName: "Especialidad",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "fullName",
    headerName: "Recursos Máximos",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.facultad || ""} ${row.nombres || ""}`,
  },
];

const rows = [
  {id: 1,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 2,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 3,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 4,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 5,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 6,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 7,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 8,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 9,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  {id: 10,
    correo: "christia@pupc.edu.pe",
    nombres: "CHRISTIAN OCHOA PATIÑO",
    facultad: "Ciencias e Ingeniería",
    age: 1,
  },
  //
];

function UsuariosAutorizados() {
  return (
    <div className="ml-4 mt-4">
      <h2
        style={{ color: "rgb(4, 35, 84)" }}
        className=" font-bold text-3xl mb-4"
      >
        Lista de usuarios autorizados
      </h2>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          //   checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <div className="flex justify-end">
        {" "}
        {/* Added a new div with justify-end class */}
        <Button variant="contained">NUEVO USUARIO</Button>
      </div>
    </div>
  );
}

export default UsuariosAutorizados;
