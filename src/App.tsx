import Table, { ColumnsType } from 'antd/es/table'
import { useLikedTracks } from './features/likedTracks/api/getLikedTracks'
import { DeleteTrack } from './features/likedTracks/components/DeleteTrack'
import { getCoverUrl, COVER_SIZE } from './utils/getCoverUrl'
import { Result, Spin } from 'antd'

function App() {
  const { data, isLoading, isError } = useLikedTracks({})

  const nbOfTracks = data?.items.length

  if (isLoading)
    return (
      <Spin tip='Chargement en cours'>
        <div className='content'></div>
      </Spin>
    )
  if (isError) return <Result status='403' title='403' subTitle="Le token d'accès a expirée" />

  const tracks: DataType[] = data.items.map((item, key) => ({
    key,
    name: item.track.name,
    cover: getCoverUrl(item.track.album, COVER_SIZE.small),
    id: item.track.id,
  }))

  type DataType = {
    key: number
    name: string
    cover: string
    id: string
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Album',
      dataIndex: 'album',
      key: 'album',
      render: (_, record) => <img src={record.cover} alt={`${record.name} cover`} />,
    },
    {
      title: 'Titre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => <DeleteTrack id={record.id} />,
    },
  ]

  return (
    <div>
      <Result status='success' title={`Les ${nbOfTracks} musiques Spotify ont été chargées`} />
      <Table columns={columns} dataSource={tracks} />
    </div>
  )
}

export default App
