import "./LoginLanding.scss";
import React from "react";
import CustomizedDialogs from "../../components/dialog/Dialog";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Login from "../../components/login/Login";

function Homepage() {
  return (
    <div className="homepage">
      <img
        src="https://images.rawpixel.com/dark_image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDctMTkucG5n.png"
        alt="background"
        className="homepage-bg"
      ></img>
      <header>
        <LocalHospitalIcon className="icon" />
        <h2>KernelPanic OPD</h2>
      </header>

      <main>
        <section>
          <h1>Welcome!</h1>
          <p>
            Managing your health has never been easier than with our online OPD service.
          </p>
          <p>
            Access from anywhere, at any time, with just a few clicks.
          </p>

          <div className="homepage-sign-btns">
            <CustomizedDialogs title="Log In" btn="Log In">
              <Login />
            </CustomizedDialogs>
            <CustomizedDialogs title="Sign Up" btn="Sign Up">
              <Login />
            </CustomizedDialogs>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Homepage;