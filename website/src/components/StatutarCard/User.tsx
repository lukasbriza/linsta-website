import * as React from "react"
import { SVGProps } from "react"



export const User = (props: SVGProps<SVGSVGElement>) => (
    <svg
        width={80}
        height={80}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M50 0C28.82 0 14.729 20.62 34.446 56.992c6.65 12.27-7.188 15.17-21.209 18.408C.433 78.354-.042 84.713 0 95.833L.017 100h99.958l.017-4.037c.049-11.2-.388-17.596-13.238-20.563-14.325-3.308-27.663-6.208-21.208-18.408C85.208 19.858 70.758 0 50 0Z"
        />
    </svg>
)

