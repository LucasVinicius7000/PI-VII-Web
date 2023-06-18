import HeaderGeral from "../../components/HeaderGeral"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles.module.css";
import { useEffect } from "react";
import api from "../../services/Api";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import InputNumber from "./../../components/InputNumber";
import Input from "./../../components/Input";
import Button from "./../../components/Button";
import ModalAviso from "./../../components/ModalAviso";

export default function Produto() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [produto, setProduto] = useState(null);
    const { userToken, clienteId } = useContext(UserContext);
    const [quantidadeUnitaria, setQuantidadeUnitaria] = useState(0);
    const [quantidadeEmKg, setQuantidadeEmKg] = useState(0);
    const [total, setTotal] = useState(0);
    const [pedidoAtual, setPedidoAtual] = useState(undefined);
    const [hasPedidoDif, setHasPedidoDif] = useState(false);
    const [observacao, setObservacao] = useState('');

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

    useEffect(() => {
        if (clienteId != null) {
            const getPedidoAtual = async () => {
                try {
                    let response = await api.get(`pedido/atual?ClienteId=${clienteId}`);
                    if (response?.data?.isSucessful) setPedidoAtual(response.data?.data);
                    else setPedidoAtual(null);
                } catch (error) {
                    setPedidoAtual(null);
                }
            }
            getPedidoAtual();
        }
    }, [clienteId]);


    const verifyCanSubmit = async () => {
        debugger;
        if (pedidoAtual != null) {
            if (produto?.estabelecimentoId !== pedidoAtual?.estabelecimentoId) {
                setHasPedidoDif(true);
            }
            else await handleCreatePedidoOrAddProduto();
        }
        else {
            await handleCreatePedidoOrAddProduto()
        };
    };

    const handleCancelPedido = async () => {
        try {
            let response = await api.patch(`pedido/cancelar?pedidoId=${pedidoAtual?.id}`);
            if (response.data.isSucessful) {
                ToastSucess(`Pedido #${pedidoAtual?.atual} cancelado com sucesso.`);
            }
            else ToastError("Falha ao cancelar pedido atual.");
        } catch (error) {
            ToastError("Falha ao cancelar pedido atual.");
        }
    }

    const handleCreatePedidoOrAddProduto = async () => {

        if (produto == null) {
            ToastError("Produto inválido, impossível adicionar.");
            return;
        }

        if (produto?.vendidoPor == 0 && quantidadeUnitaria <= 0) {
            ToastError("A quantidade unitária deve ser maior que 0.");
            return;
        }

        if ((produto?.vendidoPor == 1 || produto?.vendidoPor == 2) && quantidadeEmKg <= 0) {
            ToastError("A quantidade deve ser maior que 0.");
            return;
        }

        let quantidade, valorUnitarioKgL;

        if (produto?.vendidoPor == 0) quantidade = quantidadeUnitaria;
        else if (produto?.vendidoPor == 1 || produto?.vendidoPor == 2) quantidade = quantidadeEmKg;

        if (produto?.valorComDesconto == null) valorUnitarioKgL = produto?.valorUnitario;
        else if (produto?.valorComDesconto == null) valorUnitarioKgL = produto?.valorComDesconto;

        try {
            debugger;
            let response = await api.post('pedido/criarOUeditar', {
                clienteId: clienteId,
                observacao: observacao,
                produtoIdOriginal: produto?.id,
                quantidadeUnidadeKgLitro: quantidade,
                valorUnitarioKgL: valorUnitarioKgL,
            });
            if (response.data.isSucessful) ToastSucess(`Produto ${produto?.nome} adicionado ao pedido com sucesso.`);
            else ToastError("Falha ao adicionar pedido.");
        } catch (error) {
            ToastError("Falha ao adicionar pedido.");
        }
    }

    if (pedidoAtual !== undefined) return <div className={styles.container}>
        <HeaderGeral
            onClickBack={() => navigate(-1)}
        />
        <ModalAviso isOpen={hasPedidoDif}>
            <div className={styles.modalError}>
                <div>
                    Você já possui itens de outro estabelecimento em seu pedido atual, deseja cancelar o pedido e iniciar outro?
                </div>
                <div className={styles.options}>
                    <div onClick={async () => {
                        await handleCancelPedido();
                        await handleCreatePedidoOrAddProduto();
                        setHasPedidoDif(false);
                    }}>Sim, cancele o pedido atual e crie um novo.</div>
                    <div onClick={() => {
                        setHasPedidoDif(false);
                    }}>Não, mantenha o pedido atual.</div>
                </div>
            </div>
        </ModalAviso>
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
                <Input type="text" onChange={(e) => setObservacao(e.target.value)} placeholder={"Digite aqui"} backgroundColor={"#eee"} />
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
                        <Button
                            width={'100%'}
                            onClick={() => {
                                verifyCanSubmit();
                            }}
                            text='Adicionar produto'></Button>
                    </div>
                </div>
            </div>
        </main>
    </div>

}