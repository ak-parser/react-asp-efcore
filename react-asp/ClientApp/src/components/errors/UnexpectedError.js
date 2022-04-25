import { Alert, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";

export function UnexpectedError() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const handleClick = () => {
    navigate("/", { replace: true });
  }

  console.log("Unhandled error");

  return (
    <>
      <Alert variant="danger">
        Unexpected error<br />
        Message: {params.get("error")}
      </Alert>
      <Button variant="primary" onClick={handleClick}>
        Go home
      </Button>
    </>
  )
}