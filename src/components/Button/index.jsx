import styles from "./styles.module.css";

export default function Button({
  children,
  isLoading = false,
  height,
  width,
  paddingLeft,
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
    <div style={{ width: `${width}px`, paddingLeft:  `${paddingLeft}px`}}>
      <button
        className={alternativeStyle ? styles.alternative : styles.container}
        {...rest}
      >{text}
      </button>
    </div>
  );
}
