import React from 'react';
import styles from './styles.module.css';


export default function Loading() {
    return (
        <div className={styles.loading}>
            <svg width="59" height="96" viewBox="0 0 59 96" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_4618_520)">
                    <path d="M32.3618 0.138613C28.9664 0.869823 26.819 2.66247 25.6994 5.77601C25.2956 6.86103 25.2222 7.47431 25.2038 9.00749C25.2038 10.6822 25.2772 11.0832 25.8095 12.4748C26.9841 15.5648 29.4252 17.3339 34.7846 19.0086C36.9687 19.6926 38.0699 20.3766 38.5104 21.273C39.061 22.4052 38.6377 24.2868 38.0135 24.2868C36.6553 24.2868 36.6482 24.2868 35.2049 24.2868C33.3325 24.2868 33.6446 24.2868 31.7722 24.2868H31.1481H29.8998C28.9636 24.2868 28.0274 24.2868 26.4671 24.2868C25.2188 24.2868 24.2826 24.2868 24.2826 24.2868C24.2826 24.583 24.2826 30.5066 24.2826 31.9875C29.5904 31.9875 28.3395 31.9876 31.3157 31.9875C33.6446 31.9875 37.4642 32.0996 39.1528 31.6514C42.0711 30.8731 44.3653 28.6322 45.5399 25.4715C46.0722 24.0091 46.1273 23.6789 46.1273 21.5088C46.1273 19.4567 46.0539 18.985 45.6501 17.8528C44.402 14.4326 42.5115 12.9938 36.7301 11.1068C34.9864 10.5407 33.2979 9.90381 33.0042 9.71511C31.8479 8.96032 31.8663 7.35637 33.0042 6.34211C33.8302 5.63449 35.5004 5.6109 36.6199 6.31852C37.2807 6.71951 37.5009 7.04973 37.9781 8.32346C38.4003 9.47924 38.6205 9.83305 38.8408 9.7387C39.006 9.69153 40.4376 9.57359 41.9976 9.47924C43.5577 9.40848 44.971 9.29054 45.1362 9.21978C45.852 8.96031 44.6039 4.69099 43.3008 3.01628C42.4381 1.90767 41.2268 1.05852 39.685 0.516012C38.4553 0.067852 33.8302 -0.168026 32.3618 0.138613Z" fill="black" />
                    <path d="M11.8 15.9938V31.9875H21.162H30.524V28.1103V24.2868H27.7154H25.2188C22.0982 24.2868 19.2896 24.2868 19.2896 24.2868C19.2896 23.9907 19.2896 22.534 19.2896 11.8472V-1.90735e-06H15.4556H11.8V15.9938Z" fill="black" />
                    <path d="M3.56104 39.5938V35H55.5199V39.5938H3.56104ZM3.96571 84V64.2469H0V59.6531L3.56104 44.1875H55.439L59 59.6531V64.2469H55.0343V84H50.1783V64.2469H34.882V84H3.96571ZM8.82167 79.4062H30.0261V64.2469H8.82167V79.4062ZM4.77503 59.6531H54.225L51.716 48.7812H7.28395L4.77503 59.6531Z" fill="black" />
                </g>
                <defs>
                    <clipPath id="clip0_4618_520">
                        <rect width="59" height="96" fill="white" />
                    </clipPath>
                </defs>
            </svg>
            <div className={styles.loadingText}>Carregando</div>
            <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

