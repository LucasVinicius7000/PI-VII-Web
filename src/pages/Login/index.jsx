import styles from "./styles.module.css";
import { useContext, useEffect, useState } from "react";
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
import ModalAviso from "../../components/ModalAviso";
import IconeErro from "./../../assets/Icone-Erro.svg";
import api from "./../../services/Api";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { UserContext } from "../../contexts/userContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

    let { setUserToken, setUserRole, setUserId, isAprooved, userRole, estabelecimentoInfo } = useContext(UserContext);
    const [hasError, setHasError] = useState(false);
    const [passIsVisible, setPassIsVisible] = useState(false);
    const [password, setPassword] = useState(null);
    const [email, setEmail] = useState(null);
    const [modalError, setModalError] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [isAwaitingAprooved, setIsAwaitingAprooved] = useState(false);
    const [modalCadastro, setModalCadastro] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (email != null && password != null) setCanSubmit(true);
    }, [email, password]);

    const handleSubmit = async () => {
        try {
            let response = await api.post("user/login", {
                email: email,
                password: password,
            });
            if (response?.data?.isSucessful) {
                ToastSucess(response?.data?.clientMessage);
                let token = response?.data?.data?.token;
                let role = response?.data?.data?.role;
                setUserToken(token);
                setUserRole(role);
                setUserId(response?.data?.data?.id);
                if (role === "Cliente") navigate("/home");
                else if (role === "Admin") { }
            } else ToastError(response?.data?.clientMessage);
        } catch (error) {
            ToastError(error.response?.data?.clientMessage);
        }
    }

    useEffect(() => {
        if (userRole === "Estabelecimento" && estabelecimentoInfo !== null) {
            if (isAprooved === 1) navigate("/homeEmpresa");
            else if (isAprooved === 0) navigate("/empresa/denied");
            else if (isAprooved === 2) navigate("/empresa/pending");
            else if (isAprooved === 3) navigate("/empresa/formulario");
        } else if (userRole === "Cliente") navigate("/home");
    }, [userRole, isAprooved, estabelecimentoInfo]);


    return <div className={styles.container}>
        <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
            <div className={styles.modalError}>
                <img src={IconeErro} alt="Ícone de erro." />
                {(email === null) && <span>* O campo <span className={styles.destaqueErro}>EMAIL</span> precisa ser preenchido com um valor válido.</span>}
                {(password === null) && <span>* O campo <span className={styles.destaqueErro}>SENHA</span> precisa ser preenchido com um valor válido.</span>}
            </div>
        </ModalAviso>
        <ModalAviso isOpen={modalCadastro} onClick={() => setModalCadastro(false)}>
            <div className={styles.modal}>
                <span>Para se cadastrar escolha uma das opções abaixo</span>
                <div className={styles.options}>
                    <div onClick={() => navigate("/cliente/cadastro")}>Cadastrar como consumidor</div>
                    <div onClick={() => navigate("/cadastroEmpresa")}>Cadastrar minha empresa</div>
                </div>
            </div>
        </ModalAviso>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section className={styles.signUpSection}>
            <img style={{ marginTop: "20px" }} src={LocalStoreLogoCadastro} alt="Logo LocalStore." />
            <span>Faça seu login para utilizar a plataforma LocalStore.</span>
            <form className={styles.formulario}>
                <Input
                    placeholder={"Email"}
                    startIcon={<img src={IconEmail} alt="Ícone usuário." />}
                    onChange={(e) => {
                        if (e.target.value !== '') {
                            setEmail(e.target.value);
                        } else setEmail(null);
                    }}
                />
                <Input
                    hasError={hasError}
                    placeholder={"Senha "}
                    passwordIsShowing={passIsVisible}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
                                style={hasError ? { color: "red", cursor: "pointer" } : { color: "#E8AF3C", cursor: "pointer" }}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
                                style={hasError ? { color: "red", cursor: "pointer" } : { color: "#E8AF3C", cursor: "pointer" }}
                            />
                    }
                    onChange={(e) => {
                        if (e.target.value !== '') {
                            setPassword(e.target.value);
                        } else setPassword(null);
                    }}
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
                    width={'100%'}
                    text={"Login"}
                    onClick={() => {
                        if (!canSubmit) {
                            setModalError(true);
                        } else {
                            handleSubmit();
                        }
                    }}
                />
                <div className={styles.box}>
                    <h2>Ainda não possui uma conta? <a onClick={() => { setModalCadastro(true); }}>Clique aqui</a></h2>
                </div>
            </form>
        </section>
    </div>
}