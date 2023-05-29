import styled from "styled-components";
import Button from "../styledcomponents/button";
import FormControl from "@/styledcomponents/formcontrol";
import Input from "@/styledcomponents/input";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = styled.div`
  border: 1px solid black;
  width: 750px;
  margin: auto;
  margin-top: 160px;
  padding: 20px 40px;
  border-radius: 5px;
  @media (max-width: 769px) {
    width: 90%;
    margin-top: 80px;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const H3 = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  font-size: 30px;
  margin: 30px 10px;
`;

const Label = styled.label`
  font-size: 17px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;


const Div = styled.div`
display: flex;
@media (max-width: 769px) {
  display: flex;
  flex-direction: column;
  }
`
const ErrorLabel = styled.label`
    color: red;
`
export default function Signup() {

    const [accounts, setAccounts] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        password: "",
        password2: "",
    });

    const [errors, setErrors] = useState(false);
    const [emailValidated, setEmailValidated] = useState(false);
    const [confirmPassValidated, setconfirmPassValidated] = useState(false);
    const [disableButton, setButton] = useState(false);

    const checkEmail = (e) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if (emailRegex.test(e)) {
          setEmailValidated(true);
          return false;
        } else {
          setEmailValidated(false);
          return true;
        }
    };

    useEffect(() => {
        if (
          checkFields() ||
          emailValidated === false ||
          confirmPassValidated === false
        ) {
          setButton(true);
        } else {
          setButton(false);
          console.log(accounts);
        }
    }, [handleInput]);  

    function handleInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        console.log(value)

        if (name === "password2" && value.length >= accounts.password.length) {
          confirmPassword(accounts.password, value);
        } else if (name === "email" && value.length !== 0) {
          checkEmail(value);
        }
        setAccounts({
          ...accounts,
          [name]: value,
        });
    }
    
    const confirmPassword = (pass, confirm_pass) => {
        if (pass === confirm_pass) {
          setconfirmPassValidated(true);
        } else {
          setconfirmPassValidated(false);
        }
    };

    const checkFields = () => {
        if (
          accounts.first_name.length === 0 ||
          accounts.last_name.length === 0 ||
          accounts.email.length === 0 ||
          accounts.password.length < 8 ||
          accounts.password2.length < 8 ||
          accounts.password !== accounts.password2
        ) {
          return true;
        } else {
          return false;
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://127.0.0.1:8000/register/", accounts)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            if (error.response.status === 400) {
              console.log("Bad request:", error.response.data);
            } else {
              console.log("Request failed:", error.message);
            }
          });
    };

  return (
    <>
      <Main>
        <H3>Create Your Account</H3>

        <Form onSubmit={handleSubmit}>
          <Div>
            <FormControl>
              <Label>First Name </Label>
              <Input type="text" name="first_name" onChange={handleInput} autoComplete="off"/>
            </FormControl>

            <FormControl>
              <Label>Last Name</Label>
              <Input type="text" name="last_name" onChange={handleInput} autoComplete="off"/>
            </FormControl>
          </Div>

          <Div>
            <FormControl>
              <Label>Email </Label>
              <Input type="email" name="email" onChange={handleInput} autoComplete="off"/>

              {!emailValidated && accounts.email.length !== 0 ? (
                            <ErrorLabel>
                              Email Id is not valid{" "}    
                            </ErrorLabel>
                          ) : (
                            ""
                          )}
            </FormControl>

            <FormControl>
              <Label>Gender </Label>
              <div style={{ display: "flex", margin: "5px 0px" }}>
                <Input
                  type="radio"
                  name="gender"
                  value="Male"
                  style={{ margin: "0px 10px" }}
                  onChange={handleInput}
                />
                <Label>Male</Label>
                <Input
                  type="radio"
                  name="gender"
                  value="Female"
                  style={{ margin: "0px 10px" }}
                  onChange={handleInput}
                />
                <Label>Female</Label>
              </div>
            </FormControl>
          </Div>

          <Div>
            <FormControl>
              <Label>Password </Label>
              <Input type="password" name="password" onChange={handleInput} autoComplete="off"/>
            </FormControl>
            
            <FormControl>
              <Label>Confirm Password</Label>
              <Input type="password" name="password2" onChange={handleInput} autoComplete="off"/>
              {!confirmPassValidated &&
                          accounts.password.length <=
                            accounts.password2.length &&
                          accounts.password2.length !== 0 ? (
                            <ErrorLabel className="form-label text-danger">
                              Password and Confirm Password Does not match
                            </ErrorLabel>
                          ) : (
                            ""
                          )}
            </FormControl>
          </Div>

          <Button disabled={disableButton}>Submit</Button>
        
        </Form>
      </Main>
    </>
  );
}