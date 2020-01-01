import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from "react-router-dom"
import {Card,ListGroup,ListGroupItem,Button, Container, Row, Col} from "react-bootstrap"
import axios from "axios"
function UserDetails() {
    const {id} = useParams()
    const history = useHistory()
    console.log(id)
    const [user,setUser] = useState({})
    useEffect(()=>{
        axios.get(`/users/${id}`)
        .then(result => {
            setUser(result.data)
        })
    },[id])
    return (
        <Container > 
                <Button onClick={()=>history.goBack()}>go back</Button>
            <Row>
            <Col>
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={user.photo} />
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text>
                {user.email}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem>{user.dob}</ListGroupItem>
                <ListGroupItem>{user.news?"subscribed":"not subscribed"}</ListGroupItem>
                <ListGroupItem>{}</ListGroupItem>
            </ListGroup>

            </Card>
            </Col>
            </Row>
        </Container>
    )
}

export default UserDetails
