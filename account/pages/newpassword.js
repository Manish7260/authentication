import Input from "@/styledcomponents/input";
import Button from "@/styledcomponents/button";
import FormControl from "@/styledcomponents/formcontrol";
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Main = styled.div`
    margin: auto;
    margin-top: 10%;
    width: 400px;
    display: flex;
    flex-direction: column;
    text-align: center;
    padding: 20px ;
    border-radius: 10px;
    border: 1px solid red;
`

function NewPassword()
{
    let getotp = localStorage.getItem('otp');
    getotp = parseInt(getotp)

    const [password, setPassword] = useState({
        otp : getotp, 
        password : "",
        confirm_password : "",
    });

    const router = useRouter()

    const handleInput = (e) =>{
      let name = e.target.name;
      let value = e.target.value;
      console.log(name , " : ", value)
      setPassword({
        ...password,
        [name]:value,
      })  
    }
    
    const handleSubmit = (e) => {
      e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/forgettedpassword/", password)
      .then((response) => {
        console.log(response.data)
        router.push('/login')
        localStorage.removeItem('otp');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
      });
    }
    return(
        <>
        <Main>
            <h1 style={{marginBottom : "20px"}}>NEW PASSWORD</h1>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input type="passowrd" name="password" placeholder="Password" autoComplete="off" onChange={handleInput}/>
                </FormControl>

                <FormControl>
                <Input type="passowrd" name="confirm_password" placeholder="Confirm Password" autoComplete="off" onChange={handleInput}/>
                </FormControl>

                <Button>Submit</Button>
            </form>

        </Main>
        </>
    );
}

export default NewPassword;