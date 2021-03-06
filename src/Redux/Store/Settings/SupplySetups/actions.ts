import { createAction } from '@martin_hotell/rex-tils'

import * as types from 'types'

import { ActionTypes, State, SetupType } from './types'

export const actions = {
  noOp: () => createAction('NOOP'),
  toggleAll: () => createAction(ActionTypes.TOGGLE_ALL),
  toggleSetup: (setup: string, setupType: SetupType) =>
    createAction(ActionTypes.TOGGLE_SETUP, { setup, setupType }),
  saveCustomSetup: (setup: types.IMarketSetup) =>
    createAction(ActionTypes.SAVE_CUSTOM_SETUP, setup),
  cancelEdit: (id: string) => createAction(ActionTypes.CANCEL_EDIT_SETUP, id),
  editCustomSetup: (id: string) =>
    createAction(ActionTypes.EDIT_CUSTOM_SETUP, id),
  deleteCustomSetup: (id: string) =>
    createAction(ActionTypes.DELETE_CUSTOM_SETUP, id),
  setToDB: (state: State) => createAction(ActionTypes.SET_TO_DB, state),
  setToDBSuccessful: () => createAction(ActionTypes.SET_TO_DB_SUCCESS),
  setToDBFailed: (error: Object) =>
    createAction(ActionTypes.SET_TO_DB_FAILURE, error),
  fetchFromDB: () => createAction(ActionTypes.FETCH_FROM_DB),
  fetchFromDBSuccessful: (state: State) =>
    createAction(ActionTypes.FETCH_FROM_DB_SUCCESS, state),
  fetchFromDBFailed: (error: Object) =>
    createAction(ActionTypes.FETCH_FROM_DB_FAILURE, error),
}
