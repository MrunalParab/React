import axios from "axios"

export const  addUser = async(user) => {
    return await axios.post("http://localhost:5000/users",user);
}


export const getUsers = async(id)=> {
    id=id || ' ' ;
    return await axios.get(`http://localhost:5000/users/${id}`);
}

export const editUser = async (id,user) => {
    return await axios.put(`http://localhost:5000/users/${id}`,user);
}

export const deleteUser=async(id) => {
    return await axios.delete(`http://localhost:5000/users/${id}`);
}
