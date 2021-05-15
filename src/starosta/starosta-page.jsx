import React from "react";
import FilterForm from "./table/starosta-table";
import Paper from "@material-ui/core/Paper";
import logOut from "../img/logOut.png"
import { makeStyles } from "@material-ui/core";
const useStyles = makeStyles(({
    image:{
      width: "25px",
      float: "right",
      padding: "1em"
    }
  }))
function StarostaPage(prop) {
    const classes = useStyles();
    return (
        <Paper>
            <a href="http://localhost:4000/api/logOut"><img className={classes.image} src={logOut} alt="logOut"/></a>
            <FilterForm group={prop.groupPrepod}/>
        </Paper>
    );
}

export default StarostaPage;
