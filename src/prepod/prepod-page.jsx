import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Prepodform from "./prepodForm/prepod-form";


function PrepodPage(props) {
    let [group, setGroup] = useState(0);

    useEffect(() => {
        setGroup(props.groupPrepod)
    }, [props]);

    return (

        <Paper><Prepodform groupPrepod={group} /></Paper>);
}

export default PrepodPage;
