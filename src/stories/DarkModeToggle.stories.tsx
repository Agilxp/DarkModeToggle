import {Meta, StoryObj} from '@storybook/react'
import DarkModeToggle from '../components/DarkModeToggle/DarkModeToggle'
import React from 'react'


const meta: Meta<typeof DarkModeToggle> = {
    component: DarkModeToggle,
    title: 'Dark Mode Toggle',
    argTypes: {}
}
export default meta

type Story = StoryObj<typeof DarkModeToggle>

export const Simple: Story = () => (
    <div className={'m-5 ml-14'}>
        <DarkModeToggle/>
        <div className={'border-2 dark:bg-gray-800 mt-10 w-64 text-center p-5'}>
            <span className={'dark:text-white'}>To show that something is changing</span>
        </div>
    </div>
)

Simple.args = {}
