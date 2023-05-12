import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import DecorationIconsTop from "./../../assets/DecorationIconsTop.svg";
import DecorationIconsBottom from "./../../assets/DecorationIconsBottom.svg";
import LocalStoreLogoCadastro from "./../../assets/LocalStoreLogoCadastro.svg";
import Input from "../../components/Input";
import IconeUsuario from "./../../assets/IconeUsuario.svg";
import IconeSenha from "./../../assets/IconeSenha.svg";
import IconeSenhaComErro from "./../../assets/IconeSenhaComErro.svg";
import IconEmail from "./../../assets/IconEmail.svg";
import IconTelefone from "./../../assets/IconTelefone.svg";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button";
import { MdEmail } from "react-icons/md";
import ModalAviso from "./../../components/ModalAviso";
import IconeErro from "../../assets/Icone-Erro.svg";
import api from "../../services/api";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { useNavigate } from "react-router-dom";

export default function CadastroEmpresa() {

    const navigate = useNavigate();
    const [hasError, setHasError] = useState(false);
    const [invalidEmail, setInvalidEmail] = useState(undefined);
    const [passIsVisible, setPassIsVisible] = useState(true);
    const [canSubmit, setCanSubmit] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmation, setConfirmation] = useState('');
    const [modalError, setModalError] = useState(false);

    useEffect(() => {
        if (invalidEmail === false && senha !== '' && senha === confirmation && name !== '' && telefone !== '') {
            setCanSubmit(true);
        } else setCanSubmit(false);
    }, [invalidEmail, senha, confirmation, name, telefone])


    const handleSubmit = async () => {
        await api.post("/cliente/cadastro", {
                name: name,
                userName: telefone + Math.random(),
                senha: senha,
                email: email,
                telefone: telefone,
        }).then((response)=>{
            if(response?.data?.isSucessful){
                ToastSucess(response?.data?.clientMessage);
                navigate("/");
            }
        }).catch((error)=>{
            ToastError(error?.response.data?.clientMessage);
        })



    }


    return <div className={styles.container}>
        <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
            <div className={styles.modalError}>
                <img src={IconeErro} alt="Ícone de erro." />
                {name === '' && <span>* O campo <span className={styles.destaqueErro}>NOME</span> precisa ser preenchido com um valor válido.</span>}
                {telefone === '' && <span>* O campo <span className={styles.destaqueErro}>TELEFONE</span> precisa ser preenchido com um valor válido.</span>}
                {email === '' && <span>* O campo <span className={styles.destaqueErro}>EMAIL</span> precisa ser preenchido com um valor válido.</span>}
                {invalidEmail && <span> * O <span className={styles.destaqueErro}>EMAIL</span> digitado não é válido.</span>}
                {senha !== confirmation && <span>* As <span className={styles.destaqueErro}>SENHAS</span> digitadas não correspondem.</span>}
                {(senha === '' || confirmation === '') && <span>* O campo <span className={styles.destaqueErro}>SENHA</span> precisa ser preenchido com um valor válido.</span>}
            </div>
        </ModalAviso>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section className={styles.signUpSection}>
            <img style={{ marginTop: "20px" }} src={LocalStoreLogoCadastro} alt="Logo LocalStore." />
            <span>Cadastre-se para utilizar a plataforma LocalStore.</span>
            <form className={styles.formulario}>
                <Input
                    placeholder={"Nome Completo"}
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                    startIcon={<img src={IconeUsuario} alt="Ícone usuário." />}
                />
                <Input
                    hasError={invalidEmail}
                    placeholder={"Email"}
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (e.target.value.includes("@") || e.target.value === '') setInvalidEmail(false);
                        else setInvalidEmail(true);
                    }}
                    startIcon={!invalidEmail ?
                        <img src={IconEmail} alt="Ícone usuário." />
                        : <MdEmail size={23} color="red" />
                    }
                />
                <Input
                    placeholder={"Telefone"}
                    value={telefone}
                    onChange={(e) => {
                        let { value } = e.target;
                        if (!isNaN(value[value.length - 1]) || value === '') {
                            setTelefone(e.target.value);
                        }
                    }}
                    startIcon={<img src={IconTelefone} alt="Ícone usuário." />}
                />
                <Input
                    hasError={hasError}
                    placeholder={"Senha "}
                    passwordIsShowing={passIsVisible}
                    value={senha}
                    onChange={(e) => {
                        setSenha(e.target.value);
                        if (e.target.value !== confirmation) setHasError(true)
                        else setHasError(false);
                    }}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                className={styles.eyes}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                                onClick={() => setPassIsVisible(false)}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                className={styles.eyes}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                                onClick={() => setPassIsVisible(true)}
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
                    value={confirmation}
                    passwordIsShowing={passIsVisible}
                    onChange={(e) => {
                        setConfirmation(e.target.value);
                        if (e.target.value !== senha) setHasError(true)
                        else setHasError(false);
                    }}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                className={styles.eyes}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                                onClick={() => setPassIsVisible(false)}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                className={styles.eyes}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                                onClick={() => setPassIsVisible(true)}
                            />
                    }
                    startIcon={
                        hasError ?
                            <img src={IconeSenhaComErro} alt="Ícone senha com erro." /> :
                            <img src={IconeSenha} alt="Ícone senha." />
                    }
                />
                {hasError && <span id={styles.unequalPass}>*As senhas digitadas não correspondem.</span>}
                {invalidEmail && <span id={styles.unequalPass}>*O email digitado não é valido.</span>}
                <Button
                    width={'100%'}
                    text={"Cadastrar"}
                    onClick={() => {
                        if (canSubmit) {
                            handleSubmit();
                        } else {
                            setModalError(true);
                        }
                    }}
                />
            </form>
            <p className={styles.brr}></p>
        </section>
    </div>
}