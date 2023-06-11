import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import DecorationIconsTop from "./../../assets/DecorationIconsTop.svg";
import DecorationIconsBottom from "./../../assets/DecorationIconsBottom.svg";
import LocalStoreLogoCadastro from "./../../assets/LocalStoreLogoCadastro.svg";
import Input from "../../components/Input";
import IconeUsuario from "./../../assets/IconeUsuario.svg";
import IconeSenha from "./../../assets/IconeSenha.svg";
import IconeSenhaComErro from "./../../assets/IconeSenhaComErro.svg";
import IconFantasia from "./../../assets/IconFantasia.svg";
import IconCNPJ from "./../../assets/IconCNPJ.svg";
import IconEndereco from "./../../assets/IconEndereco.svg";
import IconEmail from "./../../assets/IconEmail.svg";
import IconTelefone from "./../../assets/IconTelefone.svg";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import Button from "../../components/Button";
import api from "../../services/Api";
import IconeErro from "../../assets/Icone-Erro.svg";
import { ToastError, ToastSucess } from "../../utils/Toast";
import ModalAviso from "../../components/ModalAviso";
import { useNavigate } from "react-router-dom";

export default function CadastroEmpresa() {

    const navigate = useNavigate();
    const [canSubmit, setCanSubmit] = useState(false);
    const [confirmSenha, setConfirmSenha] = useState(null);
    const [hasError, setHasError] = useState(false);
    const [modalError, setModalError] = useState(false);
    const [formCadastro, setFormCadastro] = useState({
        userName: '',
        email: '',
        senha: '',
        nomeFantasia: '',
        razaoSocial: '',
        cnpj: '',
        telefone: '',
        confirmSenha: ''
    });
    const [passIsVisible, setPassIsVisible] = useState(false);

    const verifyFields = () => {
        if (formCadastro.cnpj !== '' && formCadastro.email !== '' && formCadastro.senha !== '' && formCadastro.nomeFantasia !== '' && formCadastro.razaoSocial !== '' && formCadastro.telefone !== '') {
            setCanSubmit(true);
        } else setCanSubmit(false);
    };

    useEffect(() => {
        verifyFields();
    }, [canSubmit, formCadastro])

    const handleSubmit = async () => {
        try {

            formCadastro.userName = formCadastro.email + Math.random();
            let response = await api.post("estabelecimento/cadastrar", formCadastro);
            let data = response.data;
            if (data?.isSucessful) {
                navigate("/");
                ToastSucess("Cadastro realizado com sucesso!");
            }
            else ToastError("Ocorreu um erro ao cadastrar.");

        } catch (error) {
            ToastError("Ocorreu um erro desconhecido ao cadastrar. Tente novamente mais tarde.");
        }
    }

    return <div className={styles.container}>
        <ModalAviso isOpen={modalError} onClick={() => setModalError(false)}>
            <div className={styles.modalError}>
                <img src={IconeErro} alt="Ícone de erro." />
                {formCadastro.cnpj === '' && <span>* O campo <span className={styles.destaqueErro}>CNPJ</span> precisa ser preenchido com um valor válido.</span>}
                {formCadastro.telefone === '' && <span>* O campo <span className={styles.destaqueErro}>telefone</span> precisa ser preenchido com um valor válido.</span>}
                {formCadastro.email === '' && <span>* O campo <span className={styles.destaqueErro}>e-mail</span> precisa ser preenchido com um valor válido.</span>}
                {formCadastro.nomeFantasia === '' && <span> * O <span className={styles.destaqueErro}>nome fantasia</span> precisa ser preenchido com um valor válido.</span>}
                {formCadastro.senha !== formCadastro.confirmSenha && <span>* As <span className={styles.destaqueErro}>SENHAS</span> digitadas não correspondem.</span>}
                {formCadastro.razaoSocial === '' && <span>* O campo <span className={styles.destaqueErro}>razão social</span> precisa ser preenchido com um valor válido.</span>}
            </div>
        </ModalAviso>
        <img id={styles.iconTop} alt="Ícones diversos no topo." src={DecorationIconsTop} />
        <img id={styles.iconBottom} alt="Ícones diversos no topo." src={DecorationIconsBottom} />
        <section className={styles.signUpSection}>
            <img style={{ marginTop: "20px" }} src={LocalStoreLogoCadastro} alt="Logo LocalStore." />
            <span>Cadastre sua empresa para utilizar a plataforma LocalStore.</span>
            <form className={styles.formulario}>
                <Input
                    placeholder={"Razão Social"}
                    startIcon={<img src={IconeUsuario} alt="Ícone usuário." />}
                    onChange={(e) => {
                        formCadastro.razaoSocial = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                />
                <Input
                    placeholder={"Nome Fantasia"}
                    startIcon={<img src={IconFantasia} alt="Ícone usuário." />}
                    onChange={(e) => {
                        formCadastro.nomeFantasia = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                />
                <Input
                    mask={"99.999.999/9999-99"}
                    placeholder={"CNPJ"}
                    startIcon={<img src={IconCNPJ} alt="Ícone usuário." />}
                    onChange={(e) => {
                        formCadastro.cnpj = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                />
                <Input
                    placeholder={"Endereço"}
                    startIcon={<img src={IconEndereco} alt="Ícone usuário." />}
                />
                <Input
                    placeholder={"Email"}
                    onChange={(e) => {
                        formCadastro.email = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                    startIcon={<img src={IconEmail} alt="Ícone usuário." />}
                />
                <Input
                    placeholder={"Telefone"}
                    onlyNumbers
                    startIcon={<img src={IconTelefone} alt="Ícone usuário." />}
                    onChange={(e) => {
                        formCadastro.telefone = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                />
                <Input
                    hasError={hasError}
                    placeholder={"Senha "}
                    passwordIsShowing={passIsVisible}
                    onChange={(e) => {
                        formCadastro.senha = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
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
                    passwordIsShowing={passIsVisible}
                    onChange={(e) => {
                        formCadastro.confirmSenha = e.target.value;
                        setFormCadastro(formCadastro);
                        verifyFields();
                    }}
                    endIcon={
                        passIsVisible ?
                            <AiFillEye
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
                                style={hasError ? { color: "red" } : { color: "#E8AF3C" }}
                            /> :
                            <AiFillEyeInvisible
                                size={32}
                                onClick={() => setPassIsVisible(!passIsVisible)}
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

                <Button
                    text={"Cadastrar"}
                    onClick={async () => {
                        verifyFields();
                        if (!canSubmit) {
                            setModalError(true);
                        } else {
                            await handleSubmit();
                        }
                    }}
                />
                <br />
            </form>
        </section>
    </div>
}