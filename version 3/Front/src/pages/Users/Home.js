import React, { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import UsersTable from "../components/usersTable"

import Search from "../components/Search"
import axios from "axios"
import Mock from "../components/mock"
import Pagination from "../components/pagination"


function UsersHome() {
    const [users, setUsers] = useState([])
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(0)
    const [total, setTotal] = useState(0)
    const [sort, setSort] = useState({gender:1, dob:1})
    useEffect(() => {
        searchUsers()
    }, [page,searchQuery])



    const searchUsers = (query = {gender:1,dob:1}) => {
        let q = "gender="+query.gender+"&dob="+query.dob
            axios.get(`/users/${page}/10?search=${searchQuery}&${q}`)
                .then(result => {
                    setUsers(result.data.users)
                    setTotal(result.data.total)
                })
                .catch(err => {
                    console.log(err)
                })
        
    }
 
    const cbDelete = id => {
        console.log(id)
        axios.delete(`/users/${id}`)
            .then(result => {
                console.log(result)
                setUsers(users.filter(user => user._id != id))
            })
            .catch(err => console.log(err))
    }
    return (
        <Container style={{ padding: 50 }}>
            <Search searchQuery={searchQuery}  setSearchQuery={setSearchQuery}/>
            <UsersTable users={users}  cbSortBy ={(query)=>{searchUsers(query)}} cbDelete={cbDelete} />
            <Pagination total={total} current={page} setPage={setPage} />
            <Mock setTotal={setTotal} total={total} users={users} setUsers={setUsers} />
        </Container>
    )
}

export default UsersHome
