import Input from "@/styledcomponents/input";
import Button from "@/styledcomponents/button";
import FormControl from "@/styledcomponents/formcontrol";
import { styled } from "styled-components";
import axios from "axios";
import { useState } from "react";
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

function VerifyOtp()
{
    const [otp, setOtp] = useState({
        otp : "",
      });
  
      const router = useRouter()
    
      const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        console.log(name, " : ", value);
        setOtp({
          ...otp,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .post("http://127.0.0.1:8000/verifytoken/", otp)
          .then((response) => {
            console.log(response.data);
            if(response.data===true){
              localStorage.setItem('otp',otp.otp.toString())
              router.push('/newpassword')
            }
          })
          .catch((error) => {
            if (error.response.status === 400) {
              console.log(error.response.data.non_field_errors);
            } else {
              console.log("Request failed:", error.message);
            }
          });
      };
  
    return(
        <>
        <Main>
            <h1 style={{marginBottom : "20px"}}>VERIFY OTP</h1>
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <Input type="password" name="otp" placeholder="OTP" autoComplete="off" onChange={handleInput}/>
                </FormControl>

                <Button>Submit</Button>
            </form>

        </Main>
        </>
    );
}

export default VerifyOtp;