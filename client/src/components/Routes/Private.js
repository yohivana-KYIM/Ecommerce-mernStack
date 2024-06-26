import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();
  // Récupérer l'URL de l'API à partir des variables d'environnement
  const apiUrl = process.env.REACT_APP_API;
  useEffect(() => {
    const authCheck = async () => {
      // const res = await axios.get("/api/v1/auth/user-auth");
      const res = await axios.post(`${apiUrl}/api/v1/auth/user-auth`);
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
