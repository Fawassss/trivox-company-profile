import Link from "next/link";

const Navbar = () => {
    const menuItems = [
        { name: "HOME", href: "/" },
        { name: "WORK", href: "/work" },
        { name: "SERVICES", href: "/services" },
        { name: "TESTIMONIALS", href: "/testimonials" },
        { name: "CONTACT", href: "/contact" },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center bg-transparent mix-blend-difference">
            <div className="w-full max-w-[1440px] h-[194px] flex items-start justify-between px-4 md:px-6 pt-[24px] pb-[24px] relative">
                {/* Left Side: Brand Name */}
                <div className="flex-1">
                    <Link href="/" className="inline-block">
                        <h1 className="font-poppins font-bold text-[24px] leading-[1.1] text-white uppercase">
                            TRIVOX STUDIO
                        </h1>
                    </Link>
                </div>

                {/* Center: Logo */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[32px] flex flex-col items-center">
                    <Link href="/" className="block">
                        <svg width="48" height="35" viewBox="0 0 132 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M70 96H34L70 51.5C79.9615 39.2317 78.2119 35.8024 58.5 37L0 40V34.5C48.2716 12.1955 77.0228 4.349 131.5 0L124 14.5C96.381 13.7889 81.8107 15.7949 58.5 26.5C81.2282 20.5638 93.0796 18.0868 95 32L70 96Z" fill="#FFFFFF" />
                        </svg>
                    </Link>
                </div>

                {/* Right Side: Vertical Menu */}
                <div className="flex-1 flex justify-end">
                    <ul className="flex flex-col items-end space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className="font-poppins font-medium text-[16px] leading-[1.1] text-white hover:text-zinc-400 transition-colors uppercase tracking-wider"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );


};

export default Navbar;
