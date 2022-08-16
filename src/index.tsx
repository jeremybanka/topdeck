import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import { GlobalHotKeys } from "react-hotkeys"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { socket, SocketContext } from "./services/socket"

const globalKeyMap = {
  SHUFFLE_AUTO: `alt+s`,
}
const globalHandlers = {}

ReactDOM.render(
  <React.StrictMode>
    <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} />
    <SocketContext.Provider value={socket}>
      <App />
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById(`root`)
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
