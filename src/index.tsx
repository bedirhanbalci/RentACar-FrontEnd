import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "toastr/build/toastr.css";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import { injectStore } from "./utils/interceptors/axiosInterceptors";
injectStore(store);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </>
);

reportWebVitals();
