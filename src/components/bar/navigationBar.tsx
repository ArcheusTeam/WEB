import React, {type JSX} from "react";

interface NavItem {
    name: string;
    href: string;
}

interface INavbarProps {
    elements: NavItem[];
}
const NavItem = ({ name, href } :NavItem) => {
    return (
        <li>
            <a href={href} className="hover:text-blue-500 transition-colors">
                {name}
            </a>
        </li>
    );
};

const NavigationBar: React.FC<INavbarProps> = ({elements}): JSX.Element => {
    return (
        <nav className="w-full sticky top-0 left-0 flex justify-between items-center p-6 bg-transparent text-white z-[50]">
            <div className="text-2xl font-bold">NJEY</div>
            <ul className="flex space-x-6">
                {elements.map(({name, href}, index) => (
                    <NavItem key={index} name={name} href={href}/>
                ))}
            </ul>
        </nav>
    );
};

export {NavigationBar}