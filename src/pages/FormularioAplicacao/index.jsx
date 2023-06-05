import styles from "./styles.module.css";
import Header from "./../../components/Header";
import Search from "../../components/Search";
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import InputMask from "react-input-mask";
import FileTextEncoder from "./../../services/FileTextEncoder";
import { BuscaEnderecosPorTexto, BuscaCoordenadasPorId } from "../../services/GoogleMapsApi";
import Button from "../../components/Button";
import ModalAviso from "../../components/ModalAviso";
import IconeErro from "./../../assets/Icone-Erro.svg";
import api from "../../services/Api";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { ToastError, ToastSucess } from "../../utils/Toast";

export default function FormularioAplicacao() {

    const { estabelecimentoId, userId } = useContext(UserContext);

    const [addresses, setAddresses] = useState([]);
    const [placeId, setPlaceId] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [file, setFile] = useState(null);
    const [stringFormasPagamento, setStringFormasPagamento] = useState('3');
    const [proprietario, setProprietario] = useState('');
    const [taxaMinima, setTaxaMinima] = useState(0);
    const [valorPorKm, setValorPorKm] = useState(0);
    const [cpf, setCpf] = useState('');
    const [metodoCompra, setMetodoCompra] = useState(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [modalError, setModalError] = useState(false);
    const sessionToken = uuidv4();

    useEffect(() => {
        const setCoordinates = async () => {
            if (placeId != null) {
                let coordenadas = await BuscaCoordenadasPorId(placeId, sessionToken);
                setLatitude(coordenadas.lat);
                setLongitude(coordenadas.lng);
            }
        }
        setCoordinates();
    }, [placeId]);

    useEffect(() => {
        if (cpf !== '' && metodoCompra != null && taxaMinima > 0 && valorPorKm > 0 && proprietario !== '' && placeId != null && latitude != null && longitude != null && selectedAddress !== '' && file != null) {
            setCanSubmit(true);
        }
        else setCanSubmit(false);
    }, [cpf, metodoCompra, taxaMinima, valorPorKm, proprietario, placeId, latitude, longitude, selectedAddress, file, stringFormasPagamento]);


    const handleSubmit = async () => {
        try {
            let response = await api.post("estabelecimento/submitForm", {
                coordenadas: {
                    latitude: latitude,
                    longitude: longitude
                },
                endereco: selectedAddress,
                nomeArquivo: file?.name,
                extensaoArquivo: file?.fileExtension,
                conteudoArquivo: file?.base64.split(',')[1],
                metodoCompra: metodoCompra,
                formasPagamento: stringFormasPagamento,
                nomeProprietario: proprietario,
                valorPorKmRodado: valorPorKm,
                taxaMinima: taxaMinima,
                cpfProprietario: cpf,
                estabelecimentoId: estabelecimentoId
            });
            if (response.data.isSucessful) {
                ToastSucess("Formulário de aplicação submetido com sucesso.");
            }
            else {
                ToastError(response?.data?.clientMessage);
            }
        } catch (error) {
            ToastError("Ocorreu um erro ao submeter o formulário de aplicação.");
        }
    }

    return <div className={styles.container}>
        <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
            <div className={styles.modalError}>
                <img src={IconeErro} alt="Ícone de erro." />
                {(proprietario === '') && <span>* O campo <span className={styles.destaqueErro}>nome do proprietário</span> é obrigatório.</span>}
                {(file === null) && <span>* O <span className={styles.destaqueErro}>alvará de funcionamento</span> é obrigatório.</span>}
                {(metodoCompra === null) && <span>* O <span className={styles.destaqueErro}>método de compras (retirada e/ou entrega)</span> é obrigatório.</span>}
                {(taxaMinima === 0) && <span>* O campo <span className={styles.destaqueErro}>taxa mínima de entrega</span> é obrigatório.</span>}
                {(valorPorKm === 0) && <span>* O campo de <span className={styles.destaqueErro}>valor por km rodado</span> é obrigatório.</span>}
                {(cpf === '') && <span>O campo de <span className={styles.destaqueErro}>cpf</span> é obrigatório.</span>}
                {(latitude === null || longitude === null) && <span>O <span className={styles.destaqueErro}>endereço completo do estabelecimento</span> é obrigatório.</span>}
            </div>
        </ModalAviso>
        <Header />
        <div className={styles.information}>
            <span>• Antes de começar a usar a aplicação, queremos te conhecer um pouco melhor através do formulário de aplicação abaixo.</span>
            <span>• Após o envio do formulário faremos a análise de seus dados cadastrais e em até 48h retornaremos com a aprovação ou não da sua conta.</span>
        </div>


        <form className={styles.form}>
            <div>Formulário de aplicação*</div>
            <div className={styles.formItem} id={styles.withAddress}>
                <label>Endereço Completo do Estabelecimento:</label>
                <div className={styles.searchArea}>
                    {
                        addresses.length > 0 && <div className={styles.list}>
                            <ul>
                                {addresses.map((item) => {
                                    return <li onClick={() => {
                                        setSelectedAddress(item?.value);
                                        setPlaceId(item?.placeId);
                                        setAddresses([]);
                                    }}>
                                        {item.value}
                                    </li>
                                })}
                            </ul>
                        </div>
                    }
                    <InputMask id={styles.ul} type="text" value={selectedAddress} onChange={(e) => { setSelectedAddress(e.target.value) }}></InputMask>
                </div>
                <BsSearch style={{ cursor: "pointer" }} onClick={async () => {
                    setAddresses(await BuscaEnderecosPorTexto(selectedAddress, sessionToken));
                }}></BsSearch>
            </div>

            <div className={styles.formItem}>
                <label>Alvará de funcionamento:</label>
                <input onChange={async (e) => setFile(await FileTextEncoder(e))} accept=".pdf" id={styles.fileInput} type="file" />
            </div>

            <div className={styles.formItem}>
                <label>Quais das seguintes formas de pagamento são aceitas em seu estabelecimento:</label>
                <label>
                    <input type="checkbox" name="opcoes[]" onChange={(e) => {
                        if (e.target.checked) setStringFormasPagamento(stringFormasPagamento + e.target.value)
                        else setStringFormasPagamento(stringFormasPagamento.replace(e.target.value, ''))
                    }} value="1" /> Crédito
                </label>

                <label>
                    <input type="checkbox" name="opcoes[]" value="2" onChange={(e) => {
                        if (e.target.checked) setStringFormasPagamento(stringFormasPagamento + e.target.value)
                        else setStringFormasPagamento(stringFormasPagamento.replace(e.target.value, ''))
                    }} /> Débito
                </label>

                <label>
                    <input type="checkbox" readOnly name="opcoes[]" value="3" checked /> Dinheiro
                </label>

                <label>
                    <input type="checkbox" name="opcoes[]" value="0" onChange={(e) => {
                        if (e.target.checked) setStringFormasPagamento(stringFormasPagamento + e.target.value)
                        else setStringFormasPagamento(stringFormasPagamento.replace(e.target.value, ''))
                    }} /> Pix
                </label>

            </div>

            <div className={styles.formItem}>
                <label>As compras em seu estabelecimento são para:</label>
                <label>
                    <input type="radio" onChange={(e) => setMetodoCompra(e.target.value)} name="entrega-retirada" value="0" /> Retirada no Local e Entrega
                </label>
                <label>
                    <input type="radio" onChange={(e) => setMetodoCompra(e.target.value)} name="entrega-retirada" value="2" /> Somente Retirada no Local
                </label>
                <label>
                    <input type="radio" onChange={(e) => setMetodoCompra(e.target.value)} name="entrega-retirada" value="1" /> Somente Entrega
                </label>
            </div>

            <div className={styles.formItem} id={styles.withNumber}>
                <label>Taxa mínima de entrega (R$):</label>
                <input onChange={(e) => setTaxaMinima(parseFloat(e.target.value))} type="number"></input>
            </div>

            <div className={styles.formItem} id={styles.withNumber}>
                <label>Valor da entrega por Km rodado: (R$):</label>
                <input onChange={(e) => setValorPorKm(parseFloat(e.target.value))} type="number"></input>
            </div>

            <div className={styles.formItem} id={styles.withNumber}>
                <label>Nome Completo do Proprietário:</label>
                <input onChange={(e) => setProprietario(e.target.value)} type="text"></input>
            </div>

            <div className={styles.formItem} id={styles.withNumber}>
                <label>CPF do Proprietário:</label>
                <InputMask onChange={(e) => { setCpf(e.target.value) }} mask={"999.999.999-99"}></InputMask>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }} >
                <div className={styles.submitBtn}>
                    <Button
                        onClick={async () => {
                            if (!canSubmit) {
                                setModalError(true);
                            }
                            else await handleSubmit();
                        }}
                        text={'Enviar Formulário'}
                    />
                </div>
            </div>

            <hr />

            <span id={styles.explain}>* Os dados presentes nesse formulário servirão como forma de apurar se o seu negócio se encaixa na proposta da aplicação. Em caso de não aprovação da conta é possível solicitar a exclusão de todos os dados coletados.</span>
        </form>

    </div>

}