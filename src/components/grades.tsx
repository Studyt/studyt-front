import {
	Tr,
	Td,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { api } from '../services/api';

interface GradeProps {
	grade: number;
	weight: number;
	_id: string;
}

export const Grades = ({
	grade,
	weight,
	_id,
}: GradeProps) => {

	return (
		<Tr>
			<Td>{grade}</Td>
			<Td>{weight}</Td>
		</Tr>
	);
};
