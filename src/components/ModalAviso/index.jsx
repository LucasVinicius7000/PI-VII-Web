import Modal from 'react-modal';
import styles from "./styles.module.css";

/*
    ModalAviso: esse componente é um modal com fundo preto transparente que
    usaremos para transmitir mensagens de erro ou sucesso aos usuários.

    As props dele são: isOpen, onClick e children.

    -> isOpen: controla se o modal está visível ou não (true/false).

    -> onClick: permite definir uma ação quando o usuário clicar em qualquer parte
    do modal. (Usaremos isso para fechar o modal, a função que fecha o modal alterando
    o valor de isOpen não é implementada aqui e sim na página onde esse componente for
    chamado.) 

    -> children: define o conteúdo do modal (como o componente é reutilizável o
    conteúdo não é implementado aqui e sim na página onde o componente for chamado).

    
    Exemplo de uso:

        <ModalAviso
            isOpen={...}  
            onClick={...}
        >
            <h1>Usuário ou senha incorretos.</h1>
        </ModalAviso>

*/

export default function ModalAviso({ isOpen, onClick, children }) {

    return <Modal
        isOpen={isOpen}
        className={styles.container}
        overlayClassName={styles.overlayContainer}
    >
        <div 
            className={styles.content}
            onClick={onClick}
        >
            {children}
        </div>
    </Modal>

}