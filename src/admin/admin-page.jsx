import FilterForm from "./filter-form/filter-form";
import Paper from "@material-ui/core/Paper";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    makeStyles,
    Typography,
} from "@material-ui/core";
import AddForm from "./addStudents/add-form";
import UppdateForm from "./uppdateStudentsGroup/uppdate-form";
import DeleteForm from "./deleteStudents/delete-form";
import AddStarostaForm from "./addStarosta/add-starosta-form";
import AddPrepodPage from "./addPrepod/add-prepod-form";
import DeletePrepodForm from "./deletePrepod/delete-prepod-form";
import logOut from "../img/logOut.png"

const useStyles = makeStyles({
    card: {
        display: "block",
        fontFamily: "Roboto, sans-serif",
    },
    btn:{
        padding: "3px",
      },
      link:{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "1em"  
      },
      image:{
        width: "25px",
      }
});

function AdminPage() {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            <a className={classes.link} href="http://localhost:4000/api/logOut"><Button color="primary" variant="outlined" sizes="small" className={classes.btn}><img className={classes.image} src={logOut} alt="logOut"/></Button></a>
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
