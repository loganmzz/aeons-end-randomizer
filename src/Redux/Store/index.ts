import { combineReducers, reduceReducers } from 'redux-loop'
import { LoopReducer, loop, Cmd } from 'redux-loop'
import { createAction, ActionsUnion } from '@martin_hotell/rex-tils'

import * as MainContentLoading from './MainContentLoading'
import * as Settings from './Settings'
import * as Randomizer from './Randomizer'
import * as TurnOrder from './TurnOrder'
import * as Expeditions from './Expeditions'

import * as topLevelSelectors from './selectors'

export type RootState = {
  Settings: Settings.State
  MainContentLoading: MainContentLoading.State
  Randomizer: Randomizer.State
  TurnOrder: TurnOrder.State
  Expeditions: Expeditions.State
}

export enum ActionTypes {
  USER_CONFIGURATION_GET = 'ROOT/USER_CONFIGURATION_GET',
}

export const mainActions = {
  getUserConfiguration: () => createAction(ActionTypes.USER_CONFIGURATION_GET),
}

export type MainAction = ActionsUnion<typeof mainActions>

export const actions = {
  Settings: Settings.actions,
  Main: mainActions,
  TurnOrder: TurnOrder.actions,
  Randomizer: Randomizer.actions,
  Expeditions: Expeditions.actions,
}

export const selectors = {
  Settings: Settings.selectors,
  Main: {
    ContentLoading: MainContentLoading.selectors,
  },
  TurnOrder: TurnOrder.selectors,
  Randomizer: Randomizer.selectors,
  Expeditions: Expeditions.selectors,

  ...topLevelSelectors,
}

export type RootAction =
  | MainAction
  | Settings.Action
  | MainContentLoading.Action
  | Randomizer.Action
  | TurnOrder.Action
  | Expeditions.Action

export const initialState = {
  Settings: Settings.initialState,
  MainContentLoading: MainContentLoading.initialState,
  Randomizer: Randomizer.initialState,
  TurnOrder: TurnOrder.initialState,
  Expeditions: Expeditions.initialState,
}

export const MainReducer: LoopReducer<RootState, RootAction> = (
  state: RootState = initialState,
  action: RootAction
) => {
  switch (action.type) {
    case ActionTypes.USER_CONFIGURATION_GET: {
      return loop(
        state,
        Cmd.list<RootAction>([
          Cmd.action(
            actions.Settings.Expansions.SelectedExpansions.fetchFromDB()
          ),
          Cmd.action(actions.Settings.Expansions.SelectedCards.fetchFromDB()),
          Cmd.action(actions.Settings.Expansions.SelectedNemeses.fetchFromDB()),
          Cmd.action(actions.Settings.Expansions.SelectedMages.fetchFromDB()),
          Cmd.action(actions.Settings.SupplySetups.fetchFromDB()),
          Cmd.action(actions.TurnOrder.Configuration.fetchFromDB()),
          Cmd.action(actions.Expeditions.Expeditions.fetchFromDB()),
        ])
      )
    }

    default: {
      return state
    }
  }
}

export const RootReducer = reduceReducers(
  MainReducer,
  combineReducers<RootState>({
    Settings: Settings.Reducer,
    MainContentLoading: MainContentLoading.Reducer,
    Randomizer: Randomizer.Reducer,
    TurnOrder: TurnOrder.Reducer,
    Expeditions: Expeditions.Reducer,
  })
)
