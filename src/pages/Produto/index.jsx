import HeaderGeral from "../../components/HeaderGeral"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css";
import { useEffect } from "react";
import api from "../../services/Api";
import { ToastError } from "../../utils/Toast";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";

export default function Produto() {

    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const { userToken } = useContext(UserContext);

    useEffect(() => {
        if (id > 0 && produto === null && userToken !== null) { 
            const getProduto = async () => {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                    let response = await api.get(`produto?id=${id}`);
                    if (response.data.isSucessful) {
                        setProduto(response.data.data);
                    } else ToastError(response.data.clientMessage);
                } catch (error) {
                    ToastError(error.message);
                }
            }
            getProduto();
        }
    }, [id, userToken, produto]);

    const navigate = useNavigate();

    return <div className={styles.container}>
        <HeaderGeral
            onClickBack={() => navigate(-1)}
        />
        <main className={styles.main}>
            <div className={styles.productItself}>
                <div>
                    <img srcSet={produto?.urlImagem} />
                </div>
                <div className={styles.details}>
                    <span>{produto?.nome}</span>
                    {produto?.valorComDesconto && <span id={styles.antigo}>R${produto?.valorComDesconto}</span>}
                    <span id={styles.atual}>R${produto?.valorUnitario}</span>
                </div>
            </div>

            <div>

            </div>
        </main>
    </div>

}