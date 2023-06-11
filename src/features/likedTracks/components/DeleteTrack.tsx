import { Button } from 'antd'
import { useDeleteLikedTrack } from '../api/deleteLikedTrack'

type DeleteTrackProps = {
  id: string
  offset: number
}

export const DeleteTrack = ({ id, offset }: DeleteTrackProps) => {
  const { mutate: removeLikedTrack, isLoading } = useDeleteLikedTrack({ offset })

  return (
    <Button type='default' loading={isLoading} onClick={() => removeLikedTrack(id)}>
      Enlever de Titres likés
    </Button>
  )
}
