import { render, screen, fireEvent } from '@testing-library/react'

import Card from "./"

const onClickDeleteMock = vi.fn()
const onClickUpdateMock = vi.fn()

const props = {
  contact: {
    firstName: 'Oscar',
    lastName: 'Hermawan',
    age: 17,
    photo: ''
  },
  onDelete: onClickDeleteMock,
  onUpdate: onClickUpdateMock
}

describe('Card', () => {
  it('Should have full name', () => {
    render(<Card {...props} />);

    expect(screen.getByText(/Oscar Hermawan/i)).toBeInTheDocument();
  })

  it('Should click delete button', () => {
    const { getByTestId } = render(<Card {...props} />);
    const onDeleteButton = getByTestId('test-delete')

    fireEvent.click(onDeleteButton)

    expect(screen.getByText(/Are you sure delete/i)).toBeInTheDocument();
  })

  it('Should click update button', () => {
    const { getByTestId } = render(<Card {...props} />);
    const onUpdateButton = getByTestId('test-update')

    fireEvent.click(onUpdateButton)

    expect(onClickUpdateMock).toBeCalledTimes(1);
  })
})