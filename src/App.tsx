import { useDeleteLikedTrack } from './features/likedTracks/api/deleteLikedTrack'
import { useLikedTracks } from './features/likedTracks/api/getLikedTracks'
import { getCoverUrl, COVER_SIZE } from './utils/getCoverUrl'

function App() {
  const { data, isLoading, isError } = useLikedTracks({})
  const { mutate: removeLikedTrack } = useDeleteLikedTrack()
  const nbOfTracks = data?.items.length

  if (isLoading) return <div>Chargement en cours</div>
  if (isError) return <div>Error...</div>

  return (
    <div>
      <div>Les {nbOfTracks} musiques Spotify ont été chargées</div>
      <br />
      <div>
        {data.items.map(({ track }) => (
          <div key={track.id}>
            <div>{track.name} </div>
            <img src={getCoverUrl(track.album, COVER_SIZE.small)} alt={`${track.name} cover`} />
            <button onClick={() => removeLikedTrack(track.id)}>Enlever de Titres likés</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
