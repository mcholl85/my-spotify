import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'

const deleteLikedTrack = async (id: string) => {
  await api.delete(`/me/tracks?ids=${id}`)
}

export const useDeleteLikedTrack = () => {
  return useMutation({
    mutationFn: deleteLikedTrack,
  })
}
