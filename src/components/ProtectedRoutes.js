import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import { LoggedContext } from "App";

export const ProtectedRoute = ({ component: Component, ...restOfProps }) => {

	const { isLogged } = useContext(LoggedContext)

	return (
		<Route
			{...restOfProps}
			render={(props) =>
				isLogged ? <Component {...props} /> : <Redirect to={{ pathname: "/login" }} />
			} />
	);
}

export default ProtectedRoute;