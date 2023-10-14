import React from 'react';
import { Link } from 'react-router-dom';
import { Sundar } from '@/components/Icons/Sundar';
import { Temple } from '@/components/Icons/Temple';
import { RandomIcon } from '@/components/Icons/RandomIcon';
import { Rehat } from '@/components/Icons/Rehat';
import MultiViewHomeButton from '@/components/MultiViewHomeButton';
import { IndexIcon } from '@/components/Icons/IndexIcon';
import { SyncIcon } from '@/components/Icons/SyncIcon';
import { DesktopSync } from '@/components/Icons/DesktopSync';

const appRoutes = [{
    icon: <Sundar />,
    title: 'Sundar Gutka',
    name: 'Sundar Gutka',
    to: '/sundar-gutka'
}, {
    icon: <Temple />,
    title: "Today's Hukamnama",
    name: "Daily Hukamnama",
    to: '/hukamnama'
}, {
    icon: <RandomIcon />,
    title: "Random Shabad",
    name: "Random",
    to: '/random'
}, {
    icon: <Rehat />,
    title: "Rehat maryada",
    name: "Rehat",
    to: '/reyat-maryada'
}, {
    icon: <MultiViewHomeButton />,
    title: "Multi-view",
}, {
    icon: <IndexIcon />,
    title: "Bani Index",
    name: "Bani Index",
    to: '/index',
},  {
    icon: <SyncIcon />,
    title: "Sangat Sync",
    name: "Sangat Sync",
    to: '/sync',
}, {
    icon: <DesktopSync />,
    title: "Bani Controller",
    name: "Bani Controller",
    to: '/control',
}];

const HomePageIcons = () => {
    return (
        <>
        {appRoutes.map(appRoute => {
            if(appRoute.to) {
                return (
                        <div className="">
                            <button className="fp-buttons apps-item" aria-label={appRoute.title}>
                                <Link key={appRoute.title} to={appRoute.to}>
                                    <div className="apps-icon-container">
                                        {appRoute.icon}
                                    </div>
                                </Link>
                            </button>
                            <div className="fp-buttons-text">{appRoute.title}</div>
                        </div>
                    
                )
            }
            return (
                <div key={appRoute.title} className="">
                  {appRoute.icon}

                  <div className="fp-buttons-text">{appRoute.title}</div>
                </div>
            )
        })}
        </>
    )
}

export default HomePageIcons;