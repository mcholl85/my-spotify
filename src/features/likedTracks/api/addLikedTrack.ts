import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { QUERY_LIKED_TRACKS } from '../../../constants/query.constants'
import { QueryData } from '../types/queryData'
import { changeLikeStatus } from '../utils/changeLikeStatus'

const addLikedTrack = async (id: string) => {
  await api.put(`/me/tracks?ids=${id}`)
}

type useAddLikedTrackProps = {
  offset: number
}

export const useAddLikedTrack = ({ offset }: useAddLikedTrackProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLikedTrack,
    onSuccess: (_, id) =>
      queryClient.setQueryData([QUERY_LIKED_TRACKS, offset], (oldData: QueryData) =>
        changeLikeStatus({ data: oldData, id, isLike: true }),
      ),
  })
}
