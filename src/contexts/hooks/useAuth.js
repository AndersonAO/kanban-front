import { useState, useEffect } from "react";

import api from "../../api";
import history from "../../history";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", MySwal.stopTimer);
    toast.addEventListener("mouseleave", MySwal.resumeTimer);
  },
});

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ user, password }) {
    try {
      const {
        data: { token },
      } = await api.post("/sessions", {
        username: user,
        password,
      });

      localStorage.setItem("token", JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);
      history.push("/");

      Toast.fire({
        icon: "success",
        title: "Login realizado com sucesso.",
      });
    } catch (error) {
      const message = error.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  }

  async function handleRegister({ user, password }) {
    try {
      await api.post("/users", {
        username: user,
        password,
        name: user,
      });

      Toast.fire({
        icon: "success",
        title: "Conta criada com sucesso.",
      });
    } catch (error) {
      const message = error.response.data.message;
      Toast.fire({
        icon: "error",
        title: message,
      });
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = undefined;
    history.push("/login");
  }

  return { authenticated, loading, handleLogin, handleLogout, handleRegister };
}
