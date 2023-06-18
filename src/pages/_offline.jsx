import { useEffect, useState } from 'react';
import styles from '../styles/signIn.module.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from '../hooks/useAuth';
import { useRouter } from 'next/router';

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória")
});

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const router = useRouter()

  const { signIn } = useAuth();

  const [submitCount, setSubmitCount] = useState(7);
  const [disabledTime, setDisabledTime] = useState(60);
  const [loginPageON, setLoginPageON] = useState(router.query.loginOn == 'true');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formState.submitCount == submitCount) {
      const timer = setInterval(() => setDisabledTime(oldTime => oldTime - 1), 1000);
      setTimeout(() => {
        clearInterval(timer);
        setSubmitCount(oldSubmitCount => oldSubmitCount + 7);
        setDisabledTime(60);
      }, 60000);
    }
  }, [formState.submitCount]);

  const handleSignIn = async (value, event) => {
    signIn(value.email, value.password);
    await new Promise(resolve => setTimeout(resolve, 3000), reject => console.log(reject));
  }

  return (
    <div className={styles.container} >
      <div className={styles['loginCardContainer']}>
        <div id="formLogin" disabled={!loginPageON} className={styles['fadeOnDisabled']} style={{ height: '400px' }}>
          <form hidden={!loginPageON} className={styles['loginCardContainer']} onSubmit={handleSubmit(handleSignIn)}>
            <div style={{ color: 'white', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <h1>Você está offline!</h1>
              <span style={{ fontSize: '0.875rem', color: '#6B7280', textAlign: 'center', maxWidth: 'calc(250px + 10vw)' }}>Conecte a internet.</span>
            </div>
          </form>
        </div>
        <div id="formWelcome" disabled={loginPageON} className={styles['fadeOnDisabled']} style={{ height: '430px', marginTop: '-400px' }}>
          <div hidden={loginPageON} className={styles['loginCardContainer']}>
            <img style={{ height: '75px', width: 'fit-content' }} src="/logo-move-horizontal.svg" />
            <span style={{ color: 'white', textAlign: 'center', maxWidth: 'calc(250px + 10vw)' }}>Você está offline! Conecte a internet.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
