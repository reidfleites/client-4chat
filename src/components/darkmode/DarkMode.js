import useLocalStorage from "use-local-storage";
import lightMode from "../../images/solid-black-sun-symbol.png";
import darkMode from "../../images/night-mode.png";

function darkMode() {
  //Dark Mode
  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  return (
    <div className="darkMode">
      <div className="darkMode" onClick={switchTheme}>
        {theme === "light" ? (
          <img src={darkMode} alt="Logo" />
        ) : (
          <img src={lightMode} alt="Logo" />
        )}
      </div>
    </div>
  );
}
export default darkMode;
