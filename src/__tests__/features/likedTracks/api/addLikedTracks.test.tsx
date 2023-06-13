import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import api from '../../../../lib/axios'
import { useAddLikedTrack } from '../../../../features/likedTracks/api/addLikedTrack'
import { act } from 'react-test-renderer'
import * as changeLikeStatusModule from '../../../../features/likedTracks/utils/changeLikeStatus'

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useAddLikedTrack', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should call api.put with the correct URL', async () => {
    const spyApiPut = jest.spyOn(api, 'put').mockResolvedValue(undefined)
    const { result } = renderHook(() => useAddLikedTrack({ offset: 0 }), { wrapper })

    act(() => {
      result.current.mutate('123')
    })

    await waitFor(() => {
      expect(spyApiPut).toBeCalledTimes(1)
      expect(result.current.isSuccess).toBe(true)
    })
  })
  test('should return an error with a wrong request', async () => {
    const spyApiPut = jest.spyOn(api, 'put').mockRejectedValue(new Error('wrong request'))
    const spyChangeLikeStatus = jest.spyOn(changeLikeStatusModule, 'changeLikeStatus')
    const { result } = renderHook(() => useAddLikedTrack({ offset: 0 }), { wrapper })

    act(() => {
      result.current.mutate('123')
    })

    await waitFor(() => {
      expect(spyApiPut).toBeCalledTimes(1)
      expect(result.current.isError).toBe(true)
      expect(spyChangeLikeStatus).not.toBeCalled()
    })
  })
  test('should change like status with a valid request', async () => {
    jest.spyOn(api, 'put').mockResolvedValue(undefined)
    const spyChangeLikeStatus = jest.spyOn(changeLikeStatusModule, 'changeLikeStatus')
    const { result } = renderHook(() => useAddLikedTrack({ offset: 0 }), { wrapper })

    act(() => {
      result.current.mutate('123')
    })

    await waitFor(() => {
      expect(spyChangeLikeStatus).toBeCalledTimes(1)
      expect(spyChangeLikeStatus).toBeCalledWith({ data: undefined, id: '123', isLike: true })
    })
  })
})
