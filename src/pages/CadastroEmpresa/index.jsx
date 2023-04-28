import BackgoundInf from "../../components/BackgroundInf";
import BackgoundSup from "../../components/BackgroundSup";
import Button from "../../components/Button";
import Input from "../../components/Input";
import styles from './styles.module.css';
import { IoAccessibility } from "react-icons/io5" ;   

//Ainda falta ajustar layout para desktop

export default function CadastroEmpresa() {
  return <div className={styles.container}>
    <br/>
  <div className={styles.imagem}><img  width={140} height={140} src="Logo.svg"/></div>
  <p>Cadastre-se sua empresa para utilizar a plataforma LocalStore.</p>

{/* <img
  src="inferior.svg"
 /> */}

 {/*  <Input
    placeholder="Nome Fantasia"
    iconRight={
      <IoAccessibility
          sx={{ color: 'red' }}
      />
  }
  /> */}
  
  <Input
    placeholder="Razão Social"
  />
  <Input
    placeholder="Nome Fantasia"
  />
  <Input
    placeholder="CNPJ"
  />
  <Input
    placeholder="Endereço"
  />
  <Input
    placeholder="Email"
  />
  <Input
    placeholder="Telefone"
  />
  <Input
    placeholder="Senha"
  />
  <Input
    placeholder="Confirmar Senha"
  />
  <Button
    type="submit" 
    text="Cadastrar"
  />
  <br/>
  <BackgoundSup/>
  <BackgoundInf/>
</div>
}