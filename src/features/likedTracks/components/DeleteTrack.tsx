import { useDeleteLikedTrack } from '../api/deleteLikedTrack'
import { AddTrack } from './AddTrack'

type DeleteTrackProps = {
  id: string
}

export const DeleteTrack = ({ id }: DeleteTrackProps) => {
  const { mutate: removeLikedTrack, isSuccess } = useDeleteLikedTrack()

  if (isSuccess) return <AddTrack id={id} />

  return <button onClick={() => removeLikedTrack(id)}>Enlever de Titres likés</button>
}
