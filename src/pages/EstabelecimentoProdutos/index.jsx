import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import api from "../../services/Api";
import { ToastError } from "../../utils/Toast";
import styles from "./styles.module.css";
import HeaderGeral from "./../../components/HeaderGeral";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import CardGeral from "./../../components/CardProduto";
import CardProduto from "./../../components/CardProduto";
import { useNavigate } from "react-router-dom";

export default function EstabelecimentoProdutos() {

    const { id } = useParams();
    const navigate = useNavigate();
    const { userToken } = useContext(UserContext);
    const [estabelecimentoInfo, setEstabelecimentoInfo] = useState(null);

    useEffect(() => {
        if (id && id != null && estabelecimentoInfo === null && userToken !== null && api.defaults.headers?.common?.Authorization?.length > 1) {
            const getEstabelecimentoInfo = async () => {
                let response = await api.get(`estabelecimento/info?id=${id}`);
                if (response.data.isSucessful) {
                    setEstabelecimentoInfo(response.data.data);
                }
                else ToastError(response.data.clientMessage);
            }
            getEstabelecimentoInfo();
        };
    })

    return <div className={styles.container}>
        <HeaderGeral
            url={"/home"}
        />
        <section className={styles.mainArea}>
            <div className={styles.empresaInfo}>
                {
                    estabelecimentoInfo?.urlLogoPerfil?.length > 0 && <img srcSet={estabelecimentoInfo?.urlLogoPerfil} alt="Ícone de perfil do estabelecimento." />
                }
                <div className={styles.dados}>
                    <span>{estabelecimentoInfo?.nomeFantasia}</span>
                    <span>{estabelecimentoInfo?.endereco}</span>
                    <span>{estabelecimentoInfo?.descricao}</span>
                </div>
            </div>
            <div className={styles.productArea}>
                <h2>Produtos</h2>
                <div className={styles.prodList}>
                    {
                        estabelecimentoInfo?.produtos?.map((p) => {
                            return <CardProduto
                                titulo={p?.nome}
                                image={p?.urlImagem}
                                precoAntigo={p?.valorComDesconto !== null ? 'R$ ' + p?.valorUnitario : ''}
                                preco={p?.valorComDesconto !== null ? 'R$ ' + p?.valorComDesconto : 'R$ ' + p?.valorUnitario}
                                onClick={() => { navigate(`../produto/${p?.id}`) }}
                            />
                        })
                    }
                </div>
            </div>
        </section>
    </div>

}