"use client"

import { usePathname } from "next/navigation";
import HomeIcon from "../icons/HomeIcon";
import NotificationIcon from "../icons/NotificationIcon";
import ProfileIcon from "../icons/ProfileIcon";
import SettingsIcon from "../icons/SettingsIcon";
import LeaveIcon from "../icons/LeaveIcon";
import Link from "next/link";


interface SidebarProps {
    handleSignOut: () => void;
}

export function Sidebar({ handleSignOut }: SidebarProps) {
    const pathname = usePathname();

    const menuTabs = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: <HomeIcon /> },
        { name: 'Notifications', href: '/admin/notifications', icon: <NotificationIcon /> }
    ];

    const settingsTab = [
        { name: 'Profile', href: '#', icon: <ProfileIcon /> },
        { name: 'Settings', href: '#', icon: <SettingsIcon /> },
    ]


    return (
        <div className="flex h-full w-64 flex-col border-r bg-white">
            <div className="flex h-14 items-center justify-center border-b">
                <div className="align-middle font-bold">SAVI Admin dashboard</div>
            </div>
            <div className="flex-grow overflow-y-auto overflow-x-hidden">
                <ul className="flex flex-col space-y-1 py-4">
                    <li className="px-5">
                        <div className="flex h-8 flex-row items-center">
                            <div className="text-sm font-light tracking-wide text-gray-500">
                                Menu
                            </div>
                        </div>
                    </li>
                    {
                        menuTabs.map((item, index) => {
                            return (<li key={`${index}-${item.name}`}>
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex h-11 flex-row items-center border-l-4 pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none ${pathname === item.href ? 'border-indigo-500' : 'border-transparent'}`}

                                >
                                    <span className="ml-4 inline-flex items-center justify-center">
                                        {item.icon}
                                    </span>
                                    <span className="ml-2 truncate text-sm tracking-wide">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>)
                        })
                    }

                    <li className="px-5">
                        <div className="flex h-8 flex-row items-center">
                            <div className="text-sm font-light tracking-wide text-gray-500">
                                Settings
                            </div>
                        </div>
                    </li>
                    {
                        settingsTab.map((item, index) => {
                            return (<li key={`settings-${index}-${item.name}`}>
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative flex h-11 flex-row items-center border-l-4 pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none ${pathname === item.href ? 'border-indigo-500' : 'border-transparent'}`}

                                >
                                    <span className="ml-4 inline-flex items-center justify-center">
                                        {item.icon}
                                    </span>
                                    <span className="ml-2 truncate text-sm tracking-wide">
                                        {item.name}
                                    </span>
                                </Link>
                            </li>)
                        })
                    }
                    <li>
                        <button
                            onClick={() => handleSignOut()}
                            className="relative	flex h-11 w-full flex-row items-center border-l-4 border-transparent pr-6 text-gray-600 hover:border-indigo-500 hover:bg-gray-50 hover:text-gray-800 focus:outline-none"
                        >
                            <span className="ml-4 inline-flex items-center justify-center">
                                <LeaveIcon />
                            </span>
                            <span className="ml-2 truncate text-sm tracking-wide">
                                Logout
                            </span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
}
