/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

import { ReactElement } from "react"
import { Deck as _Deck, Card as _Card } from "./lab/topdeck/src/topdeck"

import "./App.css"

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

const Card = ({ _card }): ReactElement => (
  <div
    css={css`
      background-color: grey;
    `}
  >
    {_card.content}
  </div>
)

const App = (): ReactElement => (
  <div className="App">
    {_deck.cards.map(
      (_card: Record<string, unknown>, idx: number): ReactElement => (
        <Card key={idx} _card={_card} />
      )
    )}
  </div>
)

export default App
