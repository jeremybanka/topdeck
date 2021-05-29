/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { Dispatch, ReactElement, SetStateAction, useState } from "react"
import ReactInputPosition, {
  defaultState,
  MOUSE_ACTIVATION,
  // eslint-disable-next-line import/no-extraneous-dependencies
} from "react-input-position-2"
import { GlobalHotKeys, HotKeys } from "react-hotkeys"
import { Deck as _Deck, Card as _Card } from "./lab/topdeck/src/topdeck"
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

const App = (): ReactElement => {
  const [testDeck, shuffleTest] = useDeck()
  const [testDeck2, shuffleTest2] = useDeck()

  const [inputPosition, setInputPosition] = useState(defaultState)

  const onUpdate = stateChanges => {
    if (stateChanges.active) console.log(stateChanges)

    if (!stateChanges.mouseDown) {
      setInputPosition(stateChanges)
    }
  }

  const globalHandlers = {}

  return (
    <>
      <GlobalHotKeys keyMap={globalKeyMap} handlers={globalHandlers} />
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
            `}
          >
            <Deck _deck={testDeck} shuffle={shuffleTest} />
            <Deck _deck={testDeck2} shuffle={shuffleTest2} />
          </div>
        </HotKeys>
      </ReactInputPosition>
    </>
  )
}

export default App
