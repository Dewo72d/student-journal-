import StarostaForm from "./starosta-form/starosta-form";
import { Button, makeStyles, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
import logOut from "../img/logOut.png"
const useStyles = makeStyles(({
    item:{
      background: "linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)",
      backgroundSize: "15px 15px",
      backgroundPosition: "center center"
    },
    btn:{
      float: "right",
      padding: "3px",
    },
    image:{
      width: "25px",
    }
  }))
function StarostaPage(props) {
  let [group, setGroup] = useState(0);
  useEffect(() => {
      setGroup(props.groupStarosta)
  }, [props]);
  const classes = useStyles();
  return (
    <Paper className={classes.item}> 
    <a href="http://localhost:4000/api/logOut"><Button color="primary" variant="outlined" sizes="small" className={classes.btn}><img className={classes.image} src={logOut} alt="logOut"/></Button></a>
          <StarostaForm groupStarosta={group} />
    </Paper>
  );
}
export default StarostaPage;
