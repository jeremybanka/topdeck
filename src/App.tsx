/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react"
import ReactInputPosition, {
  defaultState,
  MOUSE_ACTIVATION,
} from "react-mouse-position"
import { HotKeys } from "react-hotkeys"
import { Deck as _Deck, Card as _Card } from "./Game/topdeck"
import Radikal from "./Radikal"
import { socket } from "./services/socket"

type event = {
  data?: Record<string, string>
  actorId?: string
  targets?: Record<string, string>
  type: string
  id: string
}

const keyMap = {
  SHUFFLE: `s`,
}

const useDeck = (): [deck, Dispatch<SetStateAction<deck>>] => {
  const newDeck = (): deck => {
    const _deck = new _Deck()
    for (let i = 0; i < 20; i++) {
      const _card = new _Card(i)
      _deck.add(_card)
    }
    return _deck
  }

  const [current, set] = useState(newDeck())

  const shuffle = () => {
    const clone: deck = new _Deck({ ...current })
    clone.shuffle()
    set(clone)
  }
  return [current, shuffle]
}

const App = (): ReactElement => {
  const [actionInputText, setActionInputText] = useState(`INIT`)
  const [inputPosition, setInputPosition] = useState(defaultState)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const emptyEvents: event[] = []
  const [eventLog, setEventLog] = useState(emptyEvents)
  const [eventIdx, setEventIdx] = useState(0)
  const [events, setEvents] = useState(emptyEvents)

  const incrementEventIdx = useCallback(async () => {
    if (eventLog.length >= eventIdx + 1) {
      console.log(eventIdx, eventLog[eventIdx])
      setEventIdx(eventIdx + 1)
      setEvents([...events, eventLog[eventIdx]])
    }
  }, [eventIdx, eventLog, events])

  useEffect(() => {
    const timerId = setInterval(incrementEventIdx, 100)
    return () => clearInterval(timerId)
  }, [incrementEventIdx])

  useEffect(() => {
    socket.on(`connect`, () => {
      setIsConnected(true)
      console.log(`connect ${socket.id} on ${window.location.hostname}`)
      socket.emit(`authentication`, {
        token: `banka`,
      })
    })
    socket.on(`disconnect`, reason => {
      console.log(reason)
      setIsConnected(false)
    })
    socket.on(`unauthorized`, reason => {
      console.log(`Unauthorized:`, reason)

      socket.disconnect()
    })
    socket.on(`message`, data => {
      // console.log(event)
      setEventLog(data)
    })
    socket.on(`mouse`, data => {
      console.log(data)
      // setOtherPosition({ x: data, y: 0 })
    })
    socket.on(`imperative`, data => {
      console.log(`imperative`, data)
    })
    return () => {
      socket.off(`connect`)
      socket.off(`disconnect`)
      socket.off(`message`)
    }
  })

  const sendMessage = () => {
    console.log(`run sendMessage`)
    socket.emit(`hello!`, JSON.stringify(inputPosition))
  }

  const onUpdate = stateChanges => {
    socket.emit(`mouse`, JSON.stringify(inputPosition))
    if (stateChanges.active) console.log(stateChanges)
    if (!stateChanges.mouseDown) {
      setInputPosition(stateChanges)
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setActionInputText(value)
  }
  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    socket.emit(`actionRequest`, { type: actionInputText })
  }

  return (
    <ReactInputPosition
      overrideState={inputPosition}
      onUpdate={onUpdate}
      mouseActivationMethod={MOUSE_ACTIVATION.RIGHT_CLICK}
      trackPassivePosition
      centerItemOnLoad
      css={css`
          height: 100vh;
          width: 100vw;
          position: absolute;
          top: 0;
          bottom: 0;
          font-family: Charter;
        `}
    >
      <Radikal actions={[`yo`, `wazzup`, `es mooi, ne?`]} usePosition />
      <HotKeys keyMap={keyMap}>
        <div
          css={css`
              display: flex;
              position: relative;
              justify-content: center;
              align-items: center;
              width: 100vw;
              height: 100vh;
              > * {
                display: flex;
                flex-direction: column;
                position: relative;
                justify-content: center;
                align-items: center;
              }
            `}
        >
          <div>
            {events.map(event => (
              <div key={event.id}>
                {event.type}
              </div>
            ))}
          </div>
          <div>
            <p>Connected: {`${isConnected}`}</p>
            <button onClick={sendMessage} type="button">
              Say hello!
            </button>
          </div>
          <form onSubmit={e => onSubmit(e)}>
            <input onChange={onChange} defaultValue="INIT" />
            <button type="submit">Go</button>
          </form>
        </div>
      </HotKeys>
    </ReactInputPosition>
  )
}

export default App
