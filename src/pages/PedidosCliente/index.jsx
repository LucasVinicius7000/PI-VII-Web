import HeaderGeral from './../../components/HeaderGeral';
import { useNavigate } from 'react-router-dom';
import styles from "./styles.module.css";
import { useContext, useState, useEffect } from 'react';
import { UserContext } from "./../../contexts/userContext";
import api from '../../services/Api';
import { ToastError, ToastSucess } from '../../utils/Toast';
import NavBar from '../../components/NavBar';

export default function PedidosCliente() {

    const navigate = useNavigate();
    const { userToken, clienteId } = useContext(UserContext);
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        if (clienteId !== null && clienteId !== undefined) {
            const getPedidos = async () => {
                try {
                    let response = await api.get(`pedido/lista?clienteId=${clienteId}`);
                    if (response.data.isSucessful) {
                        response.data.data.sort((a, b) => {
                            if (a.isProdutoAtual && !b.isProdutoAtual) {
                                return -1;
                            } else if (!a.isProdutoAtual && b.isProdutoAtual) {
                                return 1;
                            }
                            return 0;
                        });
                        setPedidos(response.data.data);
                        ToastSucess("Pedidos listados com sucesso!");
                    }
                    else ToastError("Falha ao listar pedidos");
                } catch (error) {
                    ToastError("Falha ao listar pedidos")
                }
            }
            getPedidos();
        }
    }, [clienteId]);



    if (clienteId !== undefined && clienteId !== null) {
        return <div>
            <HeaderGeral onClickBack={() => navigate('../home')} />
            <NavBar
                onPedidosClick={() => navigate('../pedidos')}
                onHomeClick={() => navigate('../home')}
            />
            <div className={styles.container}>
                <div>
                    <h3 style={{ fontSize: '1.5rem' }} id={styles.pattern3}>Lista de Pedidos</h3>
                </div>
                <div className={styles.containerList}>
                    <div className={styles.list}>
                        {
                            pedidos?.map((pedido) => {
                                return <div className={styles.pedido} onClick={() => {
                                    debugger;
                                    if (pedido?.isProdutoAtual) {
                                        navigate("../pedidoAtual")
                                    }
                                }}>
                                    <span>{pedido?.estabelecimento?.nomeFantasia}</span>
                                    <span>{pedido?.estabelecimento?.endereco}</span>
                                    <div id={styles.itens}>
                                        <span>Quantidade de itens: {calculateQuantidadeItemsPedido(pedido?.produtosPedidos)}</span>
                                        <span>R$ {calculateTotalPedido(pedido?.produtosPedidos)}</span>
                                    </div>
                                    <div>
                                        <div id={styles.status}>
                                            <span>Status: </span>
                                            <span style={{ color: pedido?.statusPedido == 0 ? 'yellow' : pedido?.statusPedido == 1 ? 'var(--details-4)' : pedido?.statusPedido == 3 ? 'var(--red-500)' : '' }}>{pedido?.statusPedido == 0 && '● Em Andamento'}{pedido?.statusPedido == 1 && '● Concluído'}{pedido?.statusPedido == 3 && '● Cancelado'}</span>
                                        </div>
                                        <span></span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>

            </div>
        </div>
    } else return <div></div>
}

const calculateTotalPedido = (listProdutos) => {
    let total = 0;
    listProdutos.forEach(element => {
        if (!element?.removed) {
            if (element.valorComDesconto != null) {
                total += element.valorComDesconto * element.quantidadePedido;
            }
            else {
                total += element.valorUnitario * element.quantidadePedido;
            }
        }
    });
    return parseFloat(total).toFixed(2);
}

const calculateQuantidadeItemsPedido = (listProdutos) => {
    let total = 0;
    listProdutos.forEach(element => {
        if (!element?.removed) {
            if (element.vendidoPor == 0) total += element.quantidadePedido;
            else total += 1;
        }
    });
    return total;
}