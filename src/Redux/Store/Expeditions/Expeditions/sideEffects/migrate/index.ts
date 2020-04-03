import * as types from 'types'

import { RootState } from 'Redux/Store'

import { State } from '../../types'

import { migrateToSettingsSnapshot } from './migrateToSettingsSnapshot'

export const migrate = (
  getState: () => RootState,
  config: {
    state: State
    expeditionsToMigrate: types.OldStyleExpedition[]
  }
) => {
  return migrateToSettingsSnapshot(getState, config)
}
