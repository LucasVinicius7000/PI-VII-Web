import HeaderGeral from "../../components/HeaderGeral"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css";
import { useEffect } from "react";
import api from "../../services/Api";
import { ToastError } from "../../utils/Toast";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import InputNumber from "./../../components/InputNumber";
import Input from "./../../components/Input";
import Button from "./../../components/Button";

export default function Produto() {

    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const { userToken } = useContext(UserContext);
    const [quantidadeUnitaria, setQuantidadeUnitaria] = useState(0);
    const [quantidadeEmKg, setQuantidadeEmKg] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        debugger;
        if (produto?.vendidoPor == 1 || produto?.vendidoPor == 2) {
            if (produto?.valorComDesconto != null) setTotal(produto?.valorComDesconto * quantidadeEmKg);
            else setTotal(produto?.valorUnitario * quantidadeEmKg);
        } else {
            if (produto?.valorComDesconto != null) setTotal(produto?.valorComDesconto * quantidadeUnitaria);
            else setTotal(produto?.valorUnitario * quantidadeUnitaria);
        }

    }, [quantidadeEmKg, quantidadeUnitaria, produto]);

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
                    <span title={produto?.nome}>{produto?.nome}</span>
                    {produto?.valorComDesconto != null && <> <span id={styles.antigo}>R${parseFloat(produto?.valorUnitario).toFixed(2)}</span> <span id={styles.atual}>R${parseFloat(produto?.valorComDesconto).toFixed(2)}</span> </>}
                    {produto?.valorComDesconto == null && <span id={styles.atual}>R${parseFloat(produto?.valorUnitario).toFixed(2)}</span>}
                    {
                        !produto?.vendidoPorPeso || produto?.dataValidade != null || produto?.marca != null ?
                            <div className={styles.aditionalInfo}>
                                <hr></hr>
                                {produto?.marca != null && <span>➣ Marca: {produto?.marca}</span>}
                                {produto?.vencimentoEm != null && <span>➣ Vencimento em: {new Date(produto?.vencimentoEm).toLocaleDateString("pt-BR")}</span>}
                                {produto?.peso != null && <span>➣ Peso: {produto?.peso} {produto?.unidadeMedida}</span>}
                                <span>➣ Quantidade em estoque: {produto?.quantidadeEstoque}</span>
                            </div> : () => { }
                    }
                </div>
            </div>

            <div className={styles.aside}>
                <h3>Observação</h3>
                <Input type="text" placeholder={"Digite aqui"} backgroundColor={"#eee"} />
                {
                    produto?.vendidoPor == 0 && <InputNumber noFloats limit={produto?.quantidadeEstoque} setValue={(val) => {
                        if (val <= produto?.quantidadeEstoque) setQuantidadeUnitaria(parseInt(val))
                        else {
                            ToastError("Quantidade máxima atingida.");
                        }
                    }} titleInput="Quantidade unitária" />
                }
                {
                    produto?.vendidoPor == 1 && <InputNumber interval={0.5} limit={produto?.quantidadeEstoque} setValue={(val) => {
                        if (val <= produto?.quantidadeEstoque) setQuantidadeEmKg(val)
                        else if (val >= produto?.quantidadeEstoque) {
                            ToastError("Quantidade máxima atingida.");
                        }
                    }} titleInput="Quantidade em Kg" />
                }

                {       
                    produto?.vendidoPor == 2 && <InputNumber interval={0.5} limit={produto?.quantidadeEstoque} setValue={(val) => {
                        if (val <= produto?.quantidadeEstoque) setQuantidadeEmKg(val)
                        else if (val >= produto?.quantidadeEstoque) {
                            ToastError("Quantidade máxima atingida.");
                        }
                    }} titleInput="Quantidade em litros" />
                }

                <div className={styles.carrinhoArea}>
                    <h3>
                        Valor Total: {'\u00A0'}<span>R${parseFloat(total).toFixed(2)}</span>
                    </h3>
                    <div>
                        <Button width={'100%'} text='Adicionar produto'></Button>
                    </div>
                </div>
            </div>
        </main>
    </div>

}