'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header({config}){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const [theme, setTheme] = useState('light');
    useEffect(() => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        setTheme(currentTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return(
        <>
            <header className="header" id="header">
                <div className="headerInner">
                    <div className="hLeft">
                        <span className="menuOpen" id="menuOpen" onClick={() => setIsOpen(true)}>
                            <i className="fa-solid fa-bars"></i>
                        </span>
                        <Link href="/" className="brandUrl">
                            <Image
                                src={config?.headerLogo}
                                className="brandImage"
                                alt={config?.siteName}
                                width={394}
                                height={80}
                                loading="eager"
                            />
                        </Link>
                    </div>

                    <nav className="navMenus">
                        {config?.navLinks?.map((link, index) => {
                            const isActive = pathname === link.url;
                            return(
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`navlink ${isActive ? 'active' : ''}`}
                                >
                                    <i className={link.icon} style={{ color: link.hex }}></i>
                                    <span className="menu_name">{link.name}</span>
                                </Link>
                            )
                        })}
                    </nav>

                    <button type="button" className="sideMode" onClick={toggleTheme}>
                        { theme === 'light' ? <i className="fa-solid fa-moon"></i> : <i className="fa-solid fa-sun"></i>}
                    </button>
                </div>
            </header>
            <div className="header_spacer"></div>
        </>
    )
}