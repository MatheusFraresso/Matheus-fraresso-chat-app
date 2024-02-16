import React from "react"
import { Button, Col, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import CreateUserModal from "../components/modals/CreateUserModal"
import User from "../models/User"
import { Link } from "react-router-dom"

function Home() {
  const users = useSelector((state: any) => state.users)
  return (
    <section id="home">
      <Row className="mb-6">
        <Col xs={2}>
          <h2> Usuários:</h2>
        </Col>
        <Col xs={8}></Col>
        <Col xs={2}>
          <Button>
            {" "}
            <CreateUserModal></CreateUserModal>
          </Button>{" "}
        </Col>
      </Row>
      <Row>
        <hr></hr>
      </Row>
      <Row className="users-list">
        <ListGroup>
          {users.map((user: User) => (
            <Link to={`/user/${user.name}`} target="_blank">
              <ListGroupItem action variant="light">
                {user.name}
              </ListGroupItem>
            </Link>
          ))}
        </ListGroup>
      </Row>
    </section>
  )
}

export default Home
