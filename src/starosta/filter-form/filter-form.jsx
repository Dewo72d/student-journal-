import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import StarostaTable from "../table/starosta-table";
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
      flexWrap:"wrap",
      "& .MuiOutlinedInput-input": {
        fontSize: 18,
        hight: 20,
        marginTop: 10
      },
      "& input#date":{
        marginTop: 10,
      },
      "& Button": {
        fontSize: 10,
        marginTop: 10
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
  const [selection, setSelection] = useState([]);
  const hendleChange = (event) => {
    setLesson(event.target.value);
  };

  const onSubmit = async (data) => {
    // Берёт значение с формы и конвертирует их в нужный формат для отправки на сервер
    let formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    //--------------------------------
    //Отправка формы в бд на выборку
    await fetch("http://localhost:4000/api/setstudents", {
      method: "POST",
      mode: "cors",
      body: formData,
    })
      .then(async (res) => {
        return await res.json();
      })
      .then(async (res) => {
        return await setSelection(res);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  };
  //--------------------------------
  const onErr = (err) => console.error(err);

  return (
    <div>
      <StarostaTable selection={selection}/>
      <form onSubmit={handleSubmit(onSubmit, onErr)} className={classes.card}>
        <div>
          <label>Група</label>
          <input ref={register} type="number" name="group" />
        </div>
        <Button variant="contained" color="primary" type="submit">
          Відправити
        </Button>
      </form>
    </div>
  );
}

export default FilterForm;
