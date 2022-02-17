import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import Chat from "./components/chat/Chat";
import Verified from "./components/verified/Verified";
import MyProvider from "./components/context/AppContext";
import AllUsersProvider from "./components/context/AllUsersContext";

// import { ThemeProvider } from "styled-components";
// import { useDarkMode } from "./components/darkmode/useDarkMode";
// import { GlobalStyles } from "./components/darkmode/GlobalStyles";
// import Toggle from "./components/darkmode/Toggler";
// import { lightTheme, darkTheme } from "./components/Themes"

//test comment

function App() {
  // const lightTheme = {
  //   body: "#FFF",
  //   text: "#363537",
  //   toggleBorder: "#FFF",
  //   background: "#363537",
  // };
  // const darkTheme = {
  //   body: "red",
  //   text: "#FAFAFA",
  //   toggleBorder: "#6B8096",
  //   background: "#999",
  // };

  // const [theme, themeToggler, mountedComponent] = useDarkMode();
  // const themeMode = theme === "light" ? lightTheme : darkTheme;
  // if (!mountedComponent) return <div />;
  return (
    // <ThemeProvider theme={themeMode}>
    //   <>
    //     <GlobalStyles />
    //     <Toggle theme={theme} toggleTheme={themeToggler} />
        <div className="app">
          <MyProvider>
            <AllUsersProvider>
              <div>
                <Navbar />
              </div>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/verify" element={<Verified />} />
              </Routes>
            </AllUsersProvider>
          </MyProvider>
        </div>
    //   </>
    // </ThemeProvider>
  );
}

export default App;
