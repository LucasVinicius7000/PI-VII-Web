import CardCategoria from "../../components/CardCategoria";
import pao from "./../../assets/pao1.svg";
export default function Home() {
  return (
    <div>
      <CardCategoria
        texto={"asdasdsadasdasdasdasadasdasdd"}
        image={pao}
      ></CardCategoria>
      <CardCategoria texto={"teste"}></CardCategoria>
    </div>
  );
}
