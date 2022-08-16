/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import ReactInputPosition, {
  defaultState,
  MOUSE_ACTIVATION,
} from "react-mouse-position"
import { GlobalHotKeys, HotKeys } from "react-hotkeys"
import { socket, SocketContext } from "./services/socket"
import { Deck as _Deck, Card as _Card } from "./Game/topdeck"
import Radikal from "./Radikal"
import Deck from "./Deck"

const globalKeyMap = {
  SHUFFLE_AUTO: `alt+s`,
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

const FrontEndDemo = (): ReactElement => {
  const [testDeck, shuffleTest] = useDeck()
  const [inputPosition, setInputPosition] = useState(defaultState)
  const [otherPosition, setOtherPosition] = useState(defaultState)
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastMessage, setLastMessage] = useState(null)

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
      console.log(data)
      setLastMessage(data)
    })
    socket.on(`mouse`, data => {
      console.log(data)
      // setOtherPosition({ x: data, y: 0 })
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

  const globalHandlers = {}

  return (
    <>
      <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} />
      <SocketContext.Provider value={socket}>
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
          <Radikal
            actions={[`yo`, `wazzup`, `es mooi, ne?`]}
            passivePosition={otherPosition}
          />
          <HotKeys keyMap={keyMap}>
            <div
              css={css`
              display: flex;
              position: relative;
              justify-content: center;
              align-items: center;
              width: 100vw;
              height: 100vh;
            `}
            >
              <Deck _deck={testDeck} shuffle={shuffleTest} />
            </div>
            <p>Connected: {`${isConnected}`}</p>
            <p>Last message: {lastMessage || `-`}</p>
            <button onClick={sendMessage} type="button">
              Say hello!
            </button>
          </HotKeys>
        </ReactInputPosition>
      </SocketContext.Provider>
    </>
  )
}

export default FrontEndDemo
