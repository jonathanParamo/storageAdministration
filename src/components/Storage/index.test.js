import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from "@testing-library/react"
import Storages from "./Storage"

test('render content', () => {
  const storage = {
    storage: storage('this is a text'),
  }

  const component = render(<Storages />)
  expect(component).toBe("name")
  fireEvent.click(screen.getByText('Create'))
  fireEvent.change(screen.getByLabelText("Name"))
})