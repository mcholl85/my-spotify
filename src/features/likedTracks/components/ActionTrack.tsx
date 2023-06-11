import { useEffect, useState } from 'react'
import { useAddLikedTrack } from '../api/addLikedTrack'
import { useDeleteLikedTrack } from '../api/deleteLikedTrack'
import { Button } from 'antd'

type ActionTrackProps = {
  id: string
}

export const ActionTrack = ({ id }: ActionTrackProps) => {
  const {
    mutate: addLikedTrack,
    isSuccess: addLikedTrackIsSuccess,
    isLoading: addLikedTrackIsLoading,
  } = useAddLikedTrack()
  const {
    mutate: removeLikedTrack,
    isSuccess: removeLikedTrackIsSuccess,
    isLoading: removeLikedTrackIsLoading,
  } = useDeleteLikedTrack()
  const [trackIsDelete, setTrackIsDelete] = useState(false)

  useEffect(() => {
    if (addLikedTrackIsSuccess) setTrackIsDelete(false)
  }, [addLikedTrackIsSuccess])

  useEffect(() => {
    if (removeLikedTrackIsSuccess) setTrackIsDelete(true)
  }, [removeLikedTrackIsLoading])

  return !trackIsDelete ? (
    <Button type='default' loading={removeLikedTrackIsLoading} onClick={() => removeLikedTrack(id)}>
      Enlever de Titres likés
    </Button>
  ) : (
    <Button type='primary' loading={addLikedTrackIsLoading} onClick={() => addLikedTrack(id)}>
      Ajouter aux Titres likés
    </Button>
  )
}
