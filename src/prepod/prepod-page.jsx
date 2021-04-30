import React, {useEffect, useState} from "react";
import Perpodform from "./prepodForm/prepod-form";


function PrepodPage(props) {
let [group, setGroup] = useState(0);

    useEffect(() => {
        setGroup(props.groupPrepod)
    }, [props]);

    return (<Perpodform groupPrepod={group}/>);
}

export default PrepodPage;
