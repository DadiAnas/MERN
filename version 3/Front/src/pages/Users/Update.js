import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom"
import { Form, Button } from "react-bootstrap"
import axios from "axios"
import moment from "moment"
function UsersForm() {
    const { id } = useParams()
    const history = useHistory()
    console.log(id)
    const [user, setUser] = useState({})
    useEffect(() => {
        axios.get(`/users/${id}`)
            .then(result => {
                setUser(result.data)
            })
            .catch(err => {
                console.log(err)
                history.goBack()
            })
    }, [id])
    const UserUpdate = () => {
        axios.put(`/users/${id}`, user)
            .then(result => {
                history.goBack()
            })
            .catch(err => {
                console.log(err)
                history.goBack()
            })

    }
    return (
        <div style={{ margin: 20, width: "400px" }} >
			<Button onClick={()=>history.goBack()}>Go back</Button>
            <h3>Update Form</h3>
            <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control size="md" style={{ margin: 5 }} type="text" value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="gender">
                <Form.Label>gender</Form.Label>
                <Form.Control size="md" style={{ margin: 5 }} type="text"
                    value={user.gender} onChange={(e) => setUser({ ...user, gender: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="dob">
                <Form.Label>date of birth</Form.Label>
                <Form.Control size="md" style={{ margin: 5 }} type="date"
                    value={moment(user.dob).format("YYYY-MM-DD")} onChange={(e) => setUser({ ...user, dob: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="email">
                <Form.Label>email</Form.Label>
                <Form.Control size="md" style={{ margin: 5 }} type="text"
                    value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            </Form.Group>
            <Form.Group controlId="formGroupPassword">
                <Form.Label>subscribed to newsletter</Form.Label>
                <Form.Control as="select" size="md" value={user.news} style={{ margin: 5 }} onChange={(e) => setUser({ ...user, news: e.target.value })}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                 </Form.Control>
                 </Form.Group>
            <Button variant="warning" style={{ margin: 5 }} onClick={UserUpdate}>Update</Button>
        </div>
    )
}

export default UsersForm
