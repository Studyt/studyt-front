import {
  Flex,
  Container,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Icon,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/pt-br';

interface SubjectProps {
  name: string;
  startDate: Date;
  endDate: Date;
  label: string;
  _id: string;
}

export const Subjects = ({
  endDate,
  label,
  name,
  startDate,
  _id,
}: SubjectProps) => {
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>{moment(startDate).locale('pt-br').format('LL')}</Td>
      <Td>{moment(endDate).locale('pt-br').format('LL')}</Td>
  
      <Td>{label}</Td>
      <Td>
        <Link to={`/subjects/${_id}`}>
          <ExternalLinkIcon />
        </Link>
      </Td>
    </Tr>
  );
};
