import Input from "@/styledcomponents/input";
import FormControl from "@/styledcomponents/formcontrol";
import Button from "@/styledcomponents/button";
import { styled } from "styled-components";
import { useState } from "react";
import axios from "axios";
import authenticateUser from "./authMiddleware";

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
const Update = styled(Button)`
background-color: black;
`
function changepassword()
{

    const [password, setPassword] = useState({
        old_password : "",
        new_password : "",
    });

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
      let config = {
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}` 
      }
    }
    axios
      .patch("http://127.0.0.1:8000/changepassword/", password,config)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);
        } else {
          console.log("Request failed:", error.message);
        }
        console.log(localStorage.getItem('access_token'))
      });
    }

    return(
        <>
        <Main>
            <h1 style={{marginBottom : "20px"}}>CHANGE PASSWORD</h1>
            <form onSubmit={handleSubmit}>

                <FormControl>
                    <Input type="password" name="old_password" placeholder="Old Password" onChange={handleInput}/>
                </FormControl>

                <FormControl>
                    <Input type="password" name="new_password" placeholder="New Password" onChange={handleInput}/>
                </FormControl>

                <Update>Update</Update>
            
            </form>
        </Main>
        </>
    );
}

// export default changepassword;

export default authenticateUser(changepassword)