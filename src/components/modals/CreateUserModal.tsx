import React, { useState } from "react"
import { Button, Form, Modal } from "react-bootstrap"
import User from "../../models/User"
import { addUser, store } from "../../store"
import { useDispatch } from "react-redux"
import { debug } from "console"

export default function CreateUserModal() {
  const dispatch = useDispatch()
  const [show, setShow] = useState(false)
  const [userName, setUserName] = useState("")

  const handleClose = () => {
    setShow(false)
    setUserName("")
  }
  const handleShow = () => setShow(true)

  function createUser() {
    const user: User = new User(userName, [])
    dispatch(addUser(user))
    handleClose()
  }
  return (
    <>
      <Button variant="primary" size="sm" onClick={handleShow}>
        Adicionar
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar Usuário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="user-name">Nome</Form.Label>
          <Form.Control
            type="text"
            id="user-name"
            aria-describedby="passwordHelpBlock"
            onChange={(e) => setUserName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            fechar
          </Button>
          <Button variant="primary" onClick={createUser}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
