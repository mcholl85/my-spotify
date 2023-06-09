import { Button } from 'antd'
import { useAddLikedTrack } from '../api/addLikedTrack'
import { DeleteTrack } from './DeleteTrack'

type AddTrackProps = {
  id: string
}

export const AddTrack = ({ id }: AddTrackProps) => {
  const { mutate: addLikedTrack, isSuccess, isLoading } = useAddLikedTrack()

  if (isSuccess) return <DeleteTrack id={id} />

  return (
    <Button type='primary' loading={isLoading} onClick={() => addLikedTrack(id)}>
      Ajouter aux Titres likés
    </Button>
  )
}
