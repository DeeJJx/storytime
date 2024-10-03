import Image from 'next/image';
import Link from 'next/link';
import dl3StudioLogo from '../../public/dl3-studios.svg';

export default function Footer() {
 return (
    <footer className="footer bg-base-200 text-base-content p-10">
        <aside>
            <a href="https://www.producthunt.com/posts/cardmaster?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-cardmaster" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=493021&theme=light" alt="CardMaster - Find&#0032;Fun&#0032;Card&#0032;Games&#0032;for&#0032;Any&#0032;Number&#0032;of&#0032;Players | Product Hunt" width="250" height="54" /></a>
            <Image src={dl3StudioLogo} alt="DL3 Studios Logo" width={200} height={200} />
            <p>
            DL3 Studios Ltd.      
            </p>
        </aside>
        <nav>
            <h6 className="footer-title">Services</h6>
            <Link href="/services/design" className="link link-hover">Design</Link>
            <Link href="/services/advertisement" className="link link-hover">Advertisement</Link>
        </nav>
        <nav>
            <h6 className="footer-title">Company</h6>
            <Link href="/company/about-us" className="link link-hover">About Us</Link>
            <Link href="/company/contact" className="link link-hover">Contact</Link>
        </nav>
        <nav>
            <h6 className="footer-title">Legal</h6>
            <Link href="/legal/terms-conditions" className="link link-hover">Terms and Conditions</Link>
            <Link href="/legal/privacy" className="link link-hover">Privacy Policy</Link>
            <Link href="/legal/cookies" className="link link-hover">Cookie Policy</Link>
        </nav>
    </footer>
 )
}