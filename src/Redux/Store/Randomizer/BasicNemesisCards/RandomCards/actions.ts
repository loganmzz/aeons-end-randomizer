import { createAction } from '@martin_hotell/rex-tils'

import * as types from 'types'

import { ActionTypes } from './types'

import { PlayerCount } from '../PlayerCount/types'

export const actions = {
  noOp: () => createAction('NOOP'),
  createBasicNemesisCardDeck: (
    availableCards: ReadonlyArray<types.BasicNemesisCard>,
    playerCount: PlayerCount
  ) => createAction(ActionTypes.CREATE, { availableCards, playerCount }),
}
