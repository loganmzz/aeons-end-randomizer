import React from 'react'
import { connect } from 'react-redux'

import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'

import { RootState, actions, selectors } from 'Redux/Store'

import { MODES } from 'types'

import Card from 'components/atoms/_styled_/Card'
import CardContent from 'components/atoms/_styled_/CardContent'

const renderModeOptions = () =>
  MODES.map(mode => (
    <FormControlLabel
      key={mode}
      value={mode}
      control={<Radio />}
      label={mode}
    />
  ))

const mapStateToProps = (state: RootState) => ({
  mode: selectors.TurnOrder.Configuration.getMode(state),
})

const mapDispatchToProps = {
  setMode: actions.TurnOrder.Configuration.setMode,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const ModeSelection = React.memo(({ mode, setMode }: Props) => (
  <Card>
    <CardContent>
      <FormLabel>Mode</FormLabel>
      <RadioGroup
        aria-label="mode"
        name="turnOrderMode"
        value={mode}
        onChange={(event: React.ChangeEvent<any>) =>
          setMode(event.currentTarget.value)
        }
      >
        {renderModeOptions()}
      </RadioGroup>
    </CardContent>
  </Card>
))

ModeSelection.displayName = 'ModeSelection'

export default connect(mapStateToProps, mapDispatchToProps)(ModeSelection)
