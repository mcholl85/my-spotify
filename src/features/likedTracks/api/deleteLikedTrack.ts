import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { QUERY_LIKED_TRACKS } from '../../../constants/query.constants'
import { QueryData } from '../types/queryData'
import { changeLikeStatus } from '../utils/changeLikeStatus'

const deleteLikedTrack = async (id: string) => {
  await api.delete(`/me/tracks?ids=${id}`)
}

type useDeleteLikedTrackProps = {
  offset: number
}

export const useDeleteLikedTrack = ({ offset }: useDeleteLikedTrackProps) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLikedTrack,
    onSuccess: (_, id) =>
      queryClient.setQueryData([QUERY_LIKED_TRACKS, offset], (oldData: QueryData) =>
        changeLikeStatus({ data: oldData, id, isLike: false }),
      ),
  })
}
