import QuadroClicavel from '../cardRegister';
import styles from './styles.module.css';
import Button from '../Button';

export default function CombinedComponent({ texto }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <QuadroClicavel texto={texto} />
        <div className={styles.column}>
          <h2 className={styles.title}>Detalhes do Produto</h2>
          <input className={styles.input} type="text" placeholder="Input 1" />
          <input className={styles.input} type="text" placeholder="Input 2" />
          <input className={styles.input} type="text" placeholder="Input 3" />
          <input className={styles.input} type="text" placeholder="Input 4" />
          <input className={styles.input} type="text" placeholder="Input 5" />
        </div>
        <div className={styles.column}>
          <h2 className={styles.title}>Estoque</h2>
          <input className={styles.input} type="text" placeholder="Input 1" />
          <input className={styles.input} type="text" placeholder="Input 2" />
          <input className={styles.input} type="text" placeholder="Input 3" />
          <input className={styles.input} type="text" placeholder="Input 4" />
          <input className={styles.input} type="text" placeholder="Input 5" />
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <Button placeholder={"Cadastrar Produto"} width={450} />
      </div>
    </div>
  );
}
