import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import Button from '@material-ui/core/Button'

import { RootState, selectors, actions } from 'Redux/Store'

import ShuffleButton from 'components/atoms/ShuffleButton'

import { useModal } from 'hooks/useModal'

import DiscardTable from './DiscardTable'
import WildPlayerSelect from './WildPlayerSelect'

const mapStateToProps = (state: RootState) => ({
  deck: selectors.TurnOrder.ActiveGame.getDeck(state),
  availableCards: selectors.TurnOrder.Configuration.getAvailableCards(state),
  lastDrawnCard: selectors.TurnOrder.ActiveGame.getLastDrawnCard(state),
})

const mapDispatchToProps = {
  resetGame: actions.TurnOrder.ActiveGame.resetGame,
  drawCard: actions.TurnOrder.ActiveGame.draw,
  newRound: actions.TurnOrder.ActiveGame.newRound,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const ActiveTurnOrder = React.memo(
  ({
    availableCards,
    deck,
    resetGame,
    newRound,
    drawCard,
    lastDrawnCard,
  }: Props) => {
    const { show, RenderModal } = useModal()

    useEffect(() => {
      if (lastDrawnCard && lastDrawnCard.type === 'wild-token') {
        show()
      }
    }, [lastDrawnCard])

    return (
      <React.Fragment>
        {deck.length === 0 ? (
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={() => newRound(availableCards)}
          >
            New Round
          </Button>
        ) : (
          <Button
            size="large"
            variant="contained"
            color="secondary"
            onClick={drawCard}
          >
            Draw a card
          </Button>
        )}

        <DiscardTable />

        <ShuffleButton color="primary" variant="extended" onClick={resetGame}>
          Reset Game
        </ShuffleButton>
        <RenderModal titleColor="#333" titleLabel="Select player">
          <WildPlayerSelect />
        </RenderModal>
      </React.Fragment>
    )
  }
)

ActiveTurnOrder.displayName = 'ActiveTurnOrder'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveTurnOrder)
