import React from "react";
import Header from "../../components/Header";
import styles from "./styles.module.css";
import Button from "../../components/Button";
import CombinedComponent from '../../components/ColumCard';
import QuadroClicavel from '../../components/CardRegister';
import Input from '../../components/Input';
import DropdownProduct from "../../components/Dropdown";
import InputNumber from "../../components/InputNumber";

export default function CadastroProduto() {
  return (
    <>
      <Header />
      <div className={styles.container}>

        <div className={styles.wrapper}>


          <QuadroClicavel texto={"Insira uma Imagem"} />

          <CombinedComponent

            componentes={[
              <Input type="text" id="Input1" name="fname" placeholder={"Nome"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input2" name="fname" placeholder={"Marca"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input3" name="fname" placeholder={"Peso"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <DropdownProduct width={"21rem"} height={"3.2rem"} options={[
                { value: '1', label: 'Opção 1' },
                { value: '2', label: 'Opção 2' },
                { value: '3', label: 'Opção 3' }
              ]} placeholder={"Categoria"}
                onSelect={(option) => console.log(`Você selecionou a opção: ${option.label}`)}
              />,
              <Input type="text" id="Input5" name="fname" placeholder={"Data de Validade"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,

            ]} titulo="Detalhes do Produto"
          />

          <CombinedComponent
  
            componentes={[
              <InputNumber  />,
              <Input type="text" id="Input2" name="fname" placeholder={"Valor Unitário"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input3" name="fname" placeholder={"Valor com Desconto"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input5" name="fname" placeholder={"Lote"} width={"19rem"} height={"3.0rem"} backgroundColor={"#eee"} />,
              <Input type="text" id="Input1" name="fname" placeholder={"Observação/Detalhamento"} width={"19rem"} height={"3.2rem"} backgroundColor={"#eee"} />,
            ]} titulo="Detalhes do Produto"
          />
        </div>

        <div className={styles.buttonWrapper}>
          <Button text={"Cadastrar Produto"} onClick={""} width={350} />
        </div>
      </div>
    </>
  );
}
