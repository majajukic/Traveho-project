import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    marginTop:90
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '20px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop:10,
    backgroundColor:'#3f51b5'
  },
  buttonClear: {
    backgroundColor:'#FF5018'
  }
}));