import React, { Attributes, FunctionComponent } from 'react';
import { RouteProps, Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../store';

export const ProtectedRoute = ({ component: Page, ...rest }: RouteProps) => {
	const userId = useAppSelector(state => state.auth.id);
	return (
		<Route
			{...rest}
			render={props => {
				if (userId) {
					return React.createElement(Page as FunctionComponent, props as Attributes);
				}
				return <Redirect
					to={{
						pathname: '/login',
						state: {
							from: props.location
						}
					}}
				/>;
			}}
		/>
	);
};