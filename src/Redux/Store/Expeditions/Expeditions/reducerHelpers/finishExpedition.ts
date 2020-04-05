import { loop, Cmd } from 'redux-loop'
import { set as setToDb } from 'idb-keyval'

import * as helpers from '../helpers'
import { State } from '../types'
import { actions } from '../actions'

import { EXPEDITIONS_DB_KEY } from './helpers'

export const finishExpedition = (
  state: State,
  action: ReturnType<typeof actions.finishExpedition>
) => {
  const { battle } = action.payload
  const oldExpedition = state.expeditions[battle.expeditionId]
  const branches = oldExpedition.sequence.branches

  const updatedBranches = {
    ...branches,
    [battle.id]: {
      ...battle,
      status: 'finished',
    },
  }

  const battleScore = helpers.calcBattleScore(battle.tries)

  const newState = {
    ...state,
    expeditions: {
      ...state.expeditions,
      [battle.expeditionId]: {
        ...oldExpedition,
        score: oldExpedition.score + battleScore,
        sequence: {
          ...oldExpedition.sequence,
          branches: updatedBranches,
        },
        finished: true,
      },
    },
  }

  return loop(
    newState,
    Cmd.run(setToDb, {
      args: [EXPEDITIONS_DB_KEY, newState],
      successActionCreator: actions.setToDBSuccessful,
      failActionCreator: actions.setToDBFailed,
    })
  )
}
