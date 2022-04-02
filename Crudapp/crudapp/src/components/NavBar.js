import { AppBar, makeStyles, Toolbar , Typography} from "@material-ui/core";
import { NavLink } from "react-router-dom";


const useStyle = makeStyles ({
    header:{
        background:"black"
    },
    tabs:{
        color:"white",
        textDecoration:"none",
        marginRight:"50px",
        fontSize: "20"
    }
})
const NavBar =() => {

    const classes = useStyle();

    return (
        <AppBar position="static" className={classes.header}>
            <Toolbar>
                <NavLink className={classes.tabs} to ="./" exact>USER DATA</NavLink>
                <NavLink className={classes.tabs}to="/add" exact>ADD USER</NavLink>
                <NavLink className={classes.tabs} to ="/all"exact>ALL USERS</NavLink>
            </Toolbar>
        </AppBar>
    )
}


export default NavBar;