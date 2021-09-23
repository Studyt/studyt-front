import {
	Image,
	Flex,
	Box,
	Input,
	FormLabel,
	FormControl,
	FormErrorMessage,
	Container,
	Heading,
	Spacer,
	Button,
	Text
} from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { verify } from 'jsonwebtoken';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useAppDispatch } from '../store';
import { api } from '../services/api';

import bg from '../images/login_bg.png';
import { logIn } from '../store/auth';
import { useHistory } from 'react-router';

interface FormValues {
	email: string;
	password: string;
}

interface LoginResponse {
	email: string;
	sub: string;
	name: string;
}

const LoginSchema = Yup.object().shape({
	email: Yup.string().email('Email inválido').required('Obrigatório'),
	password: Yup.string().min(8, 'Insira uma senha maior que 8 caracteres').max(32, 'Insira uma senha menor ou igual a 32 caracteres').required('Obrigatório'),
});

export const Login = () => {
	const initialValues: FormValues = {
		email: '',
		password: ''
	};

	const history = useHistory();
	const dispatch = useAppDispatch();

	const onSubmit = async (email: string, password: string) => {
		try {
			const res = await api.post<{ token: string }>('/auth/login', {
				email, password
			});
			console.log(res);
			const decoded = verify(res.data?.token as string, process.env.REACT_APP_STUDYT_SECRET as string) as LoginResponse;

			dispatch(logIn({
				...decoded,
				id: decoded.sub,
				token: res.data?.token as string
			}));
		} catch (error) {
			alert(error);
			return;
		}

	};

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<Flex
				overflow="hidden"
				h="100vh"
				justifyContent="center"
				alignItems="center"
			>
				<>
					<Image
						src={bg}
						h="100vh"
						w="100vw"
						objectFit="cover"
						position="absolute"
					/>
					<Box
						bgColor="rgba(192, 128, 255, 0.5)"
						w="full"
						h="full"
						position="absolute"
					/>
				</>
				<Container
					h="380px"
					w="md"
					bgColor="studyt.dark"
					zIndex="dropdown"
					justifyContent="space-evenly"
					alignItems="center"
					display="flex"
					flexDir="column"
					borderRadius="10"
				>
					<Heading color="white">Login</Heading>
					<Formik
						initialValues={initialValues}
						validationSchema={LoginSchema}
						onSubmit={async (values, actions) => {
							await onSubmit(values.email, values.password);
							history.push('/');
						}}
					>
						{(props) => (
							<Form>
								<Flex
									flexDir="column"
									h="40vh"
								>
									<Field name="email">
										{({ field, form }: FieldProps) => (
											<FormControl isInvalid={!!(form.errors.email && form.touched.email)}>
												<FormLabel color="white" htmlFor="email">Email</FormLabel>
												<Input w="xs" bg="#f1f1f1" {...field} id="email" placeholder="E-mail" />
												<FormErrorMessage color="#FF2424">{form.errors.email}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Spacer />
									<Field name="password">
										{({ field, form }: FieldProps) => (
											<FormControl isInvalid={!!(form.errors.password && form.touched.password)}>
												<FormLabel color="white" htmlFor="password">Senha</FormLabel>
												<Input w="xs" bg="#f1f1f1" type="password" {...field} id="password" placeholder="Senha" />
												<FormErrorMessage color="#FF2424">{form.errors.password}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Spacer />
									<Spacer />
									<Button bgColor="studyt.light" type="submit">Entrar</Button>
									<Flex justifyContent="space-between">
										<Link to="/register">
											<Text color="white" as="u">Cadastro</Text>

										</Link>
										<Link to="/reset-password">
											<Text color="white" as="u">Esqueci minha senha</Text>
										</Link>
									</Flex>
								</Flex>
							</Form>
						)}
					</Formik>
				</Container>
			</Flex>
		</motion.div>
	);
};