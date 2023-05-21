import React from "react";
import HeaderGeral from "../../components/HeaderGeral";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CombinedComponent from '../../components/CombinedComponenent';
import QuadroClicavel from '../../components/QuadroClicavel';
import Input from '../../components/Input';
import DropdownProduct from "../../components/Dropdown";
import InputNumber from "../../components/InputNumber";
import { useState } from "react";


export default function CadastroProduto() {

  const [categoria, setCategoria] = useState(null);

  return (
    <>
      <HeaderGeral
        titulo={"Cadastrar Produto"}
        url={"/homeEmpresa"}
      />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.square} id="square">
            <h2>Cadastrar Produto</h2>
            <QuadroClicavel texto={"Insira uma Imagem"} />
          </div>
          <CombinedComponent
            width={"23rem"}
            id={styles.combinedComponent2}
            componentes={[
              <Input type="text" placeholder={"Nome"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" placeholder={"Marca"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" placeholder={"Peso"} height={"3.2rem"} backgroundColor={"#eee"} />,
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
                onSelect={(option) => setCategoria(option.target.value)}
              />,
              <Input type="date" placeholder={"Data de Validade"} height={"3.0rem"} backgroundColor={"#eee"} />,
            ]} titulo="Detalhes do Produto"
          />
          <CombinedComponent
            width={"23rem"}
            id={styles.combinedComponent2}
            componentes={[
              <InputNumber titleInput="Quantidade Disponível" />,
              <Input type="text" placeholder={"Valor Unitário"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" placeholder={"Valor com Desconto"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" placeholder={"Lote"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,
              <Input type="text" placeholder={"Observação/Detalhamento"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
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
