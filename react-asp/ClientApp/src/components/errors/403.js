import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export function Error403() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/", { replace: true });
  }

  return (
    <>
      <Alert variant="danger">
        Access denied
      </Alert>
      <Button variant="primary" onClick={handleClick}>
        Go home
      </Button>
    </>
  )
}