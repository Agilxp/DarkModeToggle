import {fireEvent, render, screen} from '@testing-library/react'
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle'
import React from 'react'
import {TvIcon} from '@heroicons/react/24/outline'

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

    test('Test match media match', () => {
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: true,
                media: query,
                onchange: null,
                addListener: jest.fn(), // deprecated
                removeListener: jest.fn(), // deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        })
        render(<DarkModeToggle/>)
        expect(document.documentElement.classList).toContain('dark')
    })

    test('Test match media not match match', () => {
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
        render(<DarkModeToggle/>)
        expect(document.documentElement.classList).not.toContain('dark')
    })

    test('Custom icons', () => {
        render(<DarkModeToggle darkIcon={TvIcon} lightIcon={TvIcon} systemIcon={TvIcon}/>)
        const dropDownDarkButton = screen.queryByLabelText('Dark Mode') as HTMLButtonElement
        expect(dropDownDarkButton).toBe(null)
        const dropDownSystemButton = screen.queryByLabelText('System Mode') as HTMLButtonElement
        expect(dropDownSystemButton).toBe(null)
        const dropDownLightButton = screen.queryByLabelText('Light Mode') as HTMLButtonElement
        expect(dropDownLightButton).toBe(null)
    })
})