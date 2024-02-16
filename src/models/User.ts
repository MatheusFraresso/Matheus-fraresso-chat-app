import Message from "./Message"

export default class User {
  name: string
  messages: Array<Message>
  constructor(name: string, messages: Array<Message>) {
    this.name = name
    this.messages = messages
  }
}
