import { render, screen, fireEvent } from '@testing-library/react';

import Modal from "./";

const onClickActionMock = vi.fn();
const onClickCancelMock = vi.fn();

const props = {
  onAction: onClickActionMock,
  onActionTitle: 'Submit',
  actionVariant: 'error',
  cancel: onClickCancelMock,
  cancelTitle: 'Cancel',
  children: <span>This is Modal</span>
};

describe('Modal', () => {
  it('Should have text children', () => {
    render(<Modal {...props} />);

    expect(screen.getByText(/This is Modal/i)).toBeInTheDocument();
  });

  it('Should have 1 button', async () => {
    const newProps = {
      ...props,
      onAction: null
    }
    render(<Modal {...newProps} />);
    const buttons = await screen.findAllByRole("button")

    expect(buttons).toHaveLength(1);
  })

  it('Should have 2 buttons', async () => {
    render(<Modal {...props} />);
    const buttons = await screen.findAllByRole("button")

    expect(buttons).toHaveLength(2);
  })

  it('Should click button cancel', () => {
    render(<Modal {...props} />);
    const onAction = screen.getByText(/Submit/i);

    fireEvent.click(onAction);

    expect(onClickActionMock).toBeCalledTimes(1);
  })

  it('Should click button cancel', () => {
    render(<Modal {...props} />);
    const onCancel = screen.getByText(/Cancel/i);

    fireEvent.click(onCancel);

    expect(onClickCancelMock).toBeCalledTimes(1);
  })
})