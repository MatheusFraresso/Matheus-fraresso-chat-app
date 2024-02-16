import React from "react"
import { Container, Navbar } from "react-bootstrap"

export default function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>Matheus Fraresso Chat App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}
