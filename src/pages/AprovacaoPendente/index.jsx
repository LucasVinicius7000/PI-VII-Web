import styles from "./styles.module.css";
import Header from "./../../components/Header";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { GoAlert } from "react-icons/go";

export default function AprovacaoPendente() {

    const { estabelecimentoId, userId } = useContext(UserContext);


    return <div className={styles.container}>
        <Header />
        <div className={styles.text}>
            ⌛ Estamos analisando sua solicitação de cadastro. Em até 48h você receberá o retorno de sua solicitação.😉
        </div>
    </div>

}