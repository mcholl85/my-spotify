import { Button } from 'antd'
import { useAddLikedTrack } from '../api/addLikedTrack'

type AddTrackProps = {
  id: string
  offset: number
}

export const AddTrack = ({ id, offset }: AddTrackProps) => {
  const { mutate: addLikedTrack, isLoading } = useAddLikedTrack({ offset })

  return (
    <Button type='primary' loading={isLoading} onClick={() => addLikedTrack(id)}>
      Ajouter aux Titres likés
    </Button>
  )
}
