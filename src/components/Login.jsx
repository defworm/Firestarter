import { useState } from "react";
// import { client } from 'pg';

// const client = new Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'postgres',
//   password: 'crystal',
//   database: 'firestarter'
// });

// client.connect();


function Login(){
  const [email, setEmail] = useState("");
  const [hashedPassword, setPassword] = useState("");
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
    console.log(hashedPassword);
  }

    return (
      <div className="App">
      <header className="App-header">
        <div className="login-box">
          <h1>Log In</h1>
          <br></br>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email Here"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <label>Password</label>
            <input
              type="current-password"
              name="hashedPassword"
              placeholder="Enter Your Password Here"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            </div>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <br></br>
        
      </header>
    </div>
    );
  };
  
  export default Login;
  