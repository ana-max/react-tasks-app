import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'relative',
    height: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formItem: {
    marginTop: '25px',
  },
  button: {
    position: 'absolute',
    bottom: '20px',
    width: '100%',
  },
  formControl: {
    marginTop: '50px',
    minWidth: 120,
  },
}));

export default useStyles;
