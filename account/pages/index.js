// import styled from "styled-components";
// import Button from "../styledcomponents/button";
// import FormControl from "@/styledcomponents/formcontrol";
// import Input from "@/styledcomponents/input";

// const Main = styled.div`
//   border: 1px solid black;
//   width: 750px;
//   margin: auto;
//   margin-top: 160px;
//   padding: 20px 40px;
//   border-radius: 5px;
//   @media (max-width: 769px) {
//     width: 90%;
//     margin-top: 80px;
//     margin-bottom: 40px;
//   }
// `;

// const Form = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const H3 = styled.p`
//   font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
//   font-size: 30px;
//   margin: 30px 10px;
// `;

// const Label = styled.label`
//   font-size: 17px;
//   font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
// `;


// const Div = styled.div`
// display: flex;
// @media (max-width: 769px) {
//   display: flex;
//   flex-direction: column;
//   }
// `

// export default function Home() {
//   return (
//     <>
//       <Main>
//         <H3>Create Your Account</H3>

//         <Form>
//           <Div>
//             <FormControl>
//               <Label>First Name </Label>
//               <Input type="text" placeholder="" />
//             </FormControl>

//             <FormControl>
//               <Label>Last Name</Label>
//               <Input type="text" placeholder="" />
//             </FormControl>
//           </Div>

//           <Div>
//             <FormControl>
//               <Label>Email </Label>
//               <Input type="email" placeholder="" />
//             </FormControl>

//             <FormControl>
//               <Label>Gender </Label>
//               <div style={{ display: "flex", margin: "5px 0px" }}>
//                 <Input
//                   type="radio"
//                   name="gender"
//                   value="male"
//                   style={{ margin: "0px 10px" }}
//                 />
//                 <Label>Male</Label>
//                 <Input
//                   type="radio"
//                   name="gender"
//                   value="female"
//                   style={{ margin: "0px 10px" }}
//                 />
//                 <Label>Female</Label>
//               </div>
//             </FormControl>
//           </Div>

//           <Div>
//             <FormControl>
//               <Label>Password </Label>
//               <Input type="password" placeholder="" />
//             </FormControl>
            
//             <FormControl>
//               <Label>Confirm Password</Label>
//               <Input type="password" placeholder="" />
//             </FormControl>
//           </Div>

//           <Button>Submit</Button>
        
//         </Form>
//       </Main>
//     </>
//   );
// }

export default function Home()
{
  return (
    <>
    <h3>Dashboard Page</h3>
    </>
  );
}