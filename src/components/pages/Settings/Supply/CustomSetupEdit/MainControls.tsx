import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import SaveIcon from '@material-ui/icons/Save'
import CancelIcon from '@material-ui/icons/Cancel'

import * as types from '../../../../../types'

import InputField from './InputField'
import MainControlsWrapper from './MainControlsWrapper'

type Props = {
  bluePrintList: types.IBluePrint[]
  cancelEdit: Function
  setup: types.IMarketSetup
  setupName: string
  setSetupName: Function
  saveCustomSetup: Function
}

const MainControls = ({
  bluePrintList,
  cancelEdit,
  setup,
  setupName,
  setSetupName,
  saveCustomSetup,
}: Props) => {
  return (
    <MainControlsWrapper>
      <InputField
        id="setup-name"
        label="Setup Name"
        placeholder="Setup Name"
        value={setupName}
        onChange={e => setSetupName(e.currentTarget.value)}
        margin="normal"
      />
      <IconButton
        color="primary"
        aria-label="Save"
        onClick={() =>
          saveCustomSetup({ ...setup, name: setupName, tiles: bluePrintList })
        }
      >
        <SaveIcon />
      </IconButton>
      <IconButton
        color="secondary"
        aria-label="Cancel"
        onClick={() => cancelEdit(setup.id)}
      >
        <CancelIcon />
      </IconButton>
    </MainControlsWrapper>
  )
}

export default React.memo(MainControls)
