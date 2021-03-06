import {
  createArrayWithDefaultValues,
  createIdList,
  getRandomEntity,
} from 'Redux/helpers'
import * as types from 'types'

export const createTreasureIds = (
  firstBattleConfig: types.VariantConfig,
  availableLevel1TreasureIds: string[],
  seed: types.Seed
) => {
  // TODO someday we probably should extend the type so that we have a treasreBeforeFight and treasureAfterFight property
  const startsWithTreasure =
    firstBattleConfig.tier.tier > 1 && firstBattleConfig.treasure.hasTreasure

  return startsWithTreasure
    ? createIdList(
        availableLevel1TreasureIds,
        createArrayWithDefaultValues(5, 'EMPTY'),
        getRandomEntity,
        seed
      )
    : { result: [], seed }
}
