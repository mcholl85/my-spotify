import { useAddLikedTrack } from '../api/addLikedTrack'
import { DeleteTrack } from './DeleteTrack'

type AddTrackProps = {
  id: string
}

export const AddTrack = ({ id }: AddTrackProps) => {
  const { mutate: addLikedTrack, isSuccess } = useAddLikedTrack()

  if (isSuccess) return <DeleteTrack id={id} />

  return <button onClick={() => addLikedTrack(id)}>Ajouter aux Titres likés</button>
}
