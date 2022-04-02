import { Typography } from '@material-ui/core'
import React, { Component } from 'react'
import home from "../Images/home.jpg"

export class UserData extends Component {
  render() {
    return (
      <div style={{background:"lightBlue", height:"100vh"}}>
        <Typography variant="h4" style={{textAlign:"center"}}>< br></br>USER DATA MANAGEMENT SYSTEM</Typography>
        <img src={home} style={{width:"50%" ,alignContent:"center",margin:"90px 0 0 25%"}}></img>
      </div>
    )
  }
}

export default UserData