import React from 'react'
import axios from "axios"
import Button from "react-bootstrap/Button"

function mock({users=[],setUsers, total,setTotal}) {
    const usersNumber = 100 - total
    const cbFetchUsers = () => {
        usersNumber >0 &&
        axios.get(`https://randomuser.me/api?results=${usersNumber}`)
        .then(result => {
            console.log(result)
            const newUsers = result.data.results.map(user => ({
                username:user.login.username,
                gender:user.gender,
                dob:user.dob.date,
                news:false,
                email:user.email,
                photo:user.picture.thumbnail
            }))
            newUsers.map(user => {
                axios.post("/users",user)
                .then(res=>{
                    setUsers(users=> users.length < 10 ? [...users,res.data]:users)
                })
                .catch(err => console.log(err))
            })
            setTotal(100)
        })
        .catch(err =>{

        })
    }
    return (
         <Button onClick={cbFetchUsers} variant="primary" disabled={usersNumber < 100}>
            mock : {usersNumber> 0 ?usersNumber:0 }
         </Button>   
    )
}

export default mock