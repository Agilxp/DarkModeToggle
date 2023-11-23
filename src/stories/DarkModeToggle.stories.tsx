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

export const Primary: Story = () => (
    <DarkModeToggle/>
)

Primary.args = {}