import {
    makeStyles,
  } from "@material-ui/core";
  
  const useStyles = makeStyles({
    headerPage: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
    },
    input: {
      width: '100px',
    },
    iconButton: {
      padding: 10,
    },
    drawer: {
      width: '350px',
      paddingTop: '20px',
      paddingLeft: '18px',
    },
    submitButton: {
      position: 'absolute',
      width: '150px',
      left: '58px',
      bottom: '10px',
    },
    resetButton: {
      position: 'absolute',
      width: '100px',
      left: '218px',
      bottom: '10px',
    },
    formControl: {
      width: '340px',
      height: '500px',
      marginTop: '10px',
      minWidth: 120,
      paddingTop:'5px',
    },
    select: {
      minHeight: '200px',
    }
  });
  
  export default useStyles;
  