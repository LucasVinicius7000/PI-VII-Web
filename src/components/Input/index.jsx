import styles from "./styles.module.css";


export default function Input({
  children,
  isLoading = false,
  height,
  width,
  text,
  iconRight,
  alternativeStyle,
  ...rest
}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    //animationData: loadingSvg,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <>
    <input
      className={alternativeStyle ? styles.input : styles.container}
      style={{ width: `${width}px` }}
      {...rest}
    >
    </input>
    
    {iconRight && <div className={styles.iconRight}>{iconRight}</div>}
    </>
  );
}
