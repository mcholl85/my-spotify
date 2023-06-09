import { Album } from './album'

export type Track = {
  album: Album
  artists: {
    id: string
    name: string
  }[]
  duration_ms: number
  id: string
  name: string
}
