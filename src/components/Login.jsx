import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Login() {
  const [email, setEmail] = useState("");
  const [passwordDigest, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    // const loginResponse = await fetch("/login", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password}),
    // });
    // const loginData = await loginResponse.json();
    // // handle the reponse from the backend here

    // if (loginData.success) {
    //   console.log("Successful login!");
    // }
    // else {
    //   console.error("Error logging in:", loginData.error);
    // }
    console.log(email);
    console.log(passwordDigest);
  };

  return (
    <div className="login-box">
      <h1>Log In</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address </Form.Label>
          <Form.Control
            type="email"
            useref="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email address"
            />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password </Form.Label>
          <Form.Control
            type="password"
            useref="hashedPassword"
            value={hashedPassword}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            autoComplete="current-password"
            autoComplete="current-password"
            />
        </Form.Group>
        <Button variant="primary" type="submit" value="create user">
          Log In
        </Button>
      </Form>
    </div>
  );
}

export default Login;
