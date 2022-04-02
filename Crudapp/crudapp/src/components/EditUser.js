import { FormControl, FormGroup, InputLabel,Input, Button, makeStyles, Typography} from "@material-ui/core"
import react, { useState,useEffect } from "react";
import { useHistory,useParams } from "react-router-dom";
import { editUser,getUsers } from "./Api";

const useStyle = makeStyles ({
  container: {
    width: "50%",
    margin:"5% 0 0 25%",
    '& > *' : {
      marginTop:20
    }
  },

  button:{
    width : "25%",
    marginLeft:"200px",
    backgroundColor:"lightBlue",
    fontSize :"15px"
  }
})


const InitialValues = {
  id:"",
  name:"",
  email:"",
  address:""
}
const EditUser = () => {

  const [user,setUser] = useState(InitialValues);
  const {name,email,address} = user;
  const {id} = useParams();
  let history=useHistory();

  useEffect(() => {
      loadUserDetails();
  }, []);

  const loadUserDetails = async() => {
      const response = await getUsers(id);
      setUser(response.data);
  }
  
  const classes =useStyle();

  const onValueChange = (e) => {
    console.log(e.target.value);
    setUser({...user, [e.target.name]: e.target.value})
  }

  const editUserDetails = async() => {
    const response = await editUser(id, user);
    history.push('/all');
}

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4" style={{textAlign:"center"}}>Edit User</Typography>
      <FormControl>
        <InputLabel>ID</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="id" value={id} id="my-input"/>
      </FormControl>
      <FormControl>
        <InputLabel>NAME</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="name" value={name} id="my-input"/>
      </FormControl>
      <FormControl>
        <InputLabel>EMAIL</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="email" value={email} id="my-input"/>
      </FormControl>
      <FormControl>
        <InputLabel>ADDRESS</InputLabel>
        <Input onChange={(e) => onValueChange(e)} name="address" value={address} id="my-input"/>
      </FormControl>
      <Button className={classes.button} onClick={() => editUserDetails()}>Edit User</Button>
    </FormGroup>

  )
}

export default EditUser;