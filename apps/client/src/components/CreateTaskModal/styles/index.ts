import {
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    height: 500,
    left: 'calc(50% - 300px)',
    top: 'calc(50% - 250px)',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default useStyles;
