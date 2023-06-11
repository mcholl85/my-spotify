import { Column } from './column'

export type QueryData =
  | {
      total: number
      tracks: Column[]
    }
  | undefined
