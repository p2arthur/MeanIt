import ReactDOM from "react-dom/client";
import App from "./App";
import "./styling/index.css";

const rootElement: HTMLElement | null = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
}
