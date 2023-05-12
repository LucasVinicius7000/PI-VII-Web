import styles from "./styles.module.css";
import { useState } from "react";
import DecorationIconsTop from "./../../assets/DecorationIconsTop.svg";
import DecorationIconsBottom from "./../../assets/DecorationIconsBottom.svg";
import LocalStoreLogoCadastro from "./../../assets/LocalStoreLogoCadastro.svg";
import Input from "../../components/Input";
import IconeSenha from "./../../assets/IconeSenha.svg";
import IconeSenhaComErro from "./../../assets/IconeSenhaComErro.svg";
import IconEmail from "./../../assets/IconEmail.svg";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button";

export default function Login() {

    const [hasError, setHasError] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(true);

    return <div className={styles.container}>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section className={styles.signUpSection}>
            <img style={{ marginTop: "20px" }} src={LocalStoreLogoCadastro} alt="Logo LocalStore." />
            <span>Faça seu login para utilizar a plataforma LocalStore.</span>
            <form className={styles.formulario}>
                <Input
                    placeholder={"Email"}
                    startIcon={<img src={IconEmail} alt="Ícone usuário." />}
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
                {hasError && <span id={styles.unequalPass}>*As senhas digitadas não correspondem.</span>}
                <div className={styles.categorias}>
                    <div className={styles.box}>
                        <a>
                            <p>Esqueci minha senha</p>
                        </a>
                    </div>
                </div>
                <Button
                    placeholder={"Cadastrar"}
                />
                <div className={styles.box}>
                    <h2>Ainda não possui uma conta? <a>Clique aqui</a></h2>
                </div>
            </form>
        </section>
    </div>
}