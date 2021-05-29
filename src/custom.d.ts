/* eslint-disable quotes */

// type Privacy = `public` | `hidden` | `secret`

declare interface card {
  id: string
  content: unknown
  ownedBy: string | null
  livesIn: string | null
  privacy: string
  rotated: number
}

declare interface deck {
  id: string
  cards: card[]
  ownedBy: string | null
  livesIn: string | null
  privacy: string
  rotated: number
  shuffle: VoidFunction
}

declare interface deckOptions {
  _deck: deck
  shuffle: Dispatch<SetStateAction<undefined>>
  usePosition?: bool
}

declare class ReactInputPosition {
  render(): JSX.Element
}

declare module "*.svg" {
  import React = require("react")

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
