export type Track = {
  album: {
    images: {
      url: string
      height: number
      width: number
    }[]
    name: string
  }
  artists: {
    id: string
    name: string
  }[]
  duration_ms: number
  id: string
  name: string
}
