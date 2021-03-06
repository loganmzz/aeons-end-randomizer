import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { LoopReducer } from 'redux-loop'

import * as types from 'types'
import { byCost } from 'helpers'

import { createSupply } from 'Redux/helpers'

///////////
// STATE //
///////////

type Tiles = ReadonlyArray<types.ICard> | null

export type State = Readonly<{
  Tiles: Tiles
}>

export const initialState: State = {
  Tiles: null,
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  RESET = 'Supply/RandomSetup/RESET',
  CREATE = 'Supply/RandomSetup/CREATE',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  resetMarket: () => createAction(ActionTypes.RESET),
  createMarket: (
    availableCards: ReadonlyArray<types.ICard>,
    tiles: ReadonlyArray<types.Slot>
  ) => {
    const { gems, relics, spells } = createSupply(availableCards, tiles)
    const gemsByCost = gems.sort(byCost)
    const relicsByCost = relics.sort(byCost)
    const spellsByCost = spells.sort(byCost)

    return createAction(ActionTypes.CREATE, {
      supply: [...gemsByCost, ...relicsByCost, ...spellsByCost],
    })
  },
}

export type Action = ActionsUnion<typeof actions>

/////////////
// REDUCER //
/////////////

export const Reducer: LoopReducer<State, Action> = (
  state: State = initialState,
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.RESET: {
      return initialState
    }

    case ActionTypes.CREATE: {
      const { supply } = action.payload

      return {
        ...state,
        Tiles: supply,
      }
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export type RandomSetupTilesStateSlice = {
  Randomizer: {
    Supply: {
      RandomSetup: {
        Tiles: Tiles
      }
    }
  }
}

const getTiles = (state: RandomSetupTilesStateSlice) =>
  state.Randomizer.Supply.RandomSetup.Tiles

export const selectors = {
  getTiles,
}
