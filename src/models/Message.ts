import User from "./User"

export default class Message {
  recipient: User
  sender: User
  text: string
  time: Date

  constructor(recipient: User, sender: User, text: string) {
    this.recipient = recipient
    this.sender = sender
    this.text = text
    this.time = new Date()
  }
}
