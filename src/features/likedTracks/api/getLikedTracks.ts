import api from '../../../lib/axios'
import { Track } from '../types/track'
import { useQuery } from '@tanstack/react-query'
import { QUERY_LIKED_TRACKS } from '../../../constants/query.constants'
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from '../../../constants/api.constants'

type GetLikedTracksParams = {
  limit?: string
  offset?: string
}

type useLikedTracksProps = GetLikedTracksParams

export type GetLikedTracksResponse = {
  href: string
  limit: number
  next: string
  offset: number
  previous: string
  total: number
  items: {
    added_at: Date
    track: Track
  }[]
}

const getLikedTracks = async ({
  limit = DEFAULT_LIMIT,
  offset = DEFAULT_OFFSET,
}: GetLikedTracksParams): Promise<GetLikedTracksResponse> => {
  return await (
    await api.get(`/me/tracks?limit=${limit}&offset=${offset}`)
  ).data
}

export const useLikedTracks = ({ limit, offset }: useLikedTracksProps) => {
  return useQuery({
    queryKey: [QUERY_LIKED_TRACKS],
    queryFn: () => getLikedTracks({ limit, offset }),
    retry: 0,
    refetchOnWindowFocus: false,
  })
}
