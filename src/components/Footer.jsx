'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Footer({config}){
    const [year, setYear] = useState('2026');
    const footer = config?.siteFooter || {};
    return(
        <footer className="footer">
            <div className="footerInner">
                <div className="footerLeft">
                    <Link href="/" className='foorerHomes'>
                        <Image
                            src={footer.logoFooter}
                            className='footerBrand'
                            alt={config?.siteName || 'Silohon'}
                            width={280}
                            height={60}
                            loading='lazy'
                        />
                    </Link>

                    <p className="footerDesc">{footer.footerDesc}</p>

                    <div className="footerOtherLinks">
                        { footer.otherLinks?.map((social, idx) => (
                            <Link key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="sosmedItem" title={social.name}>
                                <i className={social.icon}></i>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="footerRight">
                    {footer.footerWidgets?.map((widget, idx) => (
                        <div key={idx} className="widgetCol">
                            <span className="widgetTitle">{widget.name}</span>
                            <ul className="listItemWg">
                                {widget.items?.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                    <Link href={item.url} className="itemWg">
                                        {item.name}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <div className="footerBottom">
                <p>© {year} Copyright {config.siteName}. All Reserved.</p>
            </div>
        </footer>
    )
}