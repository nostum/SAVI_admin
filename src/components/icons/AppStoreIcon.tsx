import * as React from "react"
import { SVGProps } from "react"

const AppStoreIcon = (props: SVGProps<SVGSVGElement>) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        {...props}
    >
        <path d="m255.9 116.54 9.39-16.21c5.78-10.12 18.68-13.52 28.8-7.74 10.12 5.78 13.52 18.68 7.74 28.8l-90.32 156.39h65.34c21.16 0 33.03 24.88 23.85 42.12H109.21c-11.66 0-21.06-9.39-21.06-21.06 0-11.66 9.39-21.06 21.06-21.06h53.68l68.75-119.12-21.47-37.26a21.11 21.11 0 0 1 7.74-28.8 21.11 21.11 0 0 1 28.8 7.74l9.19 16.2zm-81.24 225.03-20.23 35.1c-5.78 10.12-18.68 13.52-28.8 7.74-10.12-5.78-13.52-18.68-7.74-28.8l15.07-26.01c16.92-5.26 30.76-1.24 41.7 11.97zm174.35-63.69h54.81c11.66 0 21.06 9.39 21.06 21.06 0 11.66-9.39 21.06-21.06 21.06h-30.45l20.54 35.61a21.11 21.11 0 0 1-7.74 28.8 21.11 21.11 0 0 1-28.8-7.74c-34.58-59.97-60.59-104.88-77.83-134.81-17.65-30.45-5.06-61.01 7.43-71.33 13.83 23.74 34.48 59.56 62.04 107.35zM256 0C114.58 0 0 114.58 0 256s114.58 256 256 256 256-114.58 256-256S397.42 0 256 0zm222.97 256c0 122.53-99.2 222.97-222.97 222.97-122.53 0-222.97-99.2-222.97-222.97 0-122.53 99.2-222.97 222.97-222.97 122.53 0 222.97 99.2 222.97 222.97z" />
    </svg>
)

export default AppStoreIcon
