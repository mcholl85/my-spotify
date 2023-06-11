import Table, { ColumnsType } from 'antd/es/table'
import { Result, Space, Spin } from 'antd'
import { useLikedTracks } from '../api/getLikedTracks'
import { ActionTrack } from './ActionTrack'
import { setTrackList } from '../utils/setTrackList'
import { Column } from '../types/colum'

export const LikedTracksList = () => {
  const { data, isLoading, isError } = useLikedTracks({})
  const nbOfTracks = data?.items.length
  const columns: ColumnsType<Column> = [
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

  if (isLoading)
    return (
      <Space size='large' className='container'>
        <Spin size='large' />
        <Space>Chargement en cours</Space>
      </Space>
    )
  if (isError) return <Result status='403' title='403' subTitle="Le token d'accès a expirée" />

  return (
    <Space direction='vertical' className='container'>
      <Result status='success' title={`Les ${nbOfTracks} musiques Spotify ont été chargées`} />
      <Table columns={columns} dataSource={setTrackList(data)} pagination={false} />
    </Space>
  )
}
