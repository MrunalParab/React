import React,{useState} from 'react'
import { TextField,makeStyles,Button} from "@material-ui/core";
import { useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addUser } from '../redux/actions';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
      marginLeft:"400px"
    }
  },
}));


const Adduser = () => {
    const classes = useStyles();
   
    const[state,setState] = useState({
        id:"",
        name:"",
        email:"",
        address:"",
        contact:"",
    });

    const{id,name,email,address,contact} = state;
    let history=useHistory();
    const dispatch=useDispatch();
    const [error,setError] = useState("");

    const handleInputChange = (e) => {
        let {name,value} = e.target;
        setState({...state,[name]:value});
      }

    const handleSubmit = () => {
       
            dispatch(addUser(state));
            history.push("/");
            setError("");
            
    }
  return (
    <div style={{marginTop:"100px"}}> 
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Button 
                style={{width:"100px",marginLeft:"1000px"}}
                variant="contained" 
                color="secondary"
                onClick={() => history.push("/")}>
                Go Back
        </Button>
            <h2  style={{marginLeft:"550px"}}>Add User</h2>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <TextField id="standard-basic" label="ID" value={id} type="number"
                name="id"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Name" value={name} type="text"
                name="name"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Email" value={email} type="email"
                name="email"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Address" value={address} type="text"
                name="address"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Contact" value={contact} type="number"
                name="contact"
                onChange={handleInputChange}/> <br/>
            <Button 
                style={{width:"100px",marginLeft:"550px"}}
                variant="contained" 
                color="primary"
                type="submit"
                >
                Submit
            </Button>
        </form>
    </div>
    
  )
}

export default Adduser