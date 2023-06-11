import Table, { ColumnsType } from 'antd/es/table'
import { useLikedTracks } from './features/likedTracks/api/getLikedTracks'
import { getCoverUrl, COVER_SIZE } from './utils/getCoverUrl'
import { Result, Space, Spin } from 'antd'
import { ActionTrack } from './features/likedTracks/components/ActionTrack'

type DataType = {
  key: number
  name: string
  cover: string
  id: string
}

function App() {
  const { data, isLoading, isError } = useLikedTracks({})
  const nbOfTracks = data?.items.length

  if (isLoading)
    return (
      <Space size='large' className='container'>
        <Spin size='large' />
        <Space>Chargement en cours</Space>
      </Space>
    )
  if (isError) return <Result status='403' title='403' subTitle="Le token d'accès a expirée" />

  const tracks: DataType[] = data.items.map((item, key) => ({
    key,
    name: item.track.name,
    cover: getCoverUrl(item.track.album, COVER_SIZE.small),
    id: item.track.id,
  }))

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
      render: (_, record) => <ActionTrack id={record.id} />,
    },
  ]

  return (
    <Space direction='vertical' className='container'>
      <Result status='success' title={`Les ${nbOfTracks} musiques Spotify ont été chargées`} />
      <Table columns={columns} dataSource={tracks} pagination={false} />
    </Space>
  )
}

export default App
