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

export default function CadastroProduto() {

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

  useEffect(() => {
    if (!canSubmit) {
      if (nome != null && peso != null && categoria != null && quantidade != null && valorUnitario != null && imagemPrincipal != null) {
        setCanSubmit(true);
      }
    }
  }, [canSubmit, nome, peso, categoria, quantidade, valorUnitario, imagemPrincipal]);

  const handleSetQuantidade = (value) => {
    setQuantidade(value);
  }



  return (
    <>
      <HeaderGeral
        titulo={"Cadastrar Produto"}
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
        <div className={styles.wrapper}>
          <div className={styles.square} id="square">
            <h2>Cadastrar Produto</h2>
            <QuadroClicavel handleImage={(value) => setImagemPrincipal(value)} texto={"Insira uma Imagem"} />
          </div>
          <CombinedComponent
            width={"23rem"}
            id={styles.combinedComponent2}
            componentes={[
              <Input type="text" onChange={(e) => setNome(e.target.value)} placeholder={"Nome"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" onChange={(e) => setMarca(e.target.value)} placeholder={"Marca"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" onChange={(e) => setPeso(e.target.value)} placeholder={"Peso"} height={"3.2rem"} backgroundColor={"#eee"} />,
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
                onSelect={(option) => setCategoria(option.value)}
              />,
              <InputDate
                value={dataValidade}
                onChange={(date) => setDataValidade(date)}
                placeholder={"Data de Validade"}
                backgroundColor={"#eee"} />,
            ]} titulo="Detalhes do Produto"
          />
          <CombinedComponent
            width={"23rem"}
            id={styles.combinedComponent2}
            componentes={[
              <InputNumber setValue={handleSetQuantidade} titleInput="Quantidade Disponível" />,
              <Input onlyNumbers={true} value={valorUnitario} onChange={(e) => {
                setValorUnitario(e.target.value);
              }} placeholder={"Valor Unitário"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input onlyNumbers={true} value={valorComDesconto} onChange={(e) => {
                setValorComDesconto(true);
              }} placeholder={"Valor com Desconto"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" onChange={(e) => setLote(e.target.value)} placeholder={"Lote"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,
              <Input type="text" onChange={(e) => setObservacao(e.target.value)} placeholder={"Observação/Detalhamento"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
            ]} titulo="Estoque"
          />
        </div>

        <div className={styles.buttonArea}>
          <Button
            text={"Cadastrar Produto"}
            width={'27.5rem'}
            onClick={() => {
              if (!canSubmit) {
                setModalError(true);
              }
              else {

              }
            }}
          />
        </div>
      </div>
    </>
  );
}
