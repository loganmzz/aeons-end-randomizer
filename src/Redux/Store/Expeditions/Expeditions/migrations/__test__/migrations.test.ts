import { migrate } from '../index'
import { rootState } from '__fixtures__/rootState'

describe('Expedition | migrations', () => {
  it('should migrate to settingsSnapshot', () => {
    const result = migrate(() => rootState, {
      newState: {
        ...rootState.Expeditions.Expeditions,
      },
    })

    expect(result).toMatchSnapshot()
  })
})
