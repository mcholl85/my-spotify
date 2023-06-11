import Table, { ColumnsType } from 'antd/es/table'
import { Pagination, Result, Space, Spin } from 'antd'
import { useLikedTracks } from '../api/getLikedTracks'
import { Column } from '../types/column'
import { useState } from 'react'
import { DEFAULT_LIMIT } from '../../../constants/api.constants'
import { calcOffset } from '../utils/calcOffset'
import { DeleteTrack } from './DeleteTrack'
import { AddTrack } from './AddTrack'

export const LikedTracksList = () => {
  const [page, setPage] = useState(1)
  const offset = calcOffset(page)
  const { data, isLoading, isError } = useLikedTracks({
    offset,
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
      dataIndex: 'liked',
      key: 'liked',
      render: (_, record) =>
        record.liked ? (
          <DeleteTrack id={record.id} offset={offset} />
        ) : (
          <AddTrack id={record.id} offset={offset} />
        ),
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
      <Table columns={columns} dataSource={data.tracks} pagination={false} />
    </Space>
  )
}
