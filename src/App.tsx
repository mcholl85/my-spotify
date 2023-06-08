import { useLikedTracks } from './features/likedTracks/api/getLikedTracks'

function App() {
  const { data, isLoading, isError } = useLikedTracks({})
  const nbOfTracks = data?.items.length

  if (isLoading) return <div>Chargement en cours</div>
  if (isError) return <div>Error...</div>

  return (
    <div>
      <div>Les {nbOfTracks} musiques Spotify ont été chargées</div>
      <br />
      <div>
        {data?.items.map((item) => (
          <div key={item.track.id}>{item.track.name}</div>
        ))}
      </div>
    </div>
  )
}

export default App
