import Input from "@/styledcomponents/input";
import Button from "@/styledcomponents/button";
import FormControl from "@/styledcomponents/formcontrol";
import { styled } from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

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

function ForgetPassword()
{
    const [email, setEmail] = useState({
        email : "",
      });
  
      const navigate = useRouter()
    
      const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log(name, " : ", value);
        setEmail({
          ...email,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://127.0.0.1:8000/generatetoken/", email)
          .then((response) => {
            console.log(response.data);
            navigate.push('/verifyotp');
          })
          .catch((error) => {
            if (error.response.status === 400) {
              console.log("Bad request:", error.response.data);
            } else {
              console.log("Request failed:", error.message);
            }
          });
      };
  
    return(
        <>
        <Main>
            <h1 style={{marginBottom : "20px"}}>FORGET PASSWORD</h1>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input type="email" name="email" placeholder="Email" autoComplete="off" onChange={handleInput}/>
                </FormControl>

                <Button>Submit</Button>
            </form>

        </Main>
        </>
    );
}

export default ForgetPassword;