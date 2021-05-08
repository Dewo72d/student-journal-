import { Button, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Prepodform from "./prepodForm/prepod-form";
import logOut from "../img/logOut.png";

const useStyles = makeStyles(({
    btn:{
      float: "right",
      padding: "3px",
    },
    image:{
      width: "25px",
    }
  }))
function PrepodPage(props) {
    const classes = useStyles();
    let [group, setGroup] = useState(0);

    useEffect(() => {
        setGroup(props.groupPrepod)
    }, [props]);

    return (

        <Paper>
            <a href="http://localhost:4000/api/logOut"><Button color="primary" variant="outlined" sizes="small" className={classes.btn}><img className={classes.image} src={logOut} alt="logOut"/></Button></a>
            <Prepodform groupPrepod={group}/>
        </Paper>);
}

export default PrepodPage;
