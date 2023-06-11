import { useMutation } from '@tanstack/react-query'
import api from '../../../lib/axios'

const addLikedTrack = async (id: string) => {
  await api.put(`/me/tracks?ids=${id}`)
}

export const useAddLikedTrack = () => {
  return useMutation({
    mutationFn: addLikedTrack,
  })
}
