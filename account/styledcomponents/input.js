import { styled } from "styled-components";

const Input = styled.input`
/* margin-top: 10px; */
border: 1px solid lightgrey;
line-height: 45px;
border-radius: 8px;
font-size: 20px;
padding: 0px 15px;
&:focus{
  outline: 4px solid #89D4FF;
  transition: outline 0.1s;
}
`

export default Input;