import React from "react";
import Paper from "@material-ui/core/Paper";
import FilterForm from "../admin/filter-form/filter-form";
import { Button, makeStyles } from "@material-ui/core";
import logOut from "../img/logOut.png"
const useStyles = makeStyles(({
    btn:{
      float: "right",
      padding: "3px",
    },
    image:{
      width: "25px",
    }
  }))
function ManagerPage() {
    const classes = useStyles();
    return (
        <Paper>
            <a href="http://localhost:4000/api/logOut"><Button color="primary" variant="outlined" sizes="small" className={classes.btn}><img className={classes.image} src={logOut} alt="logOut"/></Button></a>
            <FilterForm/>
        </Paper>
    );
}

export default ManagerPage;
