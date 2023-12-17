import React from 'react';
import styles from './SplashScreen.module.css';
import { useMapDetails } from '@src/services/MapDetailsContext';

const SplashScreen: React.FC = () => {
    const { bus1, bus2 } = useMapDetails();

    return(
        (!bus1.length || !bus2.length) && (
            <div className = "relative h-screen flex items-center justify-center z-[402] bg-white">
                <div className = {"${styles['bg-custom']} h-full w-full md:w-[468px] flex items-center justify-center"}>
                    <div className="flex">
                        <div className="flex items-center justify-end w-1/2 pr-4 ">
                            <img src="/images/logo mark - light.svg" className={styles['slide-right']} width="60%" />
                        </div>
                        <div className="flex flex-col items-start justify-center">
                            <img src="/images/si.svg" className={styles['slide-left']} width="27%"  />
                            <img src="/images/biru.svg" className={styles['slide-left']} width="65%"  />
                            <img src="/images/shuttle - tracker.svg" className={styles['slide-left']} width="65%" />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default SplashScreen;