import HeaderGeral from "../../components/HeaderGeral";
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../contexts/userContext';
import api from "../../services/Api";
import { ToastError } from "../../utils/Toast";

export default function PedidoAtual() {

    const navigate = useNavigate();
    const { clienteId } = useContext(UserContext);
    const [pedidoAtual, setPedidoAtual] = useState(null);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [produtosPedidos, setProdutosPedidos] = useState(null);
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        if (clienteId != null) {
            const getPedidoInfo = async () => {
                try {
                    let response = await api.get(`pedido/atual?clienteId=${clienteId}`);
                    if (response.data.isSucessful) {
                        setPedidoAtual(response.data?.data);
                        setEstabelecimento(response.data?.data?.estabelecimento);
                        setProdutosPedidos(response.data?.data?.produtosPedidos);
                        setCliente(response.data?.data?.cliente);
                    }
                    else ToastError("Falha ao buscar informações do pedido.");
                } catch (error) {
                    ToastError("Falha ao buscar informações do pedido.");
                }
            }
            getPedidoInfo();
        }
    }, [clienteId])

    if (clienteId !== null) {
        return <div className={styles.container}>
            <HeaderGeral onClickBack={() => { navigate("../pedidos") }} />
            <div className={styles.subContainer}>
                <div className={styles.estabelecimento}>
                    <img srcSet={estabelecimento?.urlLogoPerfil}></img>
                    <div>
                        <span>{estabelecimento?.nomeFantasia}</span>
                        <span onClick={() => navigate(`../home/estabelecimento/${estabelecimento?.id}`)}>Adicionar mais itens</span>
                    </div>
                </div>
                <div className={styles.produtos}>
                    {
                        produtosPedidos?.map((p) => {
                            return <div className={styles.produtoContainer}>
                                
                            </div>
                        })
                    }
                </div>
                {/* <div>
                    Forma de retirada
                </div>
                <div>
                    Forma de pagamento
                </div>
                <div>
                    Endereço de entrega
                </div>
                <div>
                    Total e Confirmar Pedido
                </div> */}
            </div>
        </div>
    }
}