import {fireEvent, render, screen} from '@testing-library/react'
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle'
import React from 'react'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

describe('Running tests for DarkModeButton', () => {
    test('Check default view', () => {
        render(<DarkModeToggle/>)
        expect(localStorage.theme).toBeUndefined()
    })

    test('Check light mode set', () => {
        render(<DarkModeToggle/>)
        const dropDownButton = screen.getByLabelText('Toggle dark mode') as HTMLButtonElement
        expect(dropDownButton).toBeTruthy()
        fireEvent.click(dropDownButton)
        const dropDownLightButton = screen.getByLabelText('Light Mode') as HTMLButtonElement
        expect(dropDownLightButton).toBeTruthy()
        fireEvent.click(dropDownLightButton)
        expect(localStorage.theme).toBe('light')
    })

    test('Check dark mode set', () => {
        render(<DarkModeToggle/>)
        const dropDownButton = screen.getByLabelText('Toggle dark mode') as HTMLButtonElement
        expect(dropDownButton).toBeTruthy()
        fireEvent.click(dropDownButton)
        const dropDownDarkButton = screen.getByLabelText('Dark Mode') as HTMLButtonElement
        expect(dropDownDarkButton).toBeTruthy()
        fireEvent.click(dropDownDarkButton)
        expect(localStorage.theme).toBe('dark')
    })

    test('Check dark mode then system set', () => {
        render(<DarkModeToggle/>)
        const dropDownButton = screen.getByLabelText('Toggle dark mode') as HTMLButtonElement
        expect(dropDownButton).toBeTruthy()
        fireEvent.click(dropDownButton)
        const dropDownDarkButton = screen.getByLabelText('Dark Mode') as HTMLButtonElement
        expect(dropDownDarkButton).toBeTruthy()
        fireEvent.click(dropDownDarkButton)
        expect(localStorage.theme).toBe('dark')
        fireEvent.click(dropDownButton)
        const dropDownSystemButton = screen.getByLabelText('System Mode') as HTMLButtonElement
        expect(dropDownSystemButton).toBeTruthy()
        fireEvent.click(dropDownSystemButton)
        expect(localStorage.theme).toBeUndefined()
    })
})