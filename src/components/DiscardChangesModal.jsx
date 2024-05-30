import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

function DiscardChangesModal({ open, onClose, onConfirm }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="dialog-title"
        fullWidth={true}
        disableRestoreFocus
        sx={{
          ".MuiDialog-paper": {
            p: 2,
          },
        }}
      >
        <DialogTitle
          sx={{
            mb: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          id="dialog-title"
        >
          <FontAwesomeIcon
            size="3x"
            icon={faTriangleExclamation}
            style={{ marginBottom: "20px", color: "#B9333A" }}
          />
          <p
            style={{ fontSize: "24px", textAlign: "center", color: "#042354" }}
          >
            ¿Estás seguro de que quieres salir?
          </p>
        </DialogTitle>
        <DialogContent sx={{ textAlign: "center", color: "#042354", mb: 1 }}>
          <p>Se perderán todos los datos.</p>
        </DialogContent>
        <DialogActions
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <Button onClick={onClose} variant="contained">
            No, continuar editando
          </Button>
          <Button onClick={onConfirm} variant="outlined">
            Sí, salir y descartar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DiscardChangesModal;
