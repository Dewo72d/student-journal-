import { Button, Collapse, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, makeStyles } from "@material-ui/core"
import { Alert } from "@material-ui/lab";
import { useState } from "react";
import { useForm } from "react-hook-form";
import CloseIcon from "@material-ui/icons/Close"
const useStyles = makeStyles({
    item:{
        width: "100%",
        margin: "0 auto"
    },
    alert: {
        marginTop: "2em",
      }
})
function UppdateForm() {
    const {register, handleSubmit} = useForm();
    const [result, setResult] = useState('');
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
        let formData = new FormData();
        for (let key in data) {
          formData.append(key, data[key]);
        }
        await fetch("http://localhost:4000/api/uppdatestudents", {
          method: "POST",
          mode: "cors",
          body: formData,
        })
          .then(async (res) => {
            return await await res.text();
          })
          .then(async (res) => {
             return await setResult(res);
          })
          .catch((err) => {
            console.log(err);
          }, []);
      };
    const onErr = (err) =>{
        console.log(err);
    }
    const classes = useStyles();
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit,onErr)} id="myform3">
            <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Продовжити?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ви впевнені,що хочете перевести студентів на наступний курс?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Закрити
          </Button>
          <Button variant="contained" color="primary" type="submit" form="myform3" onClick={handleClose}>
            Далі
        </Button>
        </DialogActions>
      </Dialog>
      <Button className={classes.item} variant="contained" color="primary" onClick={handleOpen}>
          Відправити
      </Button>
      <div className={classes.alert}>
          {result === '0' ? (<div>
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
          <strong>Помилка</strong>
        </Alert>
      </Collapse>
    </div>): result.length === 0 ?(<div></div>):(<div>
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
          <strong>Всі студенти переведені на наступний курс</strong>
        </Alert>
      </Collapse>
    </div>)}
          </div>
            </form>
        </div>
    )
}
export default UppdateForm;
