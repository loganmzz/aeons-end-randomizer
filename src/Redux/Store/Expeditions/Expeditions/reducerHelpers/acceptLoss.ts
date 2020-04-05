import { loop, Cmd } from 'redux-loop'
import { set as setToDb } from 'idb-keyval'

import { State } from '../types'
import { actions } from '../actions'

import { EXPEDITIONS_DB_KEY } from './helpers'

export const acceptLoss = (
  state: State,
  action: ReturnType<typeof actions.acceptLoss>
) => {
  const { battle, banished, newSupplyIds } = action.payload

  const oldExpedition = state.expeditions[battle.expeditionId]
  const branches = oldExpedition.sequence.branches
  const oldBattle = oldExpedition.sequence.branches[battle.id]

  const updatedBranches = {
    ...branches,
    [oldBattle.id]: {
      ...oldBattle,
      status: 'before_battle',
      rewards: undefined,
    },
  }

  const newTreasureIds = battle.rewards ? battle.rewards.treasure : []
  const newMageIds =
    battle.rewards && battle.rewards.mage ? [battle.rewards.mage] : []

  const newState = {
    ...state,
    expeditions: {
      ...state.expeditions,
      [battle.expeditionId]: {
        ...oldExpedition,
        sequence: {
          ...oldExpedition.sequence,
          branches: updatedBranches,
        },
        barracks: {
          ...oldExpedition.barracks,
          treasureIds: [
            ...oldExpedition.barracks.treasureIds,
            ...newTreasureIds,
          ],
          supplyIds: newSupplyIds,
          mageIds: [...oldExpedition.barracks.mageIds, ...newMageIds],
        },
        banished: [...oldExpedition.banished, ...banished],
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
