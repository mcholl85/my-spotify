import { render, screen } from '@testing-library/react'
import { useLikedTracks } from '../../../../features/likedTracks/api/getLikedTracks'
import { LikedTracksList } from '../../../../features/likedTracks/components/LikedTracksList'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import userEvent from '@testing-library/user-event'
import { PropsWithChildren } from 'react'

jest.mock('../../../../features/likedTracks/api/getLikedTracks', () => ({
  useLikedTracks: jest.fn(),
}))

const queryClient = new QueryClient()
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const mockUseLikedTracks = useLikedTracks as jest.Mock

describe('Component LikedTracksList', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should match DOM snapshots', () => {
    mockUseLikedTracks.mockReturnValue({
      data: {
        tracks: [{ key: 0, name: 'track1', cover: '', id: '123', liked: true }],
        total: 1,
      },
      isLoading: false,
      isError: false,
    })

    const { asFragment } = render(<LikedTracksList />, { wrapper })

    expect(asFragment()).toMatchSnapshot()
  })
  test('should render a 403 given isError is true', () => {
    mockUseLikedTracks.mockReturnValue({ data: {}, isLoading: false, isError: true })

    render(<LikedTracksList />)

    expect(screen.getByText('403')).toBeInTheDocument()
  })
  test('should render a loader given isLoading is true', () => {
    mockUseLikedTracks.mockReturnValue({ data: {}, isLoading: true, isError: false })

    render(<LikedTracksList />)

    expect(screen.getByText('Chargement en cours')).toBeInTheDocument()
  })
  test('should render a success message given isSuccess is true', () => {
    mockUseLikedTracks.mockReturnValue({
      data: { total: 2, tracks: [] },
      isLoading: false,
      isError: false,
    })

    render(<LikedTracksList />)

    expect(screen.getByText('Les 2 musiques Spotify ont été chargées')).toBeInTheDocument()
  })
  test.each`
    action      | text                          | liked
    ${'delete'} | ${'Enlever de Titres likés'}  | ${true}
    ${'add'}    | ${'Ajouter aux Titres likés'} | ${false}
  `('should render a $action button given the liked property is $liked ', ({ text, liked }) => {
    mockUseLikedTracks.mockReturnValue({
      data: {
        tracks: [{ key: 0, name: 'track1', cover: '', id: '123', liked }],
        total: 1,
      },
      isLoading: false,
      isError: false,
    })

    render(<LikedTracksList />, { wrapper })

    expect(screen.getByRole('button', { name: text })).toBeInTheDocument()
  })
  test('should render the track name and the cover image', () => {
    mockUseLikedTracks.mockReturnValue({
      data: {
        tracks: [{ key: 0, name: 'track1', cover: 'http://fakeUrl/', id: '123', liked: true }],
        total: 1,
      },
      isLoading: false,
      isError: false,
    })

    render(<LikedTracksList />, { wrapper })

    expect(screen.getByAltText('track1 cover')).toBeInTheDocument()
    expect(screen.getByText('track1')).toBeInTheDocument()
  })
  test('should load a new list of tracks given a click on the next page', async () => {
    mockUseLikedTracks.mockReturnValue({
      data: {
        tracks: [{ key: 0, name: 'track1', cover: 'http://fakeUrl/', id: '123', liked: true }],
        total: 51,
      },
      isLoading: false,
      isError: false,
    })

    render(<LikedTracksList />, { wrapper })
    expect(mockUseLikedTracks).toBeCalledWith({ offset: 0 })

    await userEvent.click(screen.getByText('2'))

    expect(mockUseLikedTracks).toBeCalledTimes(2)
    expect(mockUseLikedTracks).toBeCalledWith({ offset: 50 })
  })
})
