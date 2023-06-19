import styles from "./styles.module.css";
import { AiOutlineUnorderedList, AiOutlineHeart } from 'react-icons/ai';
import { FiShoppingBag } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function NavBar({ onHomeClick, onPedidosClick, onMinhaContaClick }) {

    const location = useLocation();
    const { pathname } = location;
    console.log(pathname);
    const routes = ['home', 'account', 'pedidos']
    const [whoIsOrange, setWhoIsOrange] = useState('');

    useEffect(() => {
        if (pathname.includes('home')) { setWhoIsOrange('home') }
        else if (pathname.includes('account')) { setWhoIsOrange('account') }
        else if (pathname.includes('pedidos')) { setWhoIsOrange('pedidos') }
    }, [pathname]);

    return <div className={styles.container}>

        <div style={{ color: whoIsOrange === 'home' && 'var(--details-1)' }} onClick={onHomeClick}>
            <AiOutlineUnorderedList />
            <span>Home</span>
        </div>

        <div style={{ color: whoIsOrange === 'pedidos' && 'var(--details-1)' }} onClick={onPedidosClick}>
            <FiShoppingBag />
            <span >Pedidos</span>
        </div>

        <div style={{ color: whoIsOrange === 'account' && 'var(--details-1)' }} onClick={onMinhaContaClick}>
            <AiOutlineHeart />
            <span>Minha Conta</span>
        </div>
    </div>
};
