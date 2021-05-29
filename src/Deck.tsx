/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactElement, useRef } from "react"
import { HotKeys } from "react-hotkeys"

const Card = ({ _card, subordination }): ReactElement => (
  <div
    className="card"
    css={css`
      ${subordination};
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      border: 0.1em solid #444;
      border-radius: 0.4em;
      background: white;
      height: 14em;
      width: 10em;
      box-sizing: border-box;
      > * {
        font-size: 2em;
      }
    `}
  >
    <p>{_card.content}</p>
  </div>
)

const Deck = (props: deckOptions): ReactElement => {
  const { _deck, shuffle } = props

  const deckRef = useRef<HTMLDivElement>(null)
  const focusDeck = (): void => {
    deckRef.current?.focus()
  }

  const handlers = {
    SHUFFLE: shuffle,
  }
  return (
    <HotKeys handlers={handlers}>
      <div
        ref={deckRef}
        onMouseEnter={focusDeck}
        tabIndex={0}
        css={css`
          font-size: 10px;
          display: block;
          position: relative;
          width: 10em;
          height: ${14 + 0.2 * _deck.cards.length - 0.2}em;
          max-height: 20em;
          border-radius: 0.85em;
          border: 0.4em solid #4440;
          &:focus {
            outline: none;
            border: 0.4em solid #444;
          }
        `}
      >
        {_deck.cards.map(
          (_card: card, idx: number): ReactElement => {
            const subordination = css`
              top: ${idx * 0.2}em;
              z-index: ${idx * -1};
            `
            return <Card key={idx} _card={_card} subordination={subordination} />
          }
        )}
      </div>
    </HotKeys>
  )
}

export default Deck
