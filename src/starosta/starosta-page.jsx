import React from "react";
import FilterForm from "./table/starosta-table";
import Paper from "@material-ui/core/Paper";
import logOut from "../img/logOut.png"
import { Button, makeStyles } from "@material-ui/core";
const useStyles = makeStyles(({
    item:{
      background: "linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)",
      backgroundSize: "15px 15px",
      backgroundPosition: "center center"
    },
    btn:{
      float: "right",
      padding: "3px",
    },
    image:{
      width: "25px",
    }
  }))
function StarostaPage(prop) {
    const classes = useStyles();
    return (
        <Paper className={classes.item}>
            <a href="http://localhost:4000/api/logOut"><Button color="primary" variant="outlined" sizes="small" className={classes.btn}><img className={classes.image} src={logOut} alt="logOut"/></Button></a>
            <FilterForm group={prop.groupPrepod}/>
        </Paper>
    );
}

export default StarostaPage;
