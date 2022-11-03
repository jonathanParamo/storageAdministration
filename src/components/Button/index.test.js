import {render, screen, fireEvent, getByRole} from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react';
import Button from '.'



// VERSION 1 SOBRE COMO HACER UN TEST CON DESCRIBE
describe('Test 2', () => {


  it('Render a button successfuly', () => {
    const handleClick = jest.fn();
    render(
      <Button id="delete" label="Delete" color="primary" variant="contained" size="medium" onClick={handleClick} />
    );

    const button = screen.getByRole('button');
    expect(screen.getByText('Delete')).toBeVisible(); // que es visible en la pantalla
    expect(button).toBeVisible(); // que es visible en la pantalla // lo capturamos en una constante button
  });


  it('Should call the handleClick function one time', () => {
    const handleClick = jest.fn();
    render(
      <Button id="delete" label="Delete" color="primary" variant="contained" size="medium" onClick={handleClick} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button); // usamos un fireEvent, que es como si el usuario realizara una acción, en este caso "Click".
    expect(handleClick).toBeCalledTimes(1);
    expect(handleClick).toBeCalled();
  });


  it('Button should be disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button id="Guardar" label="Guardar" color="primary" variant="outlined" size="small" onClick={handleClick} disabled />
    );

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('Button should have a color primary', () => {
    render(
      <Button id="Guardar" label="Guardar" color="primary" variant="contained" size="large" />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#17C3B2' });
  });
});


// VERSION 2 SOBRE COMO HACER UN TEST CON TEST
test('Button exists into html code', () => {
  const handleClick = jest.fn();
  // ARRANGE
  render(<Button id="delete" label="Delete" color="primary" variant="contained" size="medium" onClick={handleClick} />)

  const button = screen.getByRole('button');
  expect(screen.getByText('Delete')).toBeInTheDocument(); // que existe en el documento html
  expect(button).toBeInTheDocument(); // que existe en el documento html
})
