# CSS MODULES

    - Vamos usar CSS em módulos, ao invés de estilos globais para evitar arquivos css muito grandes e com estilos conflitantes.

        1 - Para cada componente isolado ou componente de página crie na pasta do componente
        ou página um arquivo styles.module.css;

        2 - Dentro do componente importe da seguinte forma: 
            "import styles from './styles.module.css';"

        3 - No arquivo css escreva seus estilos normalmente e para aplica-los no componente e/ou página faça da seguinte forma para classes:
         -> "className={styles.NomeDaClasse}"
        ou assim para Ids: "id={styles.NomeDoId}"

# O que é "children" ?

    - A palavra children no react é um termo que se refere ao elemento filho de um outro elemento.

    - Se você ver uma função de componente ou página com uma prop "children", isso significa que esse componente pode renderizar um filho dentro dele.

        Exemplo: 

        export default funcion MeuComponente({ children }) {
            return <div>
                {children}
            </div>
        }

        Definimos um componente chamado MeuComponente, ele é formado por uma div e children é o filho dessa div. Porém children só está definido, mas não implementado, pois a implementação do children é feita no momento em que ele é chamado na página desejada.

        Isso quer dizer que ao chamar o componente MeuComponente em outra página da aplicação você pode definir o conteúdo filho (children) que ficará dentro dele.

        Exemplo:

            ~~~jsx
            <MeuComponente>
                <p>eu sou o children</p>
            </MeuComponete>
            ~~~
