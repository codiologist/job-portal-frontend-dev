"use client";

import { useEffect, useRef, useState } from "react";

export default function MobileMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);
    const lastScrollY = useRef(0);
    const ticking = useRef(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!ticking.current) {
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;

                    if (currentScrollY < lastScrollY.current || currentScrollY < 10) {
                        setIsHeaderVisible(true);
                    } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
                        setIsHeaderVisible(false);
                        if (isMenuOpen) {
                            setIsMenuOpen(false);
                            setExpandedSections({});
                        }
                    }

                    lastScrollY.current = currentScrollY;
                    ticking.current = false;
                });
                ticking.current = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            setExpandedSections({});
        }
    };

    const toggleSection = (sectionName: string) => {
        setExpandedSections((prev) => ({
            ...prev,
            [sectionName]: !prev[sectionName],
        }));
    };

    const hasExpandedSections = Object.values(expandedSections).some(Boolean);

    return (
        // <>
        //   {/* Header */}
        //   <div
        //     className={`fixed top-0 right-0 left-0 z-999 flex items-center justify-between bg-white px-6 py-4 transition-transform duration-300 ease-out ${
        //       isHeaderVisible ? "translate-y-0" : "-translate-y-full"
        //     }`}
        //     style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}
        //   >
        //     <div className="w-32">
        //       {/* Logo */}
        //       <Link href="/">
        //         <Image src={logo} alt="Logo" className="h-auto w-38" />
        //       </Link>
        //     </div>
        //     <div className="flex items-center space-x-4">
        //       <Link href="/hire-us" aria-label="Hire Us">
        //         <CustomButton
        //           className="px-6"
        //           variant="transparent"
        //           showArrow={false}
        //         >
        //           Hire Us
        //         </CustomButton>
        //       </Link>

        //       <button
        //         onClick={toggleMenu}
        //         className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all duration-200 hover:scale-105 hover:bg-gray-800"
        //         aria-label="Toggle menu"
        //       >
        //         {isMenuOpen ? (
        //           <Image
        //             src={menu_toggler}
        //             alt="Menu Toggler"
        //             className={cn(
        //               "h-auto w-38",
        //               isMenuOpen &&
        //                 "animate-out -rotate-90 transition duration-300",
        //             )}
        //           />
        //         ) : (
        //           <Image
        //             src={menu_toggler}
        //             alt="Menu Toggler"
        //             className={cn(
        //               "h-auto w-38",
        //               !isMenuOpen && "animate-out rotate-0 transition duration-300",
        //             )}
        //           />
        //         )}
        //       </button>
        //     </div>
        //   </div>

        //   {/* Mobile Menu Overlay */}
        //   <div
        //     className={`fixed inset-0 z-999 transition-all duration-500 ease-out ${
        //       isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        //     }`}
        //     style={{
        //       backgroundColor: "rgba(0, 0, 0, 0.95)",
        //       color: "#ffffff",
        //     }}
        //   >
        //     <div
        //       className={`h-full overflow-y-auto overscroll-contain px-6 pt-20 transition-transform duration-600 ease-out ${
        //         hasExpandedSections ? "pb-20" : "pb-6"
        //       } ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        //       style={{
        //         backgroundColor: "#000000",
        //         color: "#ffffff",
        //         touchAction: "pan-y",
        //         WebkitOverflowScrolling: "touch",
        //       }}
        //     >
        //       {/* Navigation Items */}
        //       <nav
        //         className="min-h-0 space-y-0"
        //         style={{ backgroundColor: "#000000", color: "#ffffff" }}
        //       >
        //         {mobileNavigationItems?.map((item, index) => (
        //           <div
        //             key={item?.section_name}
        //             style={{ backgroundColor: "#000000" }}
        //           >
        //             {item?.hasDropdown ? (
        //               // Dropdown navigation item
        //               <>
        //                 <button
        //                   onClick={() => toggleSection(item?.section_name)}
        //                   className="flex w-full items-center gap-2 py-4 text-lg font-medium transition-all duration-300 ease-out hover:translate-x-1"
        //                   style={{ color: "#ffffff", backgroundColor: "#000000" }}
        //                 >
        //                   {item.label}
        //                   <div
        //                     className={`flex h-6 w-6 items-center justify-center transition-all duration-400 ease-out ${
        //                       expandedSections[item?.section_name]
        //                         ? "scale-110 -rotate-90"
        //                         : "scale-100"
        //                     }`}
        //                   >
        //                     <GreenBgArrow />
        //                   </div>
        //                 </button>

        //                 {/* Dropdown Submenu */}
        //                 <div
        //                   className={`overflow-hidden transition-all duration-500 ease-out ${
        //                     expandedSections[item.section_name]
        //                       ? "max-h-[800px] opacity-100"
        //                       : "max-h-0 opacity-0"
        //                   }`}
        //                   style={{ backgroundColor: "#000000" }}
        //                 >
        //                   <div
        //                     className="space-y-6 pb-4 pl-4"
        //                     style={{ backgroundColor: "#000000", color: "#ffffff" }}
        //                   >
        //                     {item?.subNavItems?.map((subItem) => (
        //                       <a
        //                         key={subItem.label}
        //                         href={subItem.href}
        //                         className="block cursor-pointer space-y-1 transition-all duration-300 ease-out hover:translate-x-1"
        //                         style={{ backgroundColor: "#000000" }}
        //                       >
        //                         <span
        //                           className="block text-base font-medium transition-colors duration-200 hover:text-green-400"
        //                           style={{
        //                             color: "#ffffff",
        //                             backgroundColor: "#000000",
        //                           }}
        //                         >
        //                           {subItem.label}
        //                         </span>
        //                         <span
        //                           className="block text-sm leading-relaxed"
        //                           style={{
        //                             color: "#9ca3af",
        //                             backgroundColor: "#000000",
        //                           }}
        //                         >
        //                           {subItem.description}
        //                         </span>
        //                       </a>
        //                     ))}
        //                   </div>
        //                 </div>
        //               </>
        //             ) : (
        //               // Simple navigation item
        //               <a
        //                 href={item.href}
        //                 className="block w-full py-4 text-left text-lg font-medium transition-all duration-300 ease-out hover:translate-x-1"
        //                 style={{ color: "#ffffff", backgroundColor: "#000000" }}
        //               >
        //                 {item.label}
        //               </a>
        //             )}
        //             {index < mobileNavigationItems.length - 1 && (
        //               <div className="h-px bg-gray-700" />
        //             )}
        //           </div>
        //         ))}
        //       </nav>

        //       {/* Book Appointment Button */}
        //       <div className="mx-auto mt-10">
        //         <Link href="/hire-us">
        //           <CustomButton variant="dark" className="px-14 text-xl">
        //             Book an appointment
        //           </CustomButton>
        //         </Link>
        //       </div>
        //     </div>
        //   </div>
        // </>
        <div>test</div>
    );
}
