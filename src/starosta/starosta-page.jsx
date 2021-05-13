import React from "react";
import FilterForm from "./table/starosta-table";
import Paper from "@material-ui/core/Paper";

function StarostaPage(prop) {
    return (
        <Paper>
            <FilterForm group={prop.groupPrepod}/>
        </Paper>
    );
}

export default StarostaPage;
