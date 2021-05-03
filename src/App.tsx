/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { ReactElement } from "react"
import { Deck as _Deck, Card as _Card } from "./lab/topdeck/src/topdeck"

const _deck = new _Deck()
for (let i = 0; i < 20; i++) {
  const _card = new _Card(i)
  // console.log(card)
  _deck.add(_card)
  // console.log(myDeck.cards)
}

console.log([..._deck.cards])
_deck.shuffle()
console.log(_deck.cards)

const Card = ({ _card, subordination }): ReactElement => (
  <div
    className="card"
    css={css`
      ${subordination};
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      border: 1px solid black;
      background: white;
      height: 70px;
      width: 50px;
    `}
  >
    {_card.content}
  </div>
)

const Deck = ({ _deck }): ReactElement => (
  <div
    css={css`
      display: block;
      position: relative;
      width: 50px;
      height: ${70 + 2 * _deck.cards.length}px;
    `}
  >
    {_deck.cards.map(
      (_card: Record<string, unknown>, idx: number): ReactElement => {
        const subordination = css`
          top: ${idx * 2}px;
          z-index: ${idx * -1};
        `
        return <Card key={idx} _card={_card} subordination={subordination} />
      }
    )}
  </div>
)

const App = (): ReactElement => (
  <div
    css={css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100vw;
      height: 100vh;
    `}
  >
    <Deck _deck={_deck} />
  </div>
)

export default App
