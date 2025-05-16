import type {JSX} from "react";
import {NavigationBar} from "@/components/bar/navigationBar.tsx";
import {HeroSection} from "@/components/hero/heroSection.tsx";
import "@/index.css";

const Landing = (): JSX.Element => {
    const sections = [
        {
            id: 'hero',
            component: <HeroSection />,
        }
    ];
    const navList = [
        { name: 'A propos', href: '#A propos' },
        { name: 'Evenement', href: '#Evenement' },
        { name: 'Graines', href: '/shop/seeds' },
        { name: 'Plants', href: '/shop/plants' },
        { name: 'Documents Techniques', href: '/blog' },
        { name: 'FAQ', href: '#FAQ' },
    ];

    return (
        <div className="relative bg-black h-screen overflow-hidden flex flex-col scroll-smooth">
            <NavigationBar elements={navList} />
            <div className="flex flex-col flex-grow">
                {sections.map((section) => (
                    <div key={section.id} id={section.id} className="w-full h-full">
                        {section.component}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Landing;
