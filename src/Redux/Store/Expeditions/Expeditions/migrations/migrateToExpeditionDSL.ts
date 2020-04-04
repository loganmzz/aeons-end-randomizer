import * as types from 'types'
import { RootState } from 'Redux/Store'

export const migrateToExpeditionDSL = (
  rootState: RootState,
  expedition: types.OldStyleExpedition
) => {
  return expedition
}
