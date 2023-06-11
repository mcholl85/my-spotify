import { GetLikedTracksResponse } from '../api/getLikedTracks'
import { Column } from '../types/colum'
import { COVER_SIZE, getCoverUrl } from './getCoverUrl'

export const setTrackList = (tracks: GetLikedTracksResponse): Column[] =>
  tracks.items.map((item, key) => ({
    key,
    name: item.track.name,
    cover: getCoverUrl(item.track.album, COVER_SIZE.small),
    id: item.track.id,
  }))
