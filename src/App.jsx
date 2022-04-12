import { useEffect, createContext, useState, useContext } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Cookies from 'js-cookie'

import FlashContext from "FlashContext";
import MainMenuContext from "MainMenuContext";
import { Home, Register, Login, MoocList, Profile, Team, Confirmation, Course, ResetPassword, ForgottenPassword, Story, NotFoundPage, InternalServerErrorPage } from './pages';
import ProtectedRoute from "components/ProtectedRoutes";
import HeaderComponent from 'components/HeaderComponent';
import FlashComponent from "components/FlashComponent";
import FooterComponent from "components/FooterComponent";

export const LoggedContext = createContext();

function App() {
	const [isLogged, setIsLogged] = useState(false);
	const [isShowMainMenu, setIsShowMainMenu] = useState(false);
	const [flashMessage, setFlashMessage] = useState('');
	const [flashType, setFlashType] = useState('');
	const flash = useContext(FlashContext);


	useEffect(() =>{
		if (isLogged || !Cookies.get('token')) return
		else {
			const token = Cookies.get('token')
			const user_id = Cookies.get('user_id')

			const auth = async () => {
				const isAuth = await fetch(`${process.env.REACT_APP_API_URL}api/users/${user_id}`, {
					method: "GET",
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})

				if (isAuth.status === 200) {
					setIsLogged(true)
				}
			}
			auth()
		}
	},[])

	useEffect(() => {
		return flashMessage		
	}, [flash])

	return (
		<Router>
			<FlashContext.Provider value={{
				message: flashMessage,
				type: flashType,
				setMessage: (mes) => setFlashMessage(mes),
				setType: (alertType) => setFlashType(alertType)
				}}>
				<LoggedContext.Provider value={{isLogged, setIsLogged}}>
					<MainMenuContext.Provider value={{isShowMainMenu, setIsShowMainMenu}}>
						<HeaderComponent />
					</MainMenuContext.Provider>
					<FlashComponent />
					<Switch>
						{/* PUBLIC ROUTES */}
						<Route exact path="/register">
							<Register />
						</Route>
						<Route exact path="/login">
							<Login />
						</Route>
						<Route exact path="/courses">
							<MoocList />
						</Route>
						<Route exact path="/courses/:id">
							<Course />
						</Route>
						<Route path="/story" exact component={Story} />
						<Route path="/password/edit" exact component={ResetPassword} />
						<Route path="/forgotten_password" exact component={ForgottenPassword} />
						<Route path="/confirmation" exact component={Confirmation} />
						<Route exact path="/">
							<Home />
						</Route>

						{/* PRIVATE ROUTES */}
						<ProtectedRoute exact path="/courses/:courseId/teams/:teamId" component={Team} />
						<ProtectedRoute exact path="/profile" component={Profile} />
						<Route path="">
							<NotFoundPage />
						</Route>
					</Switch>
					<FooterComponent />
				</LoggedContext.Provider>
			</FlashContext.Provider>
		</Router>
	);
}

export default App;
