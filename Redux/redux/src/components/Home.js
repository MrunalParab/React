import React,{useEffect} from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

import { Table, TableHead, TableRow, TablePagination, TableCell, TableBody,Paper,TableContainer,styled,
    makeStyles, ButtonGroup,Button} from "@material-ui/core";

import {useSelector,useDispatch} from "react-redux";
import { deleteUsers, loadUsers } from '../redux/actions';
import { useHistory} from "react-router-dom";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: theme.palette.common.black,
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));
  
//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     '&:nth-of-type(odd)': {
//       backgroundColor: theme.palette.action.hover,
//     },
//     // hide last border
//     '&:last-child td, &:last-child th': {
//       border: 0,
//     },
//   }));
  
  
  
  

  const useStyle = makeStyles({
      table:{
          marginTop:50,
          minWidth:900,
      },
      head:{
        backgroundColor:"#bbdefb",
        
      }
  })

  const buttonStyle = makeStyles({
    button:{
        marginTop:20,
        marginLeft:500,
    }
})
  
 
const Home = () => {
    const classes = useStyle();
   const buttonstyle = buttonStyle();

    let dispatch = useDispatch();
    let history=useHistory();
    const {users} = useSelector(state => state.data)
    useEffect(() =>{
        dispatch(loadUsers());
    },[])

    const handleDelete =(id) => {
      if(window.confirm("Are you sure you want to delete the entry ?")) {
        dispatch(deleteUsers(id))
      }
    }
  return (
    <div>
      <div className={buttonstyle.button}>
        <Button variant="contained" color="primary" onClick={() => history.push("/adduser")}>Add User</Button>
      </div>
    <TableContainer component={Paper}>
      <Table   className={classes.table}sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead className={classes.head}>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.map((user) => (
            <TableRow>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.contact}</TableCell>
              <TableCell>
                <ButtonGroup variant="contained"  aria-label="contained primary button group">
                  <Button color="primary" onClick={() => history.push(`/edituser/${user.id}`)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(user.id)}>Delete</Button>
                </ButtonGroup>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default Home