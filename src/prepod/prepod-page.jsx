import React, {useEffect, useState} from "react";
import Prepodform from "./prepodForm/prepod-form";


function PrepodPage(props) {
let [group, setGroup] = useState(0);

    useEffect(() => {
        setGroup(props.groupPrepod)
    }, [props]);

    return (<Prepodform groupPrepod={group}/>);
}

export default PrepodPage;
