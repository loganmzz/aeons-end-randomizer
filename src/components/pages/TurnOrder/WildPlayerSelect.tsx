import React from 'react'
import { connect } from 'react-redux'

import { RootState, selectors, actions } from 'Redux/Store'

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps & {}

const WildPlayerSelect = React.memo(({  }: Props) => {
  return <p>popel</p>
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WildPlayerSelect)
