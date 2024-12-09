import { useContext, useEffect } from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { ThemeContext } from "../../context/ThemeProvider";
import AddUser from "../../Components/AddUser/AddUser";
import Users from "../../Components/Users/Users";


const Root = () => {
      const {theme} = useContext(ThemeContext)
      useEffect(() => {
            document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);
      return (
            <div>
                  <Navbar></Navbar>
                  <AddUser></AddUser>
                  <Users></Users>

            </div>
      );
};

export default Root;