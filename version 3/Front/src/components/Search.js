import React from 'react'
import {Form, Button} from "react-bootstrap"
function Search({searchQuery, setSearchQuery}) {
    return (
        <Form.Group controlId="formGridAddress1">
            <Form.Label>search</Form.Label>
            <Form.Control value={searchQuery} placeholder="search..." onChange={e => setSearchQuery(e.target.value)} />
        </Form.Group>
    )
}

export default Search
