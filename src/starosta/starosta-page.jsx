import StarostaForm from "./starosta-form/starosta-form";
import { makeStyles, Paper } from "@material-ui/core";
import { useEffect, useState } from "react";
const useStyles = makeStyles(({
    item:{
      background: "linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)",
      backgroundSize: "15px 15px",
      backgroundPosition: "center center"
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
          <StarostaForm groupStarosta={group} />
    </Paper>
  );
}
export default StarostaPage;
