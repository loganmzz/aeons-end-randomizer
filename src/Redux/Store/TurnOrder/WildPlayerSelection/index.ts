import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'
import { createSelector } from 'reselect'
import { LoopReducer, loop, Cmd } from 'redux-loop'
import { get as getFromDb, set as setToDb } from 'idb-keyval'

import { RootState } from 'Redux/Store'
import * as types from 'types'
import { TURNORDERCARDS } from 'config/turnOrderSetups'

export const TURNORDER_WILDPLAYER_DB_KEY = 'turnOrderWildPlayer-2.0'

/////////////
// HELPERS //
/////////////

const newStateWithDBWrite = (newState: State) => {
  return loop(
    newState,
    Cmd.run(setToDb, {
      args: [TURNORDER_WILDPLAYER_DB_KEY, newState],
      successActionCreator: actions.setTurnOrderToDbSuccess,
      failActionCreator: actions.setTurnOrderToDbFailure,
    })
  )
}

///////////
// STATE //
///////////

export type State = {
  mode: {
    id: string
    turnOrderCards: {
      [id: string]: types.ITurnOrderCard
    }
    playersChosen: string[]
  }
}

export const initialState: State = {
  mode: {
    id: 'wild-token',
    turnOrderCards: {
      'player1-1': TURNORDERCARDS['player1-1'],
      'player2-1': TURNORDERCARDS['player2-1'],
      'player3-1': TURNORDERCARDS['player3-1'],
    },
    playersChosen: [],
  },
}

/////////////
// ACTIONS //
/////////////

export enum ActionTypes {
  INIT = 'TurnOrder/WildPlayer/INIT',
  FETCH_FROM_DB = 'TurnOrder/WildPlayer/FETCH_FROM_DB',
  FETCH_FROM_DB_SUCCESS = 'TurnOrder/WildPlayer/FETCH_FROM_DB_SUCCESS',
  FETCH_FROM_DB_FAILURE = 'TurnOrder/WildPlayer/FETCH_FROM_DB_FAILURE',
  SET_TURNORDER_TO_DB_SUCCESS = 'TurnOrder/WildPlayer/SET_TURNORDER_TO_DB_SUCCESS',
  SET_TURNORDER_TO_DB_FAILURE = 'TurnOrder/WildPlayer/SET_TURNORDER_TO_DB_FAILURE',
}

export const actions = {
  noOp: () => createAction('NOOP'),
  fetchFromDB: () => createAction(ActionTypes.FETCH_FROM_DB),
  fetchFromDBSuccessful: (state: State) =>
    createAction(ActionTypes.FETCH_FROM_DB_SUCCESS, state),
  fetchFromDBFailed: () => createAction(ActionTypes.FETCH_FROM_DB_FAILURE),
  setTurnOrderToDbSuccess: () =>
    createAction(ActionTypes.SET_TURNORDER_TO_DB_SUCCESS),
  setTurnOrderToDbFailure: () =>
    createAction(ActionTypes.SET_TURNORDER_TO_DB_FAILURE),
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
    case ActionTypes.FETCH_FROM_DB: {
      return loop(
        state,
        Cmd.run(getFromDb, {
          args: [TURNORDER_WILDPLAYER_DB_KEY],
          successActionCreator: actions.fetchFromDBSuccessful,
          failActionCreator: actions.fetchFromDBFailed,
        })
      )
    }

    case ActionTypes.FETCH_FROM_DB_SUCCESS: {
      // If the fetched state somehow is undefined just take the current state instead
      const newState = action.payload || state
      return newState
    }

    default: {
      return state
    }
  }
}

///////////////
// SELECTORS //
///////////////

export const selectors = {}
