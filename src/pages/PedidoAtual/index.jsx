import HeaderGeral from "../../components/HeaderGeral";
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from './../../contexts/userContext';
import api from "../../services/Api";
import { ToastError, ToastSucess } from "../../utils/Toast";
import CardProdutoPedido from "../../components/CardProdutoPedido";
import { BuscarEnderecoPorCoordenadas, BuscaEnderecosPorTexto, BuscaCoordenadasPorId } from "../../services/GoogleMapsApi";
import Search from "./../../components/Search";
import { v4 as uuidv4 } from 'uuid';
import { BsGeoAlt, BsSearch, BsWhatsapp, BsTrash } from "react-icons/bs";
import ModalAviso from './../../components/ModalAviso';
import IconeErro from "./../../assets/Icone-Erro.svg";
import PedidoConfirmado from "./../../assets/pedidoConfirmado.svg";

export default function PedidoAtual() {

    const navigate = useNavigate();
    const { clienteId, enderecoCliente, userCoordinates, setEnderecoCliente, setUserCoordinates } = useContext(UserContext);
    const [pedidoAtual, setPedidoAtual] = useState(null);
    const [estabelecimento, setEstabelecimento] = useState(null);
    const [produtosPedidos, setProdutosPedidos] = useState(null);
    const [cliente, setCliente] = useState(null);
    const [formaEntrega, setFormaEntrega] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState(null);
    const [thisFormaPIs, setThisFormaPIs] = useState(null);
    const [distancia, setDistancia] = useState(0);
    const [updatingAddress, setUpdatingAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [addressSelected, setAddressSelected] = useState();
    const [modalError, setModalError] = useState(false);
    const [confirmPedido, setConfirmPedido] = useState(false);

    const handleSearch = async () => {
        setAddresses(await BuscaEnderecosPorTexto(addressSelected, uuidv4()));
    }

    const handleSelection = async (item) => {
        debugger;
        setAddressSelected(item.value);
        setEnderecoCliente(item.value);
        let coordinates = await BuscaCoordenadasPorId(item.placeId, uuidv4());
        localStorage.setItem('lat', coordinates?.lat);
        localStorage.setItem('lng', coordinates?.lng);
        setUserCoordinates(coordinates);
        setAddresses([]);
        setUpdatingAddress(false);
    }

    const handleIncrementOrDecrement = async (idPedido, idProdutoPedido, operacao, quantidadeAtual, quantidadeMax) => {

        if (operacao == '+') {
            debugger;
            if ((quantidadeAtual + 1) > quantidadeMax) {
                ToastError("Quantidade máxima disponível atingida.");
                return;
            }
        }

        try {
            debugger;
            if (operacao === "+") operacao = "add";
            let response = await api.post(`pedido/alterar?pedidoId=${idPedido}&produtoPedidoId=${idProdutoPedido}&operacao=${operacao}`);
            if (response.data.isSucessful) {
                getPedidoInfo();
            } else ToastError("Erro ao alterar quantidade do produto.");

        } catch (error) {
            ToastError("Erro ao alterar quantidade do produto.");
        }
    }

    const handleRemover = async (idPedido, idProdutoPedido) => {
        try {
            let response = await api.delete(`pedido/removerProdutoPedido?pedidoId=${idPedido}&produtoPedidoId=${idProdutoPedido}`);
            if (response.data.isSucessful) {
                getPedidoInfo();
            } else ToastError("Erro ao remover produto.");

        } catch (error) {
            ToastError("Erro ao remover produto.");
        }
    }

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

    const calculateTotalPedido = (listProdutos) => {
        if (listProdutos == undefined || listProdutos == null || listProdutos.length <= 0) return;
        let total = 0;
        debugger;
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

        if (formaEntrega == 'Entrega') {
            total += estabelecimento?.taxaMinimaEntrega + (estabelecimento?.taxaKmRodado * distancia);
        }

        return parseFloat(total).toFixed(2);
    }

    const concluirPedido = async () => {
        try {
            let response = await api.post(`pedido/confirmar?idPedido=${pedidoAtual?.id}`);
            if (response.data.isSucessful) {
                ToastSucess("Pedido confirmado com sucesso.");
                return true;
            }
            else ToastError(response.data.clientMessage);
            return false;
        } catch (error) {
            ToastError(error.response.data.clientMessage);
            return false;
        }
    }

    const handleWhatsAppClick = async () => {
        let produtos = '\n ';
        let taxa = formaEntrega == 'Entrega' ? parseFloat(estabelecimento?.taxaMinimaEntrega + (estabelecimento?.taxaKmRodado * distancia)).toFixed(2) + '*\n' : '0,00*\n';
        produtosPedidos?.map((p) => {
            debugger;
            let valor = parseFloat(p?.valorComDesconto != null ? p?.valorComDesconto : p?.valorUnitario).toFixed(2);
            if (!p?.removed) {
                if (p?.vendidoPor == 0) {
                    produtos += ' *● ' + p?.quantidadePedido + 'x ' + p.nome.trim() + '* _(R$' + valor + ')_\n';
                }
                else if (p?.vendidoPor == 1) {
                    produtos += ' *● ' + p?.quantidadePedido + 'kg ' + p.nome.trim() + '* _(R$' + valor + ')_\n';
                }
                else if (p?.vendidoPor == 2) {
                    produtos += ' *● ' + p?.quantidadePedido + 'L ' + p.nome.trim() + '* _(R$' + valor + ')_\n';
                }
                produtos += ' ';
            }
        });
        let enderecoOuRetirada = formaEntrega == 'Entrega' ? '🏡 ' + 'Entrega em: ' + enderecoCliente : formaEntrega == 'Retirada no local' ? '⬇️ Retirada no local: ' + estabelecimento?.endereco : '';
        let pagamento = formaPagamento == 0 ? 'Pix' : formaPagamento == 1 ? 'Cartão de Crédito' : formaPagamento == 2 ? 'Cartão de Débito' : formaPagamento == 3 ? 'Dinheiro' : '';
        let charInvisble = '\u200B';
        let message = '\n' + charInvisble + '🏪 *Resumo do Pedido Via _LocalStore App_*\n\n' +
            '📦 ' + 'Pedido nº #' + pedidoAtual?.id + '\n' +
            '👤 ' + pedidoAtual?.cliente?.nome + '\n' +
            '💵 ' + pagamento + '\n' +
            enderecoOuRetirada + '\n\n' +
            '*――――――« 🛒 ITENS »――――――*\n' +
            produtos + '\n' +
            '―――――――« 📋 TOTAL »―――――――\n\n' +
            'Taxa de entrega: *R$ ' + taxa +
            'Total: *R$ ' + calculateTotalPedido(pedidoAtual?.produtosPedidos) + '*\n\n' + '✅';

        const url = `https://api.whatsapp.com/send?phone=55${estabelecimento?.telefone}&text=${encodeURIComponent(message)}`;
        if(await concluirPedido()){
            window.open(url);
            setConfirmPedido(true);
        } else return;
        
    };


    useEffect(() => {
        if (userCoordinates != null && estabelecimento) {
            const getDistanciaClienteEstabelecimento = async () => {
                try {
                    let response = await api.post(`cliente/distanciaClienteEstabelecimento`, {
                        coodernadasCliente: {
                            latitude: userCoordinates?.lat,
                            longitude: userCoordinates?.lng
                        },
                        coodernadasEstabelecimento: {
                            latitude: estabelecimento?.latitude,
                            longitude: estabelecimento?.longitude
                        }
                    });
                    debugger;
                    if (response.data.isSucessful) {
                        setDistancia(response.data?.data?.distanciaEmKm);
                    } else ToastError("Erro ao calcular distâncias.");
                } catch (error) {
                    ToastError("Erro ao calcular distâncias.");
                }
            }
            getDistanciaClienteEstabelecimento();
        }
    }, [userCoordinates, estabelecimento]);

    useEffect(() => {
        if (enderecoCliente == null && userCoordinates != null) {
            const setEndereco = async () => {
                setEnderecoCliente(await BuscarEnderecoPorCoordenadas(userCoordinates?.lat, userCoordinates?.lng));
            }
            setEndereco();
        }
    }, [enderecoCliente, userCoordinates]);

    useEffect(() => {
        if (clienteId != null) {
            getPedidoInfo();
        }
    }, [clienteId])

    if (clienteId !== null) {
        return <div className={styles.container}>
            <HeaderGeral onClickBack={() => { navigate("../pedidos") }} />
            <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
                <div className={styles.modalError}>
                    <img src={IconeErro} alt="Ícone de erro." />
                    {formaPagamento == null && <span>* Selecione uma <span className={styles.destaqueErro}>forma de pagamento</span>.</span>}
                    {formaEntrega == null && <span>* Selecione se o pedido deve ser entregue <span className={styles.destaqueErro}>ou</span> será retirado no local.</span>}
                </div>
            </ModalAviso>
            <ModalAviso isOpen={confirmPedido} onClick={() => navigate("../home")}>
                <div className={styles.modalError}>
                    <img src={PedidoConfirmado} alt="Ícone de confirmação." />
                    <span>Pedido Confirmado!</span>
                </div>
            </ModalAviso>
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
                            if (!p?.removed) {
                                return <CardProdutoPedido
                                    onClickMinus={() => { handleIncrementOrDecrement(p?.pedidoId, p?.id, '-', p?.quantidadePedido, p?.quantidadeMax) }}
                                    onClickMore={() => { handleIncrementOrDecrement(p?.pedidoId, p?.id, "+", p?.quantidadePedido, p?.quantidadeMax) }}
                                    onClickTrash={() => { handleRemover(p?.pedidoId, p?.id) }}
                                    image={p?.urlImagem}
                                    titulo={p?.nome}
                                    quantidade={p?.quantidadePedido + (p?.vendidoPor == 1 ? 'kg' : p?.vendidoPor == 2 ? 'L' : '')}
                                    preco={p?.valorComDesconto != null ? 'R$ ' + parseFloat(p?.valorComDesconto).toFixed(2) : 'R$ ' + parseFloat(p?.valorUnitario).toFixed(2)}
                                />
                            }
                        })
                    }
                </div>
                <div className={styles.formaPagamento}>
                    <h3>Forma de pagamento</h3>
                    <div className={styles.formas}>
                        {
                            estabelecimento?.formasPagamentoAceitas.includes('3') && <div style={{ backgroundColor: thisFormaPIs == 3 && '#41C900', color: thisFormaPIs == 3 ? '#ffffff !important' : '#7A1818' }} onClick={() => {
                                setFormaPagamento(3);
                                setThisFormaPIs(3);
                            }}><span>Dinheiro Físico</span></div>
                        }
                        {
                            estabelecimento?.formasPagamentoAceitas.includes('2') && <div style={{ backgroundColor: thisFormaPIs == 2 && '#41C900', color: thisFormaPIs == 2 ? '#ffffff !important' : '#7A1818' }} onClick={() => {
                                setFormaPagamento(2);
                                setThisFormaPIs(2);
                            }}><span>Débito</span></div>
                        }
                        {
                            estabelecimento?.formasPagamentoAceitas.includes('1') && <div style={{ backgroundColor: thisFormaPIs == 1 && '#41C900', color: thisFormaPIs == 1 ? '#ffffff !important' : '#7A1818' }} onClick={() => {
                                setFormaPagamento(1);
                                setThisFormaPIs(1);
                            }}><span>Crédito</span></div>
                        }
                        {
                            estabelecimento?.formasPagamentoAceitas.includes('0') && <div style={{ backgroundColor: thisFormaPIs == 0 && '#41C900', color: thisFormaPIs == 0 ? '#ffffff !important' : '#7A1818' }} onClick={() => {
                                setFormaPagamento(0);
                                setThisFormaPIs(0);
                            }}><span>Pix</span></div>
                        }
                    </div>
                </div>


                <div className={styles.formaPagamento}>
                    <h3>Forma de retirada</h3>
                    <div className={styles.formas}>
                        <div onClick={() => setFormaEntrega('Retirada no local')} style={{ backgroundColor: formaEntrega == 'Retirada no local' && '#41C900', color: formaEntrega == 'Retirada no local' ? '#ffffff !important' : '#7A1818' }}><span>Retirada no local</span></div>
                        <div onClick={() => setFormaEntrega('Entrega')} style={{ backgroundColor: formaEntrega == 'Entrega' && '#41C900', color: formaEntrega == 'Entrega' ? '#ffffff !important' : '#7A1818' }}><span>Entrega</span></div>
                    </div>
                </div>

                {
                    formaEntrega == 'Entrega' && <div id={styles.endereco} className={styles.formaPagamento}>
                        <h3>Endereço de entrega:</h3>
                        <span style={{ color: 'var(--black-02)' }}>{enderecoCliente}</span>
                        <span style={{ color: 'var(--black-02)' }}>* Endereço incorreto? <span onClick={() => setUpdatingAddress(!updatingAddress)} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'var(--details-1)' }}>Clique aqui para editar</span>.</span>
                        <div>
                            {
                                updatingAddress && <Search
                                    listItemsResult={addresses}
                                    value={addressSelected}
                                    onChange={(e) => setAddressSelected(e.target.value)}
                                    onSearch={() => handleSearch()}
                                    onClickItemList={(item) => handleSelection(item)}
                                    decoIcon={<BsGeoAlt />}
                                    searchIcon={<BsSearch size={35} style={{ paddingRight: "1rem", cursor: "pointer" }} />}
                                    placeholder={"Busque seu endereço aqui.."}
                                />
                            }
                        </div>
                        <h3>Taxa de entrega:</h3>
                        <span style={{ color: 'var(--black-02)' }}>R$ {parseFloat(estabelecimento?.taxaMinimaEntrega + (estabelecimento?.taxaKmRodado * distancia)).toFixed(2)}</span>
                    </div>
                }
                <div className={styles.formaPagamento} id={styles.totalArea}>
                    <div id={styles.total}>
                        <h3>Total Pedido: </h3>
                        <span>
                            R${calculateTotalPedido(pedidoAtual?.produtosPedidos)}
                        </span>
                    </div>
                    <div className={styles.totalButtons}>
                        <span>Cancelar Pedido <BsTrash style={{ position: 'relative', top: '.3rem' }} size={20} /></span>
                        <span onClick={() => {
                            if (formaEntrega == null || formaPagamento == null) {
                                setModalError(true);
                            }
                            else {
                                handleWhatsAppClick()
                            }
                        }}>Confirmar pedido no WhatsApp <BsWhatsapp style={{ position: 'relative', top: '.3rem' }} size={20} /></span>
                    </div>
                </div>
            </div>
        </div>
    }
}


