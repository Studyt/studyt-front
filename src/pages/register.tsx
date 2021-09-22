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
import bg from '../images/register_bg.png';
import { motion } from 'framer-motion';
import { Field, FieldProps, Form, Formik } from 'formik';

interface FormValues {
	name: string;
	user: string;
	email: string;
	password: string;
	confirmedPassword: string;
}

interface RegisterResponse {
	confirmed: string;
	lastName: string;
	firstName: string;
	email: string;
	_id: string;
	__v: number;
}

const onSubmit = async () => {
	1;
};

export const Register = () => {
	const initialValues: FormValues = {
		name: '',
		user: '',
		email: '',
		password: '',
		confirmedPassword: ''
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
					h="590px"
					w="545px"
					bgColor="studyt.dark"
					zIndex="dropdown"
					justifyContent="space-evenly"
					alignItems="center"
					display="flex"
					flexDir="column"
					borderRadius="10"
				>
					<Heading color="white">Cadastro</Heading>
					<Formik
						initialValues={initialValues}
						onSubmit={onSubmit}
					>
						{(props) => (
							<Form>
								<Flex
									flexDir="column"
									h="61vh"
								>
									<Field name="nome">
										{
											({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={!!(form.errors.nome && form.touched.nome)}
												>
													<FormLabel color="white" htmlFor="nome">Nome completo</FormLabel>
													<Input w="xs" bg="#f1f1f1" {...field} id="nome" placeholder="Nome completo" />
													<FormErrorMessage>{form.errors.nome}</FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									<Spacer />
									<Field name="user">
										{
											({ field, form }: FieldProps) => (
												<FormControl
													isInvalid={!!(form.errors.user && form.touched.user)}
												>
													<FormLabel color="white" htmlFor="user">Usuário</FormLabel>
													<Input w="xs" bg="#f1f1f1" {...field} id="user" placeholder="Usuário" />
													<FormErrorMessage>{form.errors.user}</FormErrorMessage>
												</FormControl>
											)
										}
									</Field>
									<Spacer />
									<Field name="email">
										{({ field, form }: FieldProps) => (
											<FormControl isInvalid={!!(form.errors.email && form.touched.email)}>
												<FormLabel color="white" htmlFor="email">Email</FormLabel>
												<Input w="xs" bg="#f1f1f1" {...field} id="email" placeholder="E-mail" />
												<FormErrorMessage>{form.errors.email}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Spacer />
									<Field name="password">
										{({ field, form }: FieldProps) => (
											<FormControl isInvalid={!!(form.errors.password && form.touched.password)}>
												<FormLabel color="white" htmlFor="password">Senha</FormLabel>
												<Input w="xs" bg="#f1f1f1" {...field} id="password" placeholder="Senha" />
												<FormErrorMessage>{form.errors.password}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Spacer />
									<Field name="confirmPassword">
										{({ field, form }: FieldProps) => (
											<FormControl isInvalid={!!(form.errors.confirmPassword && form.touched.confirmPassword)}>
												<FormLabel color="white" htmlFor="confirmPassword">Confirmar senha</FormLabel>
												<Input w="xs" bg="#f1f1f1" {...field} id="confirmPassword" placeholder="Confirmar senha" />
												<FormErrorMessage>{form.errors.password}</FormErrorMessage>
											</FormControl>
										)}
									</Field>
									<Spacer />
									<Spacer />
									<Spacer />
									<Spacer />
									<Spacer />
									<Spacer />
									<Spacer />
									<Button bgColor="studyt.light" type="submit">Cadastrar</Button>
								</Flex>
							</Form>
						)}
					</Formik>
				</Container>
			</Flex>
		</motion.div>
	);
};