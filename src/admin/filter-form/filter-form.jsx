import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexWrap: "wrap",
      flexDirection: "column",
      justifyContent: "center",
      gap: 10,
      "& .MuiOutlinedInput-input": {
        fontSize: 16,
        marginBottom: 10,
      },
      "& Button": {
        fontSize: 20,
      },
    },

    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-between",
      "& .MuiOutlinedInput-input": {
        fontSize: 18,
        hight: 20,
      },
      "& Button": {
        fontSize: 10,
      },
    },

    [theme.breakpoints.up("md")]: {
      display: "flex",
      justifyContent: "space-between",
      "& #name": {
        width: "20rem",
      },
    },

    [theme.breakpoints.up("lg")]: {
      justifyContent: "space-evently",
      "& .MuiOutlinedInput-input": {
        fontSize: 20,
      },
      "& Button": {
        fontSize: 20,
        height: 75,
      },
      "& #name": {
        width: "25rem",
      },
    },
  },
}));

const lessons = [
  {
    value: "0",
    label: "Всі",
  },
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
  const { register, handleSubmit } = useForm(); // initialize the hook
  const [lesson, setLesson] = useState(lessons[0].value);
  const hendleChange = (event) => {
    setLesson(event.target.value);
  };

  // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
  const onSubmit = async (data) => {
    console.log(Object.keys(data));
    let formData = new FormData();

    for (let key in data) {
      formData.append(key, data[key]);
    }

    fetch("http://localhost:4000/api/selection", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then((res) => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ----------------------------
  const onErr = (err) => console.error(err);

  return (
    <form onSubmit={handleSubmit(onSubmit, onErr)} className={classes.card}>
      <input ref={register} type="number" name="group" label="Группа" />
      <input type="text" ref={register} name="name" />
      <select ref={register} name="lesson">
        {lessons.map((val) => (
          <option key={val.value} value={val.value}>
            {val.label}
          </option>
        ))}
      </select>
      <input ref={register} type="date" id="date" name="date" />
      <Button variant="contained" color="primary" type="submit">
        Відправити
      </Button>
    </form>
  );
}

export default FilterForm;
