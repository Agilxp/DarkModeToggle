import {ForwardRefExoticComponent, PropsWithoutRef, RefAttributes, SVGProps} from 'react'

export interface DarkModeToggleTypes {
    lightIcon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & RefAttributes<SVGSVGElement>>
    darkIcon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & RefAttributes<SVGSVGElement>>
    systemIcon?: ForwardRefExoticComponent<PropsWithoutRef<SVGProps<SVGSVGElement>> & { title?: string, titleId?: string } & RefAttributes<SVGSVGElement>>
}