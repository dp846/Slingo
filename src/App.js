import React from "react";
import { Route, Routes } from "react-router-dom";

import InHome from "./components/inHome";
import Home from "./components/home";
import Login from "./components/login";
import Signup from "./components/signup";
import EmailVerify from "./components/emailVerify";
import ForgotPassword from "./components/forgotPassword";
import PasswordReset from "./components/passwordReset";
import Quiz from "./components/quiz";
import Quiz2 from "./components/quiz2";
import Translate from "./components/translate";
import Learn from "./components/learn";
import LearnSign from "./components/learnSign";
import LearnSign2 from "./components/learnSign2";
import Tutorial from "./components/tutorial";
import LearnInteractive from "./components/learnInteractive";

const App = () => {
	return (
		<div>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route path="Slingo" element={<Home />}/>
				<Route path="home" element={<InHome />} />
				<Route path="login" element={<Login />}/>
				<Route path="signup" element={<Signup />}/>
				<Route path="forgot-password" element={<ForgotPassword />}/>
				<Route path="tutorial" element={<Tutorial/>}/>
				<Route path="learn" element={<Learn />}/>
				<Route path="learnSign" element={<LearnSign />}/>
				<Route path="learnInteractively" element={<LearnInteractive />}/>
				<Route path="learnSign2" element={<LearnSign2 />}/>
				<Route path="quiz" element={<Quiz />}/>
				<Route path="quiz2" element={<Quiz2 />}/>
				<Route path="translate" element={<Translate />}/>
			</Routes>
		</div>
	);
};

export default App;
