import { Flex, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useTimeoutFn } from 'react-use';

export const TokenConfirmation = () => {

	const { token } = useParams<{ token: string }>();
	const history = useHistory();

	useEffect(() => {
		const confirmAccount = async () => {
			await fetch(`${process.env.REACT_APP_STUDYT_API_URL}/auth/confirmation/${token}`, {
				method: 'POST'
			});
		};
		confirmAccount();
	}, []);
    
	useTimeoutFn(() => history.replace('/login'), 1000);

	return (
		<Flex h="100vh" justifyContent="center" alignItems="center">
			<Heading>Confirmado com sucesso</Heading>
		</Flex>
	);
};