//Styling with material-ui:
import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2)//'theme' is used to create consistency throughout the app - in this case consistent spacing between elements.
        },
        title: {
          flexGrow: 1,
          textDecoration:'none',
          marginRight:'50px',
          color:'white'
        },
        link: {
          textDecoration:'none',
          marginRight:'50px',
          color:"white"
        },
        toolbar: {
          display: 'flex',
          justifyContent: 'flex-end',
          width: '400px'
        },
        profile: {
          display: 'flex',
          justifyContent: 'space-between',
          width: '170px',
          marginRight:'10px'
        },
        tab: {
          marginRight:"3px"
        }
    }));