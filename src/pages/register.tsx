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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

import bg from "../images/register_bg.png";
import { api } from "../services/api";

interface UserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface FormValues extends UserRegister {
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

const RegisterSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, "O nome não pode ultrapassar 30 caracteres")
    .required("Obrigatório"),
  lastName: Yup.string()
    .max(50, "O sobrenome não pode ultrapassar 50 caracteres")
    .required("Obrigatório"),
  email: Yup.string().email("Email inválido").required("Obrigatório"),
  password: Yup.string()
    .min(8, "Insira uma senha maior que 8 caracteres")
    .max(32, "Insira uma senha menor ou igual a 32 caracteres")
    .required("Obrigatório"),
  confirmedPassword: Yup.string()
    .min(8, "Insira uma senha maior que 8 caracteres")
    .max(32, "Insira uma senha menor ou igual a 32 caracteres")
    .required("Obrigatório")
    .oneOf([Yup.ref("password"), null], "As senhas devem ser iguais"),
});

export const Register = () => {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  };

  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [errorMessage, setErrorMessage] = useState("");

  const strategy = {
    201: () => {
      history.push("/login");
    },
    409: () => {
      setErrorMessage("Email já em uso. Insira um outro email válido.");
      onOpen();
    },
  };

  const onSubmit = async (UserRegister: UserRegister) => {
    const res = await api.post("/auth/register", UserRegister);
    strategy[res.status as keyof typeof strategy]();
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
          h={{
            base: "lg",
            md: "xl",
            lg: "2xl",
          }}
          w="545px"
          p="1"
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
            validationSchema={RegisterSchema}
            onSubmit={onSubmit}
          >
            {(props) => (
              <Form>
                <VStack spacing="2">
                  <Field name="firstName">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!(form.errors.firstName && form.touched.firstName)
                        }
                      >
                        <FormLabel color="white" htmlFor="firstName">
                          Nome
                        </FormLabel>
                        <Input
                          w="xs"
                          bg="#f1f1f1"
                          {...field}
                          id="firstName"
                          placeholder="Nome"
                        />
                        <FormErrorMessage color="#FF2424">
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!(form.errors.lastName && form.touched.lastName)
                        }
                      >
                        <FormLabel color="white" htmlFor="lastName">
                          Sobrenome
                        </FormLabel>
                        <Input
                          w="xs"
                          bg="#f1f1f1"
                          {...field}
                          id="lastName"
                          placeholder="Sobrenome"
                        />
                        <FormErrorMessage color="#FF2424">
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={!!(form.errors.email && form.touched.email)}
                      >
                        <FormLabel color="white" htmlFor="email">
                          Email
                        </FormLabel>
                        <Input
                          w="xs"
                          bg="#f1f1f1"
                          {...field}
                          id="email"
                          placeholder="E-mail"
                        />
                        <FormErrorMessage color="#FF2424">
                          {form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!(form.errors.password && form.touched.password)
                        }
                      >
                        <FormLabel color="white" htmlFor="password">
                          Senha
                        </FormLabel>
                        <Input
                          w="xs"
                          bg="#f1f1f1"
                          type="password"
                          {...field}
                          id="password"
                          placeholder="Senha"
                        />
                        <FormErrorMessage color="#FF2424">
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="confirmedPassword">
                    {({ field, form }: FieldProps) => (
                      <FormControl
                        isInvalid={
                          !!(
                            form.errors.confirmedPassword &&
                            form.touched.confirmedPassword
                          )
                        }
                      >
                        <FormLabel color="white" htmlFor="confirmedPassword">
                          Confirmar senha
                        </FormLabel>
                        <Input
                          w="xs"
                          bg="#f1f1f1"
                          type="password"
                          {...field}
                          id="confirmedPassword"
                          placeholder="Confirmar senha"
                        />
                        <FormErrorMessage color="#FF2424">
                          {form.errors.confirmedPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box h="3" />
                  <Button w="xs" bgColor="studyt.light" type="submit">
                    Cadastrar
                  </Button>
                </VStack>
              </Form>
            )}
          </Formik>
        </Container>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Erro</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{errorMessage}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Fechar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </motion.div>
  );
};
