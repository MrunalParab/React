import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableHead, TableRow, TablePagination, TableCell, TableBody, makeStyles, Button } from "@material-ui/core";
import { Link } from "react-router-dom"
import { getUsers, deleteUser } from "./Api";
import { MDBPagination, MDBPaginationItem, MDBPaginationLink, MDBBtn } from "mdb-react-ui-kit";


const useStyles = makeStyles({
  table: {
    width: '90%',
    margin: '50px 0 0 50px'
  },
  thead: {
    '& > *': {
      fontSize: 20,
      background: 'lightBlue',
      color: 'black',

    }
  },
  row: {
    '& > *': {
      fontSize: 50
    }
  }
})
const AllUsers = () => {

  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageLimit] = useState(4);
  const [sortFilterValue,setSortFilterValue] = useState("");
  const [operation,setOperation] = useState("");

  const sortOptions = ["id", "name", "address", "email"];

  useEffect(() => {
    loadUsersData(0, 4, 0);

  }, []);

  const loadUsersData = async (start, end, increase,optType=null,filterOrSortValue) => {
    switch(optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
      .get(`http://localhost:5000/users?q=${value}&_start=${start}&_end=${end}`)
      .then((response) => {
        setData(response.data);
        setCurrentPage(currentPage + increase);
       
      })
      .catch((err) => console.log(err));
    case "sort":
      setOperation(optType);
      setSortFilterValue(filterOrSortValue);
      return await axios
      .get(`http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`)
      .then((response) => {
        setData(response.data);
        setCurrentPage(currentPage + increase);
      })
      .catch((err) => console.log(err));
    default:
      return await axios
      .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
      .then((response) => {
        setData(response.data);
        setCurrentPage(currentPage  + increase);
      })
      .catch((err) => console.log(err));
    }
    
  };

  console.log("data", data);

  const classes = useStyles();


  const deleteUserData = async (id) => {
    await deleteUser(id);
    loadUsersData();
  }


  const handleReset = () => {
    loadUsersData(0, 4, 0);

  };
  const handleSearch = async (e) => {
    e.preventDefault();
    loadUsersData(0,4,0, "search")
    // return await axios
    //   .get(`http://localhost:5000/users?q=${value}`)
    //   .then((response) => {
    //     setData(response.data);
    //     setValue("");
    //   })
    //   .catch((err) => console.log(err));
  };



  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0,4,0,"sort",value)
    // return await axios
    //   .get(`http://localhost:5000/users?_sort=${value}&_order=asc`)
    //   .then((response) => {
    //     setData(response.data);
    //   })
    //   .catch((err) => console.log(err));
  };

  const renderPagination = () => {
    if(data.length < 4 && currentPage===0) return null;
    if (currentPage === 0) {
      return (
        <MDBPagination className="mb-0">
          
            <MDBPaginationLink>1</MDBPaginationLink> &nbsp;&nbsp;
          
            <Button variant="contained" color="primary" onClick={() => loadUsersData(4, 8, 1,operation,sortFilterValue)}>Next</Button>
          


        </MDBPagination>
      );
    }
    else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination className="mb-0">
          
            <Button variant="contained" color="primary" onClick={() =>
              loadUsersData((currentPage - 1) * 4, currentPage * 4, -1,operation,sortFilterValue)}>Previous</Button>
            &nbsp;&nbsp;
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
            &nbsp;&nbsp;
            <Button variant="contained" color="primary" onClick={() =>
              loadUsersData((currentPage + 1) * 4, (currentPage + 2) * 4, 1,operation,sortFilterValue)}>Next</Button>
          
        </MDBPagination>
      );
    }
    else {
      return (
        <MDBPagination className="mb-0">
          <Button variant="contained" color="primary" onClick={() => loadUsersData(4, 8, -1,operation,sortFilterValue)}>Previous</Button>
          <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink> &nbsp;&nbsp;
        </MDBPagination>
      )
    }
  }


  return (
    <div>
      <form style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center"
      }}
        className="d-flex input-group w-auto"
        onSubmit={handleSearch}>

        <input
          type="text"
          className="form-control"
          placeholder="Search"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        &nbsp;&nbsp;
        <Button variant="contained" type="submit" color="">Search</Button> &nbsp;
        <Button variant="contained" color="info" onClick={() => handleReset()}>Reset</Button>
      </form>




      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.thead}>
            <TableCell>ID</TableCell>
            <TableCell>NAME</TableCell>
            <TableCell>EMAIL</TableCell>
            <TableCell>ADDRESS</TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>

        {

          data.map((item, index) => (
            <TableBody key={index}>
              <TableRow>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" style={{ marginRight: "15px" }}
                    component={Link} to={`/edit/${item.id}`}> Edit</Button>
                  <Button variant="contained" color="secondary" onClick={() => deleteUserData(item.id)} >Delete</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        }

      </Table>
      <div style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center"
        }}>
          {renderPagination()}
    </div>




      <TableCell size="20">
        <h5>Sort By</h5>
        <select
          style={{ width: "50%", borderRadius: "2px", height: "35px" }}
          onChange={handleSort}
          value={sortValue}>
          <option>Please Select Value</option>
          {sortOptions.map((item, index) => (
            <option value={item} key={index}>{item}</option>
          ))}
        </select>
      </TableCell>


    </div>
  );

}

export default AllUsers;