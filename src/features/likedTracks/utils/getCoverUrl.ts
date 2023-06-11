import { Album } from '../types/album'

export const COVER_SIZE = {
  small: 64,
  medium: 300,
  height: 640,
}

export const getCoverUrl = (album: Album, size: number) =>
  album.images.find((image) => image.height === size)?.url || ''
