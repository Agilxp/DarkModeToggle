# DarkModeToggle

## What is it?

A component you can use to toggle dark mode in a React app based on Tailwind class toggling.

## Getting started

### Requirements

The component uses `@heroicons/react` and `@headlessui/react`. It also assumes that you are using Tailwind and have it
properly configured.

### Usage

```Bash
npm install --save @agilxp/dark-mode-toggle
or
yarn add @agilxp/dark-mode-toggle
```

Change the `tailwind.config.js` to

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
    // ...
    darkMode: 'class',
    // ...
}
```

And add the component where you want to toggle light/dark mode with. It should be somewhere that shows up on all pages
like navbar, header or footer.

```typescript jsx
import DarkModeToggle from 'DarkModeToggle';

<DarkModeToggle/>
```

## Properties

All props are optionals and used to override a default.

| prop name  | default             |
|------------|---------------------|
| lightIcon  | SunIcon             |
| darkIcon   | MoonIcon            |
| systemIcon | ComputerDesktopIcon |

## Capabilities

There are 3 possibilities when toggling:

- light mode
- dark mode
- system (this will change based on the system preferences)

It uses media query to check the system settings and local storage to save an eventual override.
This means that users will have their choices saved on the next visit.