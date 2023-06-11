import Table, { ColumnsType } from 'antd/es/table'
import { Pagination, Result, Space, Spin } from 'antd'
import { useLikedTracks } from '../api/getLikedTracks'
import { ActionTrack } from './ActionTrack'
import { setTrackList } from '../utils/setTrackList'
import { Column } from '../types/colum'
import { useState } from 'react'
import { DEFAULT_LIMIT } from '../../../constants/api.constants'
import { calcOffset } from '../utils/calcOffset'

export const LikedTracksList = () => {
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useLikedTracks({
    offset: calcOffset(page),
  })

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
      <Result status='success' title={`Les ${data.total} musiques Spotify ont été chargées`} />
      <Pagination
        current={page}
        showSizeChanger={false}
        defaultPageSize={DEFAULT_LIMIT}
        total={data.total}
        onChange={setPage}
      />
      <Table columns={columns} dataSource={setTrackList(data)} pagination={false} />
    </Space>
  )
}
