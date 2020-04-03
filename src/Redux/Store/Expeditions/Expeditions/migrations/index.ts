import * as types from 'types'

import { RootState } from 'Redux/Store'

import { State } from '../types'

import { migrateToSettingsSnapshot } from './migrateToSettingsSnapshot'

const migrations: types.Migration[] = [
  {
    version: 2020030301,
    transformer: migrateToSettingsSnapshot,
    force: true,
  },
]

export const migrate = (
  getState: () => RootState,
  {
    newState,
  }: {
    newState: State
  }
) => {
  const rootState = getState()

  const expeditions = newState.expeditionIds.map(id => newState.expeditions[id])

  const migratedExpeditions = expeditions.map(expedition => {
    return migrations.reduce((acc, migration) => {
      if (!expedition.migrationVersion) {
        return migration.transformer(rootState, acc)
      } else if (migration.force) {
        return migration.transformer(rootState, acc)
      } else if (
        acc.migrationVersion &&
        migration.version > acc.migrationVersion
      ) {
        return migration.transformer(rootState, acc)
      }

      return acc
    }, expedition)
  })

  const migratedExpeditionsObject = migratedExpeditions.reduce(
    (acc, expedition) => {
      return {
        ...acc,
        [expedition.id]: expedition,
      }
    },
    {}
  )

  const migratedState = {
    expeditions: {
      ...migratedExpeditionsObject,
    },
    expeditionIds: newState.expeditionIds,
  }

  return migratedState
}
