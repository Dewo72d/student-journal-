import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: "yellow !important",
  },
}));

const lessons = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
];

function FilterForm() {
  const classes = useStyles();
  const [lesson, setLesson] = useState(lessons[0].value);
  const hendleChange = (event) => {
    setLesson(event.target.value);
  };

  return (
    <div>
      <Paper className={classes.card}>
        <TextField type="number" id="group" label="Группа" variant="outlined" />
        <TextField id="name" label="Имя" variant="outlined" />
        <TextField
          id="lesson"
          select
          label="Пара"
          variant="outlined"
          value={lesson}
          onChange={hendleChange}
        >
          {lessons.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField type="date" id="date" variant="outlined" />
        <Button variant="contained" color="primary">
          Відправити
        </Button>
      </Paper>
    </div>
  );
}

export default FilterForm;
