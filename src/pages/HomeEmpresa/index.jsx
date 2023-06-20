import Button from "../../components/Button";
import Header from "../../components/Header";
import CardCategoria from "../../components/CardCategoria";
import Search from "../../components/Search";
import styles from './styles.module.css';
import CardGeral from "../../components/CardGeral";
import padaria from "./../../assets/padaria.svg";
import hortfruti from "./../../assets/hortfruti.svg";
import acougue from "./../../assets/acougue.svg";
import bebidas from "./../../assets/bebidas.svg";
import biscoitos from "./../../assets/biscoitos.svg";
import enlatados from "./../../assets/enlatados.svg";
import higiene from "./../../assets/higiene.svg";
import cereais from "./../../assets/cereais.svg";
import frios from "./../../assets/frios.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import api from "../../services/Api";
import { ToastError } from "../../utils/Toast";
import { BiUserCircle } from "react-icons/bi";
import { CgLogOut } from "react-icons/cg";
import ModalAviso from "./../../components/ModalAviso";

export default function HomeEmpresa() {

    const navigate = useNavigate();
    const { estabelecimentoId, isAprooved, setUserRole, setUserToken, userId, userRole, estabelecimentoInfo } = useContext(UserContext);


    useEffect(() => {
        if (estabelecimentoInfo == null && userId != null) {
            const getEstabelecimento = async () => {
                api.get(`estabelecimento?userId=${userId}`)
                    .then((res) => {
                        let data = res.data.data;
                        if (!res.data.isSucessful) {
                            ToastError(res.data.clientMessage);
                        }
                    }).catch((err) => {
                        ToastError("Ocorreu um erro ao recuperar informações do estabelecimento atual.");
                    })
            };
            getEstabelecimento();
        }
    }, [userId]);

    useEffect(() => {
        if (userRole === "Estabelecimento" && estabelecimentoInfo !== null) {
            if (isAprooved === 1) { }
            else if (isAprooved === 0) {
                navigate("/empresa/denied");
            }
            else if (isAprooved === 2) {
                navigate("/empresa/pending");
            }
        } else navigate("/")
    }, [userRole, isAprooved, estabelecimentoInfo]);

    return <>
        <Header other={<div className={styles.miniUserArea}>
            <span style={{ color: "var(--details-5)" }}>
                <BiUserCircle size={20} /> {estabelecimentoInfo?.nomeFantasia}
            </span>
            <CgLogOut onClick={() => {
                localStorage.setItem('lat', null);
                localStorage.setItem('lng', null);
                localStorage.setItem('token', null);
                setUserToken(null);
                setUserRole(null);
                window.location.reload();
            }} size={30} />
        </div>} />
        <div className={styles.search} >
            <Search type="text" placeholder="Qual produto você procura?" />
        </div>
        <div className={styles.botao}>
            <Button
                text={"Cadastrar Produto"}
                width={180}
                onClick={() => { navigate("/empresa/produto/cadastro") }}
            />
        </div>
        <div>
            <h2 className={styles.titulo}>Categorias</h2>
        </div>
        <div className={styles.scrollmenu}>
            <div className={styles.squares}>
                <a>
                    <CardCategoria
                        texto={"Padaria"}
                        image={padaria}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Hortfrutti"}
                        image={hortfruti}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Açougue"}
                        image={acougue}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Frios e Laticínio"}
                        image={frios}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Cereais"}
                        image={cereais}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Biscoitos"}
                        image={biscoitos}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Enlatados"}
                        image={enlatados}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Bebidas"}
                        image={bebidas}
                    />
                </a>
                <a>
                    <CardCategoria
                        texto={"Higiene e Limpeza"}
                        image={higiene}
                    />
                </a>
            </div>
        </div>
        <div className={styles.container}>
            <div className={styles.containerProdutos} style={{ alignSelf: 'flex-start', marginBottom: "2rem", marginTop: "3rem" }}>
                <h2 className={styles.titulo}>Produtos</h2>
            </div>
            <div className={styles.categorias}>
                <div className={styles.infiniteContainer}>
                    {
                        estabelecimentoInfo?.produtos.map((produto) => {
                            return <CardGeral
                                titulo={produto?.nome}
                                preco={'R$ ' + produto?.valorUnitario}
                                image={produto?.urlImagem}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    </>
}