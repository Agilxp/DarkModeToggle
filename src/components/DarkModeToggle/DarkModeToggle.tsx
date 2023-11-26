import React, {FC, Fragment, useEffect, useState} from 'react'
import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon, ComputerDesktopIcon, MoonIcon, SunIcon} from '@heroicons/react/20/solid'
import {DarkModeToggleTypes} from './DarkModeToggle.types'

const DarkModeToggle: FC<DarkModeToggleTypes> = ({lightIcon, darkIcon, systemIcon, ...props}) => {
    const [mode, setMode] = useState({icon: lightIcon ? lightIcon : SunIcon})
    const [light] = useState({icon: lightIcon ? lightIcon : SunIcon})
    const [dark] = useState({icon: darkIcon ? darkIcon: MoonIcon})
    const [system] = useState({icon: systemIcon ? systemIcon : ComputerDesktopIcon})

    const clsx = (classes1: string, classes2: string) => {
        return `${classes1} ${classes2}`
    }

    const updateMode = () => {
        // check if the setting already exists in localstorage or not
        if ('theme' in localStorage) {
            // if the setting exist in local storage, use it
            if (localStorage.theme === 'dark') {
                document.documentElement.classList.add('dark')
                setMode({icon: dark.icon})
            } else {
                document.documentElement.classList.remove('dark')
                setMode({icon: light.icon})
            }
        } else {
            // if not, check if we can get it from the media query
            if (window) {
                const mql = window.matchMedia('(prefers-color-scheme: dark)')
                if (mql.matches) {
                    document.documentElement.classList.add('dark')
                    setMode({icon: dark.icon})
                } else {
                    document.documentElement.classList.remove('dark')
                    setMode({icon: light.icon})
                }
            }
        }
    }

    const addChangeModeListener = () => {
        if (window) {
            const mql = window.matchMedia('(prefers-color-scheme: dark)')
            mql.addEventListener('change', () => {
                // dark mode if local storage has the setting or not in local storage and media query matches
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && mql.matches)) {
                    document.documentElement.classList.add('dark')
                    setMode({icon: dark.icon})
                } else {
                    document.documentElement.classList.remove('dark')
                    setMode({icon: light.icon})
                }
            })
        } else {
            setTimeout(addChangeModeListener, 500)
        }
    }

    useEffect(() => {
        addChangeModeListener()
        updateMode()
    }, [])

    const changeMode = (value: string) => {
        if (value === 'system') {
            localStorage.removeItem('theme')
        } else {
            localStorage.theme = value
        }
        updateMode()
    }

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <Menu.Button
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    aria-label={'Toggle dark mode'}
                >
                    <mode.icon className="h-5 w-5 text-gray-400" aria-hidden="true" aria-label={'mode icon'}/>
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true"/>
                </Menu.Button>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-10 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    onClick={() => changeMode('light')}
                                    className={clsx(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm w-full'
                                    )}
                                    aria-label={'Light Mode'}
                                >
                                    <light.icon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    Light
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    onClick={() => changeMode('dark')}
                                    className={clsx(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm w-full'
                                    )}
                                    aria-label={'Dark Mode'}
                                >
                                    <dark.icon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    Dark
                                </button>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({active}) => (
                                <button
                                    onClick={() => changeMode('system')}
                                    className={clsx(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'group flex items-center px-4 py-2 text-sm w-full'
                                    )}
                                    aria-label={'System Mode'}
                                >
                                    <system.icon
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    System
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default DarkModeToggle