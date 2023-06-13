/* eslint-disable camelcase */
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import api from '../../../../lib/axios'
import { PropsWithChildren } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { useLikedTracks } from '../../../../features/likedTracks/api/getLikedTracks'

const mockedResponse = {
  href: 'https://api.spotify.com/v1/me/tracks?offset=0&limit=50',
  limit: 50,
  next: '',
  offset: 0,
  previous: '',
  items: [
    {
      added_at: '2023-06-11T13:30:16Z',
      track: {
        album: {
          images: [
            {
              url: '',
              height: 64,
              width: 64,
            },
          ],
          name: 'album',
        },
        artists: [
          {
            id: 'A1',
            name: 'A',
          },
        ],
        id: '123',
        name: 'track1',
      },
    },
  ],
  total: 1,
}

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useLikedTracks', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should return an error with a wrong request', async () => {
    const offset = 50
    const limit = 20
    const spyApiGet = jest.spyOn(api, 'get').mockRejectedValue(new Error('wrong request'))
    const { result } = renderHook(() => useLikedTracks({ offset, limit }), { wrapper })

    await waitFor(() => {
      expect(spyApiGet).toBeCalledTimes(1)
      expect(spyApiGet).toBeCalledWith(`/me/tracks?limit=${limit}&offset=${offset}`)
      expect(result.current.isError).toBe(true)
      expect(result.current.data).toBeUndefined()
    })
  })
  test('should call api.get with the correct URL', async () => {
    const spyApiGet = jest.spyOn(api, 'get').mockResolvedValue({ data: mockedResponse })
    const { result } = renderHook(() => useLikedTracks({}), { wrapper })

    await waitFor(() => {
      expect(spyApiGet).toBeCalledTimes(1)
      expect(result.current.isSuccess).toBe(true)
      expect(result.current.data).toEqual({
        tracks: [{ key: 0, name: 'track1', cover: '', id: '123', liked: true }],
        total: 1,
      })
    })
  })
})
