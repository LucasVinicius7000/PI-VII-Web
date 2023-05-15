import React from "react";
import HeaderGeral from "../../components/HeaderGeral";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CombinedComponent from '../../components/CombinedComponenent';
import QuadroClicavel from '../../components/QuadroClicavel';
import Input from '../../components/Input';
import DropdownProduct from "../../components/Dropdown";
import InputNumber from "../../components/InputNumber";

export default function CadastroProduto() {
  return (
    <>
      <HeaderGeral
        titulo={"Cadastrar Produto"}
        url={"/homeEmpresa"}
      />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.square}>
            <h2>Cadastrar Produto</h2>
          <QuadroClicavel texto={"Insira uma Imagem"} />
          </div>
          <CombinedComponent
            componentes={[
              <Input type="text" id="Input1" name="fname" placeholder={"Nome"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input2" name="fname" placeholder={"Marca"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input3" name="fname" placeholder={"Peso"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <DropdownProduct width={"21rem"} height={"3.2rem"} options={[
                { value: '0', label: 'Hortifruti' },
                { value: '1', label: 'Padaria' },
                { value: '2', label: 'Açougue' },
                { value: '3', label: 'Frios e Laticínios' },
                { value: '4', label: 'Cereais' },
                { value: '5', label: 'Biscoitos' },
                { value: '6', label: 'Enlatadados' },
                { value: '7', label: 'Enlatados' },
                { value: '8', label: 'Bebidas' },
                { value: '9', label: 'Higiene e Limpeza' },
              ]} placeholder={"Categoria"}
                onSelect={(option) => console.log(`Você selecionou a opção: ${option.label}`)}
              />,
              <Input type="date" id="Input5" name="fname" placeholder={"Data de Validade"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,
            ]} titulo="Detalhes do Produto"
          />
          <CombinedComponent
            componentes={[
              <InputNumber titleInput="Quantidade Disponível" />,
              <Input type="text" id="Input2" name="fname" placeholder={"Valor Unitário"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input3" name="fname" placeholder={"Valor com Desconto"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input5" name="fname" placeholder={"Lote"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input1" name="fname" placeholder={"Observação/Detalhamento"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
            ]} titulo="Estoque"
          />
        </div>

        <div className={styles.buttonArea}>
          <Button text={"Cadastrar Produto"} width={'27.5rem'} />
        </div>
      </div>
    </>
  );
}
