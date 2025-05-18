import splashLogo from './splash.png';

const SplashScreen = () => (
  <div
    style={{
      background: "#000",
      height: "100vh",
      width: "100vw",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 9999,
    }}
  >
    <img
      src={splashLogo}
      alt="Splash"
      style={{
        maxWidth: "80vw",
        maxHeight: "80vh",
        height: "auto",
        display: "block",
        objectFit: "contain",
        animation: "zoomIn 1s ease-in-out",
      }}
    />
    <style>
      {`
        @keyframes zoomIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}
    </style>
  </div>
);

export default SplashScreen;
