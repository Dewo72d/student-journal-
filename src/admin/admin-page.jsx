import React from "react";
import FilterForm from "./filter-form/filter-form";

import Paper from "@material-ui/core/Paper";
import {Accordion, AccordionDetails, AccordionSummary, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles({
    card: {
        display: "block"
    }
})

function AdminPage() {
    const classes = useStyles();
    return (
        <Paper>
            <Accordion>
                <AccordionSummary>
                    <Typography>Пошук студентів</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <FilterForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Вставка студентів</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Перевід на новий курс</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Видалення студентів</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default AdminPage;
