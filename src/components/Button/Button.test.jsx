import { render, screen, fireEvent } from '@testing-library/react'

import Button from "./"

const onClickMock = vi.fn()

const props = {
  children: <span>Tombol</span>,
  variant: 'error',
  onClick: onClickMock
}

describe('Buttons', () => {
  it('Should have text', () => {
    render(<Button {...props} />);

    expect(screen.getByText(/Tombol/i)).toBeInTheDocument();
  })

  it('Should click button', () => {
    render(<Button {...props} />);
    const onClickButton = screen.getByRole("button")

    fireEvent.click(onClickButton)

    expect(onClickMock).toBeCalledTimes(1);
  })
})