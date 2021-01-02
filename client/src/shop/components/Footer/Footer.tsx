import React from 'react';
import '../../styles/layout/footer.scss';

const Footer = () => {
  return (
    <footer
        className="footer"
        role="contentinfo"
        itemScope={undefined}
        itemType="http://schema.org/WPFooter"
    >

        <div className="copyright">
            <span
                itemProp="copyrightHolder"
                itemScope={undefined}
                itemType="http://schema.org/Organization"
            >
                <a
                    target="_blank"
                    rel="noreferrer"
                    itemProp="url"
                    href="https://www.petrzalesky.cz/"
                    title="Petr Zalesky"
                >                  
                    <span>Developed by</span>                  
                    <span itemProp="name">Petr Zalesky</span>
                </a>
            </span>
        </div>
    </footer>
  );
}

export default Footer;
