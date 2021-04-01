import React, { useState} from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close"
const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
      "& .MuiOutlinedInput-input": {
        fontSize: 16,
        marginBottom: 10,
      },
      "& Button": {
        fontSize: 20,
      },
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiOutlinedInput-input": {
        fontSize: 18,
        hight: 20,
      },
      "& Button": {
        fontSize: 10,
      },
    },

    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      "& #name": {
        width: "20rem",
      },
    },

    [theme.breakpoints.up("lg")]: {
      justifyContent: "space-evently",
      "& .MuiOutlinedInput-input": {
        fontSize: 20,
      },
      "& Button": {
        fontSize: 20,
        height: 75,
      },
      "& #name": {
        width: "25rem",
      },
    },
  },
   alert: {
    marginTop: "2em",
  }
}));

function AddForm() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm(); // initialize the hook
  const [result, setResult] = useState([]);
  const [open,setOpen] = useState(false);
  const [alertopen, setAlertOpen] = useState(true);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setAlertOpen(true);
  };
  const onSubmit = async (data) => {
    // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    //--------------------------------
    //Отправка формы в бд на выборку
    await fetch("http://localhost:4000/api/addstudents", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then(async (res) => {
        return await await res.json();
      })
      .then(async (res) => {
         return await setResult(res);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  };
  //--------------------------------
  const onErr = (err) => console.error(err);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit, onErr)} id="myform" className={classes.card}>
        <div>
          <label>Група</label>
          <input ref={register} type="number" name="group" />
        </div>
        <div>
          <label>ПІП</label>
          <input type="text" ref={register} name="name" />
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Добавити студента?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви впевнені,що хочете добавити нового студента?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрити
          </Button>
          <Button variant="contained" color="primary" type="submit" form="myform" onClick={handleClose}>
            Добавити
        </Button>
        </DialogActions>
      </Dialog>
      <Button variant="contained" color="primary" onClick={handleOpen}>
          Відправити
      </Button>
      </form>
      <div className={classes.alert}>{result.message == 'Ви не ввели студента чи групу' ? (<Alert severity="info">
        <AlertTitle>Info</AlertTitle>
        <strong>{result.message}</strong>
      </Alert>) : result.message == 'Такий студент вже існує' ? (<div>
        <Collapse in={alertopen}>
          <Alert
            severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <strong>{result.message}</strong>
          </Alert>
        </Collapse>
      </div>) : result.message == 'Студента було додано' ? (<div>
        <Collapse in={alertopen}>
          <Alert
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <strong>{result.message}</strong>
          </Alert>
        </Collapse>
      </div>) : (<div></div>)}
      </div>
    </div>
  );
}

export default AddForm;
