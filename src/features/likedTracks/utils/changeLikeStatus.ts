import { Column } from '../types/column'
import { QueryData } from '../types/queryData'

type changeLikeStatusParams = {
  data: QueryData
  id: string
  isLike: boolean
}

export const changeLikeStatus = ({ data, id, isLike }: changeLikeStatusParams) =>
  data
    ? {
        ...data,
        tracks: data.tracks.map((track: Column) =>
          track.id === id ? { ...track, liked: isLike } : track,
        ),
      }
    : data
