import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AdminNavBar(props) {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
        props.handleLogout();
        
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static">
                <Toolbar>
                <Typography>Role: Admin</Typography>
                    <Typography variant="h6" className={classes.title}>
                    <Link to='/excelupload' className="text-white" style={{ textDecoration: 'none'}}>
                            Import Data
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                    <Link to='/managecompany' className="text-white" style={{ textDecoration: 'none'}}>
                            Manage Company
                        </Link>
                    </Typography>

                    <Typography variant="h6" className={classes.title}>
                    <Link to='/manageexchange' className="text-white" style={{ textDecoration: 'none'}}>
                            Manage Stock Exchange
                        </Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                    <Link to='/ipo' className="text-white" style={{ textDecoration: 'none'}}>
                            Update IPO details
                        </Link>
                    </Typography>
                   
                    
                </Toolbar>
            </AppBar>
        </div>
    );
}