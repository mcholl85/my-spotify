import { Button } from 'antd'
import { useDeleteLikedTrack } from '../api/deleteLikedTrack'
import { AddTrack } from './AddTrack'

type DeleteTrackProps = {
  id: string
}

export const DeleteTrack = ({ id }: DeleteTrackProps) => {
  const { mutate: removeLikedTrack, isSuccess, isLoading } = useDeleteLikedTrack()

  if (isSuccess) return <AddTrack id={id} />

  return (
    <Button type='default' loading={isLoading} onClick={() => removeLikedTrack(id)}>
      Enlever de Titres likés
    </Button>
  )
}
