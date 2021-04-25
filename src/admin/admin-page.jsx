import React, {useEffect, useState} from "react";
import FilterForm from "./filter-form/filter-form";
import Paper from "@material-ui/core/Paper";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
    Typography,
} from "@material-ui/core";
import AddForm from "./addStudents/add-form";
import UppdateForm from "./uppdateStudentsGroup/uppdate-form";
import DeleteForm from "./deleteStudents/delete-form";
import AddStarostaForm from "./addStarosta/add-starosta-form";
import AddPrepodPage from "./addPrepod/add-prepod-form";
import DeletePrepodForm from "./deletePrepod/delete-prepod-form";

const useStyles = makeStyles({
    card: {
        display: "block",
    },
});

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
                    <AddForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Перевід на новий курс</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <UppdateForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Видалення студентів</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <DeleteForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Добавлення старост</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <AddStarostaForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Добавлення викладача</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <AddPrepodPage/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary>
                    <Typography>Видалення викладача</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.card}>
                    <DeletePrepodForm/>
                </AccordionDetails>
            </Accordion>
        </Paper>
    );
}

export default AdminPage;
