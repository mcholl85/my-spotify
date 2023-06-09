import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { QUERY_LIKED_TRACKS } from '../../../constants/query.constants'

const deleteLikedTrack = async (id: string) => {
  await api.delete(`/me/tracks?ids=${id}`)
}

export const useDeleteLikedTrack = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteLikedTrack,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_LIKED_TRACKS])
    },
  })
}
