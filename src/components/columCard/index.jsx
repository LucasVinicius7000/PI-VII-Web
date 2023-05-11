import styles from './styles.module.css';
import Button from '../Button';
import QuadroClicavel from '../CardRegister';
import DropdownProduct from '../Dropdown';
import Input from '../Input';
import InputNumber from '../InputNumber';

export default function CombinedComponent({ texto }) {

  return (
    <div className={styles.container}>
      <div className={styles.containerText}>
        <h2 className={styles.title}>Detalhes do Produto</h2>
      </div>

      <div className={styles.wrapper}>

        <QuadroClicavel texto={texto} />
        <div className={`${styles.column} ${styles.spaced}`}>

          <Input endIcon={""} width={"20rem"} height={"2.9rem"} placeholder={'Nome'} backgroundColor={"#eee"} />
          <Input endIcon={""} width={"20rem"} height={"2.9rem"} placeholder={'Marca'} backgroundColor={"#eee"} />
          <Input endIcon={""} width={"20rem"} height={"2.9rem"} placeholder={'Peso'} backgroundColor={"#eee"} />
          <DropdownProduct height={"2.9rem"}
            options={[{ label: 'Limpeza', value: 'option 0' }, { label: 'Alimentos', value: 'option1' }, { label: 'Alimentos', value: 'option3' }]}
            onSelect={(option) => console.log(option)}
            placeholder="Categoria"
          />
          <Input endIcon={""} width={"20rem"} height={"2.9rem"} placeholder={'Data de Validade'} backgroundColor={"#eee"} />
        </div>
      </div>  <div className={styles.containerText}>
        <h2 className={styles.title}>Detalhes de Estoque</h2>
      </div>

      <div className={styles.wrapper}>

        <div className={`${styles.column} ${styles.spaced}`}>

          <InputNumber onValueChange={""} value={""} />
          <Input endIcon={""} width={"20rem"} height={"3.2rem"} placeholder={'Valor Unitário'} backgroundColor={"#eee"} />
          <Input endIcon={""} width={"20rem"} height={"3.2rem"} placeholder={'Valor com Desconto'} backgroundColor={"#eee"} />
          <Input endIcon={""} width={"20rem"} height={"3.2rem"} placeholder={'Lote'} backgroundColor={"#eee"} />
          <Input endIcon={""} width={"20rem"} height={"3.2rem"} placeholder={'Observação'} backgroundColor={"#eee"} />
        </div>
      </div>


      <div className={styles.buttonWrapper}>
        <Button text={"Cadastrar Produto"} onClick={""} width={280} />
      </div>

    </div>
  );

}
