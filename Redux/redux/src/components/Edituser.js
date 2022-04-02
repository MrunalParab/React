import React,{useState,useEffect} from 'react'
import { TextField,makeStyles,Button} from "@material-ui/core";
import { useHistory,useParams} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import { addUser, getSingleUser ,updateUser} from '../redux/actions';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '45ch',
      marginLeft:"400px"
    }
  },
}));


const Edituser = () => {
    const classes = useStyles();
   
    const[state,setState] = useState({
        id:"",
        name:"",
        email:"",
        address:"",
        contact:"",
    });

    const{name,email,address,contact} = state;
    let history=useHistory();
    let dispatch=useDispatch();
    const [error,setError] = useState("");
    let {id}  = useParams();
    const {user} = useSelector(state => state.data);

    useEffect(() => {
        dispatch(getSingleUser(id));
    },[]);

    useEffect(() => {
        if(user) {
            setState({...user})
        }
    },[user])

    const handleInputChange = (e) => {
        let {name,value} = e.target;
        setState({...state,[name]:value});
      }

    const handleSubmit = () => {
       
            dispatch(updateUser(state,id));
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
            <h2  style={{marginLeft:"550px"}}>Edit User</h2>
            {error && <h3 style={{color:"red"}}>{error}</h3>}
            <TextField id="standard-basic" label="ID" value={id || ""} type="number"
                name="id"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Name" value={name || ""} type="text"
                name="name"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Email" value={email || ""} type="email"
                name="email"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Address" value={address || ""} type="text"
                name="address"
                onChange={handleInputChange}/> <br/>
            <TextField id="standard-basic" label="Contact" value={contact || ""} type="number"
                name="contact"
                onChange={handleInputChange}/> <br/>
            <Button 
                style={{width:"100px",marginLeft:"550px"}}
                variant="contained" 
                color="primary"
                type="submit">
                Submit
            </Button>
        </form>
    </div>
    
  )
}

export default Edituser