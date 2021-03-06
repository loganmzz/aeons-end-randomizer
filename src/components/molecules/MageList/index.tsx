import React from 'react'

import { Mage } from '../../../types'

import MageGridWrapper from './MageGridWrapper'
import MageTile from './MageTile'

import Grid from '@material-ui/core/Grid'

type Props = {
  mages: ReadonlyArray<Mage>
}

const MageList = ({ mages }: Props) => (
  <MageGridWrapper>
    <Grid container spacing={16}>
      {mages.map((mage, index) => (
        <MageTile mage={mage} key={mage.name} playerNumber={index + 1} />
      ))}
    </Grid>
  </MageGridWrapper>
)

export default React.memo(MageList)
