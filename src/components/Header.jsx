'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header({config}){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

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

                    <Link href="/blog" className="actionHeader">
                        Blog
                    </Link>
                </div>
            </header>
            
            <div className="header_spacer"></div>

            <div className={`flexboxMenu ${isOpen ? 'show' : ''}`} id="fexboxMenu">
                <div className="flexboxHeader">
                    <Link className="flextoHome" href="/">
                        <Image
                            src={config?.headerLogo}
                            alt={config?.siteName}
                            className="flexBrand"
                            width={394}
                            height={80}
                            loading="eager"
                        />
                    </Link>

                    <span className="menuClose" id="closeMenu" onClick={() => setIsOpen(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                </div>

                <div className="flexboxBody2">
                    {config?.flexboxMenus?.map((menu, idx) => (
                        <div key={idx} className="flexboxGroup">
                            <Link href={menu.url || '#'} className="flexboxItem">
                                {menu.icon && <i className={`${menu.icon}`}></i>}
                                <span className="TextMenu">{menu.name}</span>
                            </Link>

                            { menu.submenus && menu.submenus.length > 0 && (
                                <div className="submenuGroup">
                                    {menu.submenus.map((sub, subIdx) => (
                                        <Link key={subIdx} href={sub.url} className="submenuItem">
                                            <i className="fa-solid fa-arrow-right-long"></i>
                                            <span className="submenuName">
                                                {sub.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}