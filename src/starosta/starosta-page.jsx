import StarostaForm from "./filter-form/starosta-form";
import { makeStyles, Paper } from "@material-ui/core";
const useStyles = makeStyles(({
    item:{
      background: "linear-gradient( #bbb, transparent 1px), linear-gradient( 90deg, #bbb, transparent 1px)",
      backgroundSize: "15px 15px",
      backgroundPosition: "center center"
    }
  }))
function StarostaPage(props) {
  const classes = useStyles();
  return (
    <Paper className={classes.item}> 
          <StarostaForm groupStarosta={props.groupStarosta} />
    </Paper>
  );
}
export default StarostaPage;
