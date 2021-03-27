import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function App() {
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/test", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setResult(res);
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Button
        type="button"
        method="POST"
        variant="contained"
        color="primary"
        onClick={() => {}}
      >
        submit
      </Button>

      <div>
        <ul>
          {result.map(res => (
            <li key={res.id}>{res.fullname}</li>
          ))}
        </ul>
        </div>
    </div>
  );
}

export default App;
