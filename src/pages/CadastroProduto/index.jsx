import React, { useEffect } from "react";
import HeaderGeral from "../../components/HeaderGeral";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CombinedComponent from '../../components/CombinedComponenent';
import QuadroClicavel from '../../components/QuadroClicavel';
import Input from '../../components/Input';
import DropdownProduct from "../../components/Dropdown";
import InputNumber from "../../components/InputNumber";
import { useState } from "react";
import InputDate from "../../components/InputDate";
import ModalAviso from "../../components/ModalAviso";
import IconeErro from "./../../assets/Icone-Erro.svg";
import api from "../../services/Api";
import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";
import InputWithDropDown from "./../../components/InputWithDropDown";

export default function CadastroProduto() {

  let navigate = useNavigate();
  let { estabelecimentoId, estabelecimentoInfo, userRole, isAprooved } = useContext(UserContext);
  const [nome, setNome] = useState(null);
  const [marca, setMarca] = useState(null);
  const [peso, setPeso] = useState(null);
  const [categoria, setCategoria] = useState(null);
  const [dataValidade, setDataValidade] = useState(null);
  const [quantidade, setQuantidade] = useState(null);
  const [valorUnitario, setValorUnitario] = useState(null);
  const [valorComDesconto, setValorComDesconto] = useState(null);
  const [lote, setLote] = useState(null);
  const [observacao, setObservacao] = useState(null);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);
  const [canSubmit, setCanSubmit] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [formaVenda, setFormaVenda] = useState(0);
  const [unidadeMedida, setUnidadeMedida] = useState('g')

  useEffect(() => {
    if (!canSubmit) {
      if (nome != null && peso != null && categoria != null && quantidade != null && valorUnitario != null && imagemPrincipal != null) {
        setCanSubmit(true);
      }
    }
  }, [canSubmit, nome, peso, categoria, quantidade, valorUnitario, imagemPrincipal]);

  const handleSetQuantidade = (value) => {
    if(formaVenda === 0){
      setQuantidade(parseInt(value));
    }
    else{
      if(formaVenda === 2) setUnidadeMedida('litro(s)')
      else if(formaVenda === 3) setUnidadeMedida('kg')
      setQuantidade(value);
    };
  }

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

  useEffect(() => {
    if (formaVenda === 2) {
      setUnidadeMedida('litro(s)');
      setPeso(1);
    }
    else if(formaVenda === 1){
      setUnidadeMedida('kg');
      setPeso(1);
    }
  }, [formaVenda]);

  const submit = async () => {
    try {
      debugger;
      let response = await api.post("produto/cadastrar", {
        estabelecimentoId: estabelecimentoId,
        nome: nome,
        marca: marca,
        peso: peso,
        quantidadeEstoque: quantidade,
        categoria: categoria,
        vencimentoEm: dataValidade,
        valorUnitario: valorUnitario,
        valorComDesconto: valorComDesconto,
        lote: lote,
        observacao: observacao,
        nomeArquivoImagem: imagemPrincipal?.name,
        extensaoArquivoImagem: imagemPrincipal?.fileExtension,
        conteudoArquivoImagem: imagemPrincipal?.base64.split(',')[1],
        vendidoPor: formaVenda,
        UnidadeMedida: unidadeMedida
      });

      if (response.data?.isSucessful) {
        navigate("/homeEmpresa");
        ToastSucess(response?.data?.clientMessage);
      }
      else ToastError(response?.data?.clientMessage);

    } catch (error) {
      if (error.response) {
        ToastError(error.response.data.clientMessage);
      }
      else {
        ToastError(error.message);
      }

    }
  };

  return (
    <>
      <HeaderGeral
        titulo={""}
        url={"/homeEmpresa"}
      />
      <div className={styles.container}>
        <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
          <div className={styles.modalError}>
            <img src={IconeErro} alt="Ícone de erro." />
            {(nome === null) && <span>* O campo <span className={styles.destaqueErro}>NOME</span> é obrigatório.</span>}
            {(peso === null) && <span>* O campo <span className={styles.destaqueErro}>PESO</span> é obrigatório.</span>}
            {(categoria === null) && <span>* O campo <span className={styles.destaqueErro}>CATEGORIA</span> é obrigatório.</span>}
            {(quantidade === null) && <span>* O campo <span className={styles.destaqueErro}>QUANTIDADE DISPONÍVEL</span> é obrigatório.</span>}
            {(valorUnitario === null) && <span>* O campo <span className={styles.destaqueErro}>VALOR UNITÁRIO</span> é obrigatório.</span>}
            {(valorUnitario <= 0) && <span>O campo <span className={styles.destaqueErro}>VALOR UNITÁRIO</span> precisa ser maior que 0.</span>}
            {(imagemPrincipal === null) && <span>* O produto precisa possuir pelo menos uma <span className={styles.destaqueErro}>imagem</span>.</span>}
          </div>
        </ModalAviso>

        <div className={styles.productArea}>
          <h2>Cadastrar Produto</h2>
          <QuadroClicavel handleImage={(value) => setImagemPrincipal(value)} texto={"Insira uma Imagem"} />
        </div>

        <div className={styles.details}>
          <h2>Detalhes do produto</h2>
          <Input type="text" onChange={(e) => setNome(e.target.value)} placeholder={"Nome"} height={"3.2rem"} backgroundColor={"#eee"} />
          <Input type="text" onChange={(e) => setMarca(e.target.value)} placeholder={"Marca"} height={"3.2rem"} backgroundColor={"#eee"} />
          <InputWithDropDown setInternal={peso} onChangeText={(e)=>setPeso(e.target.value)} type={'number'} placeholder={'Peso'} selected={unidadeMedida}>
            <div onClick={()=>{setUnidadeMedida('ml')}}>ml</div>
            <div onClick={()=>{setUnidadeMedida('litro(s)')}}>litro(s)</div>
            <div onClick={()=>{setUnidadeMedida('g')}}>g</div>
            <div onClick={()=>{setUnidadeMedida('kg')}}>kg</div>
          </InputWithDropDown>
          {/* <Input onlyNumbers={true} onChange={(e) => setPeso(e.target.value)} placeholder={"Peso (Kg)"} height={"3.2rem"} backgroundColor={"#eee"} /> */}
          <DropdownProduct height={"3.2rem"}
            options={[
              { value: '0', label: 'Hortifruti' },
              { value: '1', label: 'Padaria' },
              { value: '2', label: 'Açougue' },
              { value: '3', label: 'Frios e Laticínios' },
              { value: '4', label: 'Cereais' },
              { value: '5', label: 'Biscoitos' },
              { value: '6', label: 'Enlatadados' },
              { value: '7', label: 'Bebidas' },
              { value: '8', label: 'Higiene e Limpeza' },
            ]} placeholder={"Categoria"}
            onSelect={(option) => {
              debugger;
              setCategoria(option.value)
            }}
          />
          <InputDate
            value={dataValidade}
            onChange={(date) => setDataValidade(date)}
            placeholder={"Data de Validade"}
            backgroundColor={"#eee"} />
        </div>

        <div className={styles.estoque}>
          <h2>Estoque</h2>
          <div className={styles.vendidoPor}>
            <span>Vendido por:</span>
            <div className={styles.optionsVendidoPor}>
              <input onChange={() => setFormaVenda(0)} type='radio' name="vendido" value={'0'}></input>Unidade
              <input onChange={() => setFormaVenda(1)} type='radio' name="vendido" value={'1'}></input>Kg
              <input onChange={() => setFormaVenda(2)} type='radio' name="vendido" value={'2'}></input>Litro
            </div>
          </div>
          <InputNumber noFloats setValue={handleSetQuantidade} titleInput={formaVenda === 0 ? "Unidades em estoque" : formaVenda === 1 ? "Kg em estoque" : formaVenda === 2 ? "Litro(s) em estoque" : ''} />
          <Input onlyNumbers={true} value={valorUnitario} onChange={(e) => {
            setValorUnitario(e.target.value);
          }} placeholder={`Valor por ${formaVenda === 0 ? 'Unidade' : formaVenda === 1 ? 'Kg' : formaVenda === 2 ? 'Litro' : ''}`} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />
          <Input onlyNumbers={true} value={valorComDesconto} onChange={(e) => {
            setValorComDesconto(e.target.value);
          }} placeholder={"Valor com Desconto"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />
          <Input type="text" onChange={(e) => setObservacao(e.target.value)} placeholder={"Observação/Detalhamento"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />

        </div>


        <div className={styles.buttonArea}>
          <Button
            text={"Cadastrar Produto"}
            width={'27.5rem'}
            onClick={async () => {
              if (!canSubmit) {
                setModalError(true);
              }
              else {
                await submit();
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
