import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddTrack } from '../../../../features/likedTracks/components/AddTrack'
import { useAddLikedTrack } from '../../../../features/likedTracks/api/addLikedTrack'

jest.mock('../../../../features/likedTracks/api/addLikedTrack', () => ({
  useAddLikedTrack: jest.fn(),
}))
const mockUseAddLikedTrack = useAddLikedTrack as jest.Mock

describe('Component AddTrack', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('Matches DOM Snapshot', () => {
    mockUseAddLikedTrack.mockReturnValue({ mutate: jest.fn() })
    const { asFragment } = render(<AddTrack id={'123'} offset={50} />)

    expect(asFragment()).toMatchSnapshot()
  })
  test('should call useAddLikedTrack with the correct arguments', async () => {
    const mockedMutationFn = jest.fn()
    mockUseAddLikedTrack.mockReturnValue({ mutate: mockedMutationFn, isLoading: false })
    render(<AddTrack id={'123'} offset={0} />)

    await userEvent.click(screen.getByRole('button'))

    expect(mockedMutationFn).toBeCalledTimes(1)
    expect(mockedMutationFn).toBeCalledWith('123')
  })
  it('should display loading state when isLoading is true', () => {
    mockUseAddLikedTrack.mockReturnValue({
      mutate: jest.fn(),
      isLoading: true,
    })

    render(<AddTrack id='123' offset={0} />)

    expect(screen.getByRole('button')).toHaveClass('ant-btn-loading')
  })
  it('should not display loading state when isLoading is false', () => {
    mockUseAddLikedTrack.mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
    })

    render(<AddTrack id='123' offset={0} />)

    expect(screen.getByRole('button')).not.toHaveClass('ant-btn-loading')
  })
})
