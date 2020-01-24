import React from 'react'
import { connect } from 'react-redux'

import { RootState, actions, selectors } from '../../../Redux/Store'

import ShuffleButton from '../../atoms/ShuffleButton'

import CardNameDisplay from './CardNameDisplay'
import ModeSelection from './ModeSelection'
import PlayerCountSelection from './PlayerCountSelection'
import SetupSelection from './SetupSelection'
import CardWrapper from './CardWrapper'

const mapStateToProps = (state: RootState) => ({
  currentConfiguration: selectors.TurnOrder.Configuration.getConfiguration(
    state
  ),
  selectedPlayerCount: selectors.TurnOrder.Configuration.getSelectedPlayerCount(
    state
  ),
})

const mapDispatchToProps = {
  startGame: actions.TurnOrder.ActiveGame.startGame,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const TurnOrderConfiguration = React.memo(
  ({ currentConfiguration, startGame, selectedPlayerCount }: Props) => {
    const availableVariations = Object.keys(
      selectedPlayerCount.variations
    ).map(key => [selectedPlayerCount.variations[key]])

    const hasMoreThanOneVariant: boolean = availableVariations.length > 1

    return (
      <React.Fragment>
        <CardWrapper>
          <PlayerCountSelection />
          {hasMoreThanOneVariant ? <SetupSelection /> : null}
          <ModeSelection />
          <CardNameDisplay turnOrderSetup={currentConfiguration} />
        </CardWrapper>
        <ShuffleButton
          color="primary"
          variant="extended"
          onClick={() => startGame(currentConfiguration.turnOrderCards)}
        >
          Start Game
        </ShuffleButton>
      </React.Fragment>
    )
  }
)

TurnOrderConfiguration.displayName = 'TurnOrderConfiguration'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TurnOrderConfiguration)
