import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authApi } from "../services/api";

const LOGIN_PATH = "/inloggen";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const token = localStorage.getItem("accessToken");
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    if (!token) return;

    authApi.me().then(
      () => setAllowed(true),
      () => setAllowed(false)
    );
  }, [token]);

  if (!token) {
    return (
      <Navigate
        to={LOGIN_PATH}
        replace
        state={{ from: location.pathname }}
      />
    );
  }
  if (allowed === null) return <div>Loading...</div>;
  if (allowed === false) {
    localStorage.removeItem("accessToken");
    return (
      <Navigate
        to={LOGIN_PATH}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
