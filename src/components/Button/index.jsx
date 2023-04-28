import styles from "./styles.module.css";


export default function Button({
  children,
  isLoading = false,
  height,
  width,
  text,
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
    <button
      className={alternativeStyle ? styles.alternative : styles.container}
      style={{ width: `${width}px` }}
      {...rest}
    >{text}
    </button>
  );
}
