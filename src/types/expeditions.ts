import { NemesisTier, TreasureLevel } from './data'
import { IMarketSetup, IBluePrint } from 'types'
import { Seed } from './index'

export type VariantConfig = {
  tier: NemesisTier
  treasure: BattleTreasure
}

export type Variant = {
  id: string
  name: string
  configList: Array<VariantConfig>
}

export type BattleTreasure = { level?: TreasureLevel; hasTreasure: boolean }

export const variants: { [id: string]: Variant } = {
  DEFAULT: {
    id: 'DEFAULT',
    name: 'Default',
    configList: [
      {
        tier: { tier: 1, isNewTier: false },
        treasure: { level: 1, hasTreasure: true },
      },
      {
        tier: { tier: 2, isNewTier: true },
        treasure: { level: 2, hasTreasure: true },
      },
      {
        tier: { tier: 3, isNewTier: true },
        treasure: { level: 3, hasTreasure: true },
      },
      {
        tier: { tier: 4, isNewTier: true },
        treasure: { hasTreasure: false },
      },
    ],
  },
  SHORT: {
    id: 'SHORT',
    name: 'Short',
    configList: [
      {
        tier: { tier: 2, isNewTier: true },
        treasure: { level: 2, hasTreasure: true },
      },
      {
        tier: { tier: 3, isNewTier: true },
        treasure: { level: 3, hasTreasure: true },
      },
      {
        tier: { tier: 4, isNewTier: true },
        treasure: { hasTreasure: false },
      },
    ],
  },
  EXTENDED: {
    id: 'EXTENDED',
    name: 'Extended',
    configList: [
      {
        tier: { tier: 1, isNewTier: false },
        treasure: { hasTreasure: false },
      },
      {
        tier: { tier: 1, isNewTier: false },
        treasure: { level: 1, hasTreasure: true },
      },
      {
        tier: { tier: 2, isNewTier: true },
        treasure: { hasTreasure: false },
      },
      {
        tier: { tier: 2, isNewTier: false },
        treasure: { level: 2, hasTreasure: true },
      },
      {
        tier: { tier: 3, isNewTier: true },
        treasure: { hasTreasure: false },
      },
      {
        tier: { tier: 3, isNewTier: false },
        treasure: { level: 3, hasTreasure: true },
      },
      {
        tier: { tier: 4, isNewTier: true },
        treasure: { hasTreasure: false },
      },
      {
        tier: { tier: 4, isNewTier: false },
        treasure: { hasTreasure: false },
      },
    ],
  },
}

// Automagically generate union type of variant ids from variants
// object
export const variantIds = Object.values(variants).map(val => val.id)
export type VariantId = typeof variantIds[number]

export type BattleStatus =
  | 'locked'
  | 'unlocked'
  | 'before_battle'
  | 'started'
  | 'won'
  | 'lost'
  | 'finished'

export type OldStyleBattle = {
  id: string
  expeditionId: string
  nemesisId?: string
  nemesisTier: NemesisTier
  treasure: BattleTreasure
  status: BattleStatus
  rewards?: { treasure: string[]; mage?: string; supplyIds: string[] }
  tries: number
}

export type SettingsSnapshot = {
  supplySetup: IMarketSetup
  usedExpansions: string[]
  availableCardIds: string[]
  availableMageIds: string[]
  availableNemesisIds: string[]
  availableTreasureIds: string[]
  availableUpgradedBasicNemesisCardIds: string[]
}

export type ExpeditionSeedState = Object | true
export type ExpeditionSeed = Seed & {
  supplyState: ExpeditionSeedState
  nemesisState: ExpeditionSeedState
}

export type OldStyleExpedition = {
  id: string
  name: string
  migrationVersion?: number
  score: number
  seed: ExpeditionSeed
  settingsSnapshot: SettingsSnapshot
  barracks: {
    mageIds: string[]
    supplyIds: string[]
    treasureIds: string[]
  }
  upgradedBasicNemesisCards: string[]
  banished: string[]
  battles: OldStyleBattle[]
  variantId: string
  bigPocketVariant: boolean
  finished: boolean
}

export type OnLoss = 'skip'

export type Rewards = {
  treasure: {
    ids: Array<string | { random: true; level: 1 | 2 | 3 }>
  }
  mage: {
    ids: Array<string | { random: true }>
  }
  supply: {
    ids: Array<string | IBluePrint>
    bigPocket: boolean
  }
}

export type BattleConfig = {
  tier: 1 | 2 | 3 | 4
  nemesisId?: string
  newUBNCards: { ids: []; addRandom: boolean }
  specialRules?: string
  lossRewards?: Rewards[]
  winRewards?: Rewards
  treasure: BattleTreasure
  onLoss?: OnLoss
}

export type Battle = {
  id: string
  type: 'battle'
  expeditionId: string
  nemesisId?: string
  battleConfig: BattleConfig
  status: BattleStatus
  rewards?: { treasure: string[]; mage?: string; supplyIds: string[] }
  tries: number
}

export type Narrative = {
  id: string
  type: 'narrative'
  text: string
  descisions: string[]
}

export type RewardBranch = {
  id: string
  rewards: Rewards
}

export type BranchConfig = {
  isFirst?: boolean
  nextBranchId: string | { [key: number]: string }
}

export type Branch = BranchConfig & (Battle | Narrative | RewardBranch)

export type Expedition = {
  id: string
  name: string
  migrationVersion: number
  score: number
  seed: ExpeditionSeed
  settingsSnapshot: SettingsSnapshot
  barracks: {
    mageIds: string[]
    supplyIds: string[]
    treasureIds: string[]
  }
  upgradedBasicNemesisCards: string[]
  banished: string[]
  branches: { [id: string]: Branch }
  variantId: string
  bigPocketVariant: boolean
  finished: boolean
}

export type Expeditions = {
  [id: string]: OldStyleExpedition
}
