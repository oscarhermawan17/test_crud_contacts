import { render, fireEvent } from '@testing-library/react'

import Form from "./"

const value = {
  firstName: '',
  lastName: '',
  age: '',
  photo: ''
}

const props = {
  onChange: (onChangeValue) => {
    value[onChangeValue.entity] = onChangeValue.value;
  },
  value
}

describe('Form', () => {
  it('Input should change', async () => {
    // const { getByTestId } = render(<Form {...props} />);
    
    // console.log('props before onchange ======= ', props)
    // const inputFirstName = getByTestId('test-firstName');
    // fireEvent.change(inputFirstName, { target: { value: 'Bob' } });

    // const { rerender } = render(<Form {...props} />);
    // rerender(<Form {...props} />);
    // expect(inputFirstName.value).toBe('Bob');
  })
})