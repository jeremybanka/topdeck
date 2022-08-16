import { createContext } from "react"
import io from "socket.io-client"

export const socket = io(`http://selena.local:4000/`)
export const SocketContext = createContext(socket)
