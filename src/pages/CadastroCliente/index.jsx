import styles from "./styles.module.css";
import { useState } from "react";
import DecorationIconsTop from "./../../assets/DecorationIconsTop.svg";
import DecorationIconsBottom from "./../../assets/DecorationIconsBottom.svg";
import LocalStoreLogoCadastro from "./../../assets/LocalStoreLogoCadastro.svg";
import Input from "../../components/Input";
import IconeUsuario from "./../../assets/IconeUsuario.svg";
import IconeSenha from "./../../assets/IconeSenha.svg";
import IconeSenhaComErro from "./../../assets/IconeSenhaComErro.svg";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

export default function CadastroCliente() {

    const [hasError, setHasError] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(true);

    return <div className={styles.container}>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section className={styles.signUpSection}>
            <img src={LocalStoreLogoCadastro} alt="Logo LocalStore." />
            <span>Cadastre-se para utilizar a plataforma LocalStore.</span>
            <form className={styles.formulario}>
                <Input
                    placeholder={"Nome Completo"}
                    startIcon={<img src={IconeUsuario} alt="Ícone usuário." />}
                />
                <Input
                    placeholder={"Email"}
                    startIcon={<img src={IconeUsuario} alt="Ícone usuário." />}
                />
                <Input
                    placeholder={"Telefone"}
                    startIcon={<img src={IconeUsuario} alt="Ícone usuário." />}
                />
                <Input
                    hasError={hasError}
                    placeholder={"Senha "}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            />
                    }
                    startIcon={
                        hasError ?
                            <img src={IconeSenhaComErro} alt="Ícone senha com erro." /> :
                            <img src={IconeSenha} alt="Ícone senha." />
                    }
                />
                <Input
                    hasError={hasError}
                    placeholder={"Confirmar Senha"}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            />
                    }
                    startIcon={
                        hasError ?
                            <img src={IconeSenhaComErro} alt="Ícone senha com erro." /> :
                            <img src={IconeSenha} alt="Ícone senha." />
                    }
                />
                {hasError && <span id={styles.unequalPass}>*As senhas digitadas não correspondem.</span>}
            </form>
        </section>
    </div>
}