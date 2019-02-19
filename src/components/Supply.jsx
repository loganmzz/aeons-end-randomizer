import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import ListSubheader from '@material-ui/core/ListSubheader'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'

import useSelectedSets from '../hooks/useSelectedSets.jsx'
import config from '../config'

import ShuffleButton from './ShuffleButton.jsx'
import {
  createSlotList,
  getListOfAvailableEntity,
  getRandomEntity,
  createEntityList
} from './helpers.js'

const TILECONFIGS = {
  "market1": {
    name: "MARKET SETUP 1",
    tiles: [
      { type: "Gem", operation: "<", threshold: 4 },
      { type: "Gem", operation: "=", threshold: 4 },
      { type: "Gem", operation: "ANY" },
      { type: "Relic", operation: "ANY" },
      { type: "Relic", operation: "ANY" },
      { type: "Spell", operation: "<", threshold: 5 },
      { type: "Spell", operation: "<", threshold: 5 },
      { type: "Spell", operation: ">", threshold: 5 },
      { type: "Spell", operation: ">", threshold: 5 },
    ]
  }
}

const createTiles = (tileConfig, cards, classes) => {
  return tileConfig.tiles.map(({ type, operation, threshold }, i) => (
      <GridListTile key={i} cols={1} style={{ height: 'auto' }}>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {type} {operation} {threshold ? threshold : ""}
            </Typography>
            <Typography component="p">
              { cards[i].name !== undefined ? cards[i].name : "-" }
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Set: { cards[i].set !== undefined ? cards[i].set : "-" }
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              Cost: { cards[i].cost !== undefined ? cards[i].cost : "-" }
            </Typography>
          </CardContent>
        </Card>
      </GridListTile>
  ))
}

const Supply = ({ classes }) => {
  const { selectedSets, noSelectedSetsComponent } = useSelectedSets()
  const emptySlotList = createSlotList(9)
  const [cards, setCards] = useState(emptySlotList)

  if (noSelectedSetsComponent) {
    return noSelectedSetsComponent
  }

  const tileConfig = TILECONFIGS["market1"]

  const handleShuffle = () => {
    const tiles = tileConfig.tiles
    const availableCards = getListOfAvailableEntity(selectedSets, "cards")
    // Gems
    const gemSlots = tiles.filter(({ type }) => type === "Gem")
    const availableGems = availableCards.filter(({ type }) => type === "Gem")
    const gems = createEntityList(availableGems, gemSlots)

    // Relics
    const relicSlots = tiles.filter(({ type }) => type === "Relic")
    const availableRelics = availableCards.filter(({ type }) => type === "Relic")
    const relics = createEntityList(availableRelics, relicSlots)

    // Spells
    const spellSlots = tiles.filter(({ type }) => type === "Spell")
    const availableSpells = availableCards.filter(({ type }) => type === "Spell")
    const spells = createEntityList(availableSpells, spellSlots)

    setCards([...gems, ...relics, ...spells])
  }

  return (
    <React.Fragment>
      <GridList cellHeight={180} className={classes.gridList} cols={2}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">{tileConfig.name}</ListSubheader>
        </GridListTile>
        { createTiles(tileConfig, cards, classes) }
      </GridList>
      <ShuffleButton
        onClick={handleShuffle}
        color="primary" 
        variant="extended"
      >
        Create Market
      </ShuffleButton>
    </React.Fragment>
  )
}

export default withStyles({
  gridList: {
    width: 300,
    height: 450,
  },
  card: {
    minWidth: 30,
  },
})(Supply)
