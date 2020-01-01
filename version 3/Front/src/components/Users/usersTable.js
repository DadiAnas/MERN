import React,{useState} from 'react'
import { Table, Button } from "react-bootstrap"
import moment from "moment"
import {useHistory} from "react-router-dom"
function UsersTable({ users, cbDelete, cbSortBy }) {
    const history = useHistory()
    const [sort,setSort] = useState({gender:1,dob:1})
        return (

        <Table striped bordered hover >
            <thead>
                <tr>
                    <th>photo</th>
                    <th>UserName</th>
                    <th onClick={()=>{
                        setSort({...sort,gender: sort.gender == 1 ? -1 : 1})
                        cbSortBy(sort)
                    }}>gender</th>
                    <th onClick={()=>{
                        setSort({...sort,dob: sort.dob == 1 ? -1 : 1})
                        cbSortBy(sort)
                    }}>dob</th>
                    <th>news</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, i) => (
                <tr key={i}>
                    <td> <img src={user.photo}/></td>
                    <td>{user.username}</td>
                    <td>{user.gender}</td>
                    <td>{moment(user.dob).format("MM-DD-YYYY")}</td>
                    <td>{user.news?"subscribed" : "not subscribed"}</td>
                    <td>{user.email}</td>
                    <td style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Button variant="primary" onClick={() => history.push(`/show/${user._id}`)}>
                            show
                        </Button>
                        <Button variant="danger" onClick={() => cbDelete(user._id)}>
                            delete
                        </Button>
                        <Button variant="warning" onClick={() => history.push(`/update/${user._id}`)}>
                            Update
                        </Button>
                      
                    </td>
                </tr>))}
            </tbody>
        </Table>
    )
}

export default UsersTable
