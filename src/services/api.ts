import { create } from 'apisauce';

const createApi = () => {
	let reducer, auth;
	try {
		reducer = JSON.parse(localStorage.getItem('persist:@studyt') as string);
		auth = JSON.parse(reducer.auth);
	} catch (error) {
		console.log(error);
	}
	const api = create({
		baseURL: process.env.REACT_APP_STUDYT_API_URL,
		headers: reducer && auth ? {
			'Authorization': `Bearer ${auth.token}`
		} : {}
	});
	return api;
};

export const api = createApi();