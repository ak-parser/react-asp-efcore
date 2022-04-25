import { useEffect } from "react";
import { useNavigate } from "react-router";

export function ErrorHandler({ error, resetErrorBoundary }) {
  const navigate = useNavigate();

  useEffect(() => {
    switch (error.statusCode) {
      case 401:
        navigate(`/signin?returnUrl=${error.initiatorUrl}`);
        break;
      case 403:
        navigate("/403");
        break;
      default:
        navigate(`/error?error=${error.message}`);
    }
    resetErrorBoundary();
  }, []);
}