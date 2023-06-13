import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'
import { DeleteTrack } from '../../../../features/likedTracks/components/DeleteTrack'
import { useDeleteLikedTrack } from '../../../../features/likedTracks/api/deleteLikedTrack'

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)
jest.mock('../../../../features/likedTracks/api/deleteLikedTrack', () => ({
  useDeleteLikedTrack: jest.fn(),
}))
const mockUseDeleteLikedTrack = useDeleteLikedTrack as jest.Mock

describe('Component DeleteTrack', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Matches DOM Snapshot', () => {
    mockUseDeleteLikedTrack.mockReturnValue({ mutate: jest.fn() })
    const { asFragment } = render(<DeleteTrack id={'123'} offset={50} />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
  test('should call useAddLikedTrack with the correct arguments', async () => {
    const mockedMutationFn = jest.fn()
    mockUseDeleteLikedTrack.mockReturnValue({
      mutate: mockedMutationFn,
      isLoading: false,
    })

    render(<DeleteTrack id={'123'} offset={0} />, { wrapper })

    await userEvent.click(screen.getByRole('button'))

    expect(mockedMutationFn).toBeCalledTimes(1)
    expect(mockedMutationFn).toBeCalledWith('123')
  })
  it('should display loading state when isLoading is true', () => {
    mockUseDeleteLikedTrack.mockReturnValue({
      mutate: jest.fn(),
      isLoading: true,
    })

    render(<DeleteTrack id='123' offset={0} />, { wrapper })

    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading')
  })
  it('should not display loading state when isLoading is false', () => {
    mockUseDeleteLikedTrack.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    })

    render(<DeleteTrack id='123' offset={0} />, { wrapper })

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading')
  })
})
