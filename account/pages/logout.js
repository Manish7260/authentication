import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

function LogOut()
{
    let config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${typeof window !== 'undefined' ? localStorage.getItem('access_token') : null}`
        }
      };

    const router = useRouter()

    axios
      .get("http://127.0.0.1:8000/logout/", config)
      .then((response) => {
        console.log(response.data)
        
        Cookies.set("isAuthenticated", false)
        localStorage.setItem('access_token',"")
        localStorage.setItem('refresh_token',"")
        router.push('/login');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log("Bad request:", error.response.data);

        router.push('/login');
        } else {
          console.log("Request failed:", error.message);

        router.push('/login');
        }
      });
}
export default LogOut;