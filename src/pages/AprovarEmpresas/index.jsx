import styles from "./styles.module.css";
import Header from "./../../components/Header";
import { UserContext } from "../../contexts/userContext";
import { useContext, useEffect, useState } from "react";
import { ToastError, ToastSucess } from "../../utils/Toast";
import { GoAlert } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import api from "../../services/Api";

export default function AprovarEmpresas() {

    const navigate = useNavigate();
    const { estabelecimentoId, userId, userRole, userToken } = useContext(UserContext);
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
        if (userRole !== "Admin") {
            navigate('../');
        }
    }, [userRole]);

    const getEmpresas = async () => {
        try {
            let response = await api.post("estabelecimento/listarPendentes");
            if (response.data.isSucessful) {
                ToastSucess("Estabelecimentos pendentes de aprovação.");
                setEmpresas(response?.data?.data);
            }
            else {
                ToastError("Erro ao listar estabelecimentos pendentes de aprovação.");
            }
        } catch (error) {
            ToastError("Erro ao listar estabelecimentos pendentes de aprovação.")
        }
    };

    useEffect(() => {
        if (userToken != null) {
            getEmpresas();
        }
    }, [userToken]);


    const handleAprove = async (aprovado, id) => {
        try {
            let response = await api.post(`/estabelecimento/alterarStatus?aprovado=${aprovado}&id=${id}`)
            if(response.data.isSucessful){
                if(aprovado){
                    ToastSucess("Estabelecimento aprovado com sucesso.");
                }
                else {
                    ToastSucess("Estabelecimento reprovado com sucesso.")
                }
                getEmpresas();
            }
            else {
                ToastError("Erro ao alterar status de aprovação do estabelecimento.");
            }
        } catch (error) {
            ToastError("Erro ao alterar status de aprovação do estabelecimento.");
        }
    }


    return <div className={styles.container}>
        <Header />
        <div className={styles.text}>
            {
                empresas?.map((e) => {
                    return <div className={styles.estabelecimento}>
                        <span>Nome fantasia: <span>{e.nomeFantasia}</span></span>
                        <span>Razão social: <span>{e.razaoSocial}</span></span>
                        <span>CNPJ: <span>{e.cnpj}</span></span>
                        <span>Descrição: <span>{e.descricao}</span></span>
                        <span>Telefone: <span>{e.telefone}</span></span>
                        <span>CPF proprietário: <span>{e.cpfProprietario}</span></span>
                        <span>Nome propietário: <span>{e.nomeProprietario}</span></span>
                        <span>Email: <span>{e.email}</span></span>
                        <span><a target="_blank" href={e.urlAlvaraFuncionamento}>Alvará de funcionamento</a></span>
                        <div className={styles.opcoes}>
                            <div onClick={() => handleAprove(true, e?.id)} className={styles.buttonAprovacao}>Aprovar</div>
                            <div onClick={() => handleAprove(false, e?.id)} className={styles.buttonRejeicao}>Reprovar</div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>

}