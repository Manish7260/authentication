import FormControl from "@/styledcomponents/formcontrol";
import { styled } from "styled-components";
import Input from "@/styledcomponents/input";
import Button from "@/styledcomponents/button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const Main = styled.div`
    margin: auto;
    margin-top: 10%;
    width: 400px;
    display: flex;  
    flex-direction: column;
    text-align: center;
    border: 1px solid lightgrey;
    padding: 20px ;
    border-radius: 10px;
    /* border: 1px solid lightblue; */
`

const ForgetPassword = styled.a`
    text-decoration: none;
    color: red;
    padding-right: 20px;

`

const NewUser = styled.a`
    text-decoration: none;
    color: darkblue;
    padding-left: 60px;
`

const Form = styled.form`
    display: flex;
`
export default function Login()
{
    const [login, setLogin] = useState({
        email :"",
        password : "",
    });

    const [errors, setErrors] = useState(false);
    const [disableButton, setButton] = useState(false);
    const [emailValidated, setEmailValidated] = useState(false);
    
    let message = "";
    const router = useRouter();
   
    let handleInput = (e) => {
      let name = e.target.name;
      let value = e.target.value;
      
      if (name==='email'){
        checkEmail(value)
      }

      setLogin({
        ...login, 
        [name] : value,
      });
    }

    useEffect(() => {
      if (
        emailValidated === false ||
        login.password.length<8
      ) {
        setButton(true);
      } else {
        setButton(false);
      }
    }, [handleInput]);

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
    
    let handleSubmit = (e) => {
    e.preventDefault();
    axios 
      .post("http://127.0.0.1:8000/api/token/", login)
      .then((response) => {
        if (response.data===false) {
          setErrors(true)
        }
        else {
          setErrors(false)
          message = response.data
          let accessToken = response.data.access;
          let refreshToken = response.data.refresh;
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          Cookies.set('isAuthenticated', true);
          router.push('/movie/dashboard/')
        }
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data.detail);
        } else {
          console.log("Request failed:", error.message);
        }
      });
    }

    return(
        <>
        <Main>
            <h1 style={{marginBottom : "20px"}}>LOGIN</h1>
            <form onSubmit={handleSubmit}>
            <FormControl>
                <Input type="email" name="email" placeholder="Username" onChange={handleInput}/>
            </FormControl>

            <FormControl>
                <Input type="password" name="password" placeholder="Password" onChange={handleInput}/>
                {errors ? (
                            <label className="form-label text-danger">
                              Please Enter Valid Email and password
                            </label>
                          ) : (
                            ""
                          )}
            </FormControl>

            <Button disabled={disableButton} style={{backgroundColor:"black"}}>Login</Button>
            </form>

            <div> 
                <ForgetPassword href="/forgetpassword">Forget Password</ForgetPassword>
                <NewUser href="/signup">Register New User</NewUser>
            </div>
        </Main>
        </>
    );
}