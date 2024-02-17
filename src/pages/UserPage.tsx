import React, { useEffect, useMemo, useState } from "react"
import {
  Badge,
  Card,
  Col,
  Form,
  InputGroup,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import User from "../models/User"
import Message from "../models/Message"
import { createMessage } from "../store"

export default function UserPage() {
  //Variables
  const params = useParams()
  const dispatch = useDispatch()
  const [user, setUser] = useState<User>({ name: "", messages: [] })
  const [messages, setMessages] = useState<Array<Message>>([])
  const [messageText, setMessageText] = useState<string>("")
  const [recipient, setRecipient] = useState<User>({
    name: "",
    messages: [],
  })
  /**
   * sends message containing sender, recipient and text
   *
   */
  function sendMessage() {
    const message = new Message(recipient, user, messageText)
    dispatch(createMessage(message))
    setMessageText("")
  }

  /**
   * Parses message to correctly show in DOM
   *
   * @param {Message} message
   */
  function parseMessage(message: Message) {
    if (message.sender?.name === user?.name)
      return (
        <>
          <Col xs={6}></Col>
          <Col xs={6}>
            <>
              <Badge bg="success">{message.text} </Badge>
              <span className="small-text">
                | at: {new Date(message.time).toLocaleString("pt-BR")}
              </span>
            </>
          </Col>
        </>
      )
    else
      return (
        <>
          <Col xs={6}>
            <>
              <Badge bg="info">{message.text}</Badge>
              <span className="small-text">
                | at:{new Date(message.time).toLocaleDateString("pt-BR")}
              </span>
            </>
          </Col>
          <Col xs={6}></Col>
        </>
      )
  }

  // Hooks
  const users = useSelector((state: any) => state.users)

  useEffect(() => {
    const selectedUser: User = users.find(
      (user: User) => user?.name === params?.name
    )
    setUser(selectedUser)
  }, [users, params])

  useEffect(() => {
    const sender: User = users.find((u: User) => u?.name === params?.name)
    const localRecipient: User = users.find(
      (u: User) => u?.name === recipient?.name
    )

    const sortedMessages = [
      ...(sender?.messages?.filter(
        (msg: Message) => msg.recipient?.name === localRecipient?.name
      ) || []),
      ...(localRecipient?.messages?.filter(
        (msg: Message) => msg.recipient?.name === sender?.name
      ) || []),
    ]
    sortedMessages.sort(
      (a: Message, b: Message) =>
        new Date(a.time).getTime() - new Date(b.time).getTime()
    )
    setMessages(sortedMessages)
  }, [users, recipient, params?.name])

  const otherUsers = useMemo(
    () => users.filter((user: User) => user?.name !== params?.name),
    [users, params]
  )

  if (user?.name)
    return (
      <section id="user">
        <Row>
          <Col xs={3} id="conversations">
            <Row>
              <h4>Conversas de {user?.name}:</h4>
            </Row>
            <hr></hr>
            <ListGroup>
              {otherUsers.map((user: User) => (
                <ListGroupItem
                  variant={recipient?.name === user?.name ? "success" : "info"}
                  action
                  onClick={() => setRecipient(user)}
                >
                  {user?.name}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
          <Col xs={9} id="texts">
            {!recipient?.name ? (
              <></>
            ) : (
              <Card className="text-center conversation-card">
                <Card.Header>
                  <h2>{recipient?.name}</h2>
                </Card.Header>
                <Card.Body>
                  <div className="previous-texts">
                    {messages.map((message: Message) => (
                      <Row>{parseMessage(message)}</Row>
                    ))}
                  </div>
                  <hr></hr>
                  <div className="input-text">
                    <Row>
                      <InputGroup>
                        <InputGroup.Text>Sua Mensagem</InputGroup.Text>
                        <Form.Control
                          as="textarea"
                          aria-label="With textarea"
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                        />
                        <InputGroup.Text
                          className="send-icon"
                          onClick={() => sendMessage()}
                        >
                          &#10147;
                        </InputGroup.Text>
                      </InputGroup>
                    </Row>
                  </div>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </section>
    )
  else return <h1> Ocorreu um erro</h1>
}
