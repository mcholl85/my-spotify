import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../../../lib/axios'
import { QUERY_LIKED_TRACKS } from '../../../constants/query.constants'

const addLikedTrack = async (id: string) => {
  await api.put(`/me/tracks?ids=${id}`)
}

export const useAddLikedTrack = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLikedTrack,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_LIKED_TRACKS])
    },
  })
}
