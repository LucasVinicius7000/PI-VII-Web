import styles from "./styles.module.css";
import Header from "./../../components/Header";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { GoAlert } from "react-icons/go";

export default function AprovacaoNegada() {

    const { estabelecimentoId, userId } = useContext(UserContext);



    return <div className={styles.container}>
        <Header />
        <div className={styles.information}>

            <GoAlert className={styles.alert} size={40} colorRendering={"#FFFF00"} />

            <span>• Prezado usuário, agradecemos seu interesse em se cadastrar
                em nossa plataforma de divulgação de estabelecimentos e produtos
                de pequenos negócios. No entanto, após análise cuidadosa do seu formulário
                de aplicação, infelizmente, <span className={styles.denied}>não podemos aprovar sua solicitação de cadastro
                neste momento</span>😢. Entendemos que você possa estar desapontado com essa decisão,
                mas gostaríamos de ressaltar que <span className={styles.emphasis}>nosso objetivo é garantir o apoio e a
                divulgação de pequenos estabelecimentos </span> apresentados em nossa plataforma,
                proporcionando uma experiência positiva para nossos usuários.
            </span>

            <br></br>

            <span>
                • Se você acredita que houve algum equívoco ou gostaria de obter mais
                informações sobre o motivo da rejeição, sinta-se à vontade para entrar em
                contato conosco através do email <a href="mailto:equipe.localstore@gmail.com" className={styles.important}>equipe.localstore@gmail.com</a>. Teremos prazer em esclarecer quaisquer dúvidas ou fornecer
                orientações adicionais para futuras tentativas de cadastro.
            </span>

            <br></br>

            <span>
                • Agradecemos sua compreensão e esperamos que você encontre outras
                oportunidades para divulgar seus negócios e produtos. Desejamos muito sucesso
                em seus empreendimentos.
            </span>

            <br></br>

            <span>
                Atenciosamente,
                A equipe de suporte da plataforma LocalStore.💖
            </span>
            <hr></hr>
            <br></br>
            <br></br>
            <span className={styles.deleteAccount}>
                * Respeitamos sua privacidade, <span> clique aqui</span> para excluir permanentemente seus dados de cadastro.
            </span>

        </div>
    </div>

}