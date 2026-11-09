import Link from "next/link"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: "404 Page Not Found",
    description: "Page not foud, please visit another page."
}

export default function NotFound(){
    return(
        <div className="notoundContainer">
            <span className="iconNotFounf">
                <i className="fa-solid fa-box-open"></i>
            </span>
            <h1 className="notFountTitle">404</h1>
            <p className="notFoundText">Page not found or move to another link. Plase visit another link or back to home page.</p>
            <Link href="/" className="notFoundLink">
                Back to Home
            </Link>
        </div>
    )
}