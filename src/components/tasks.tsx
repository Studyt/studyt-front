import {
	Tr,
	Td,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import moment from 'moment';
import 'moment/locale/pt-br';
import { api } from '../services/api';

interface TaskProps {
	description: string;
	dueDate: Date;
	status: string;
	_id: string;
}

export const Tasks = ({
	description,
	dueDate,
	status,
	_id,
}: TaskProps) => {

	const onClick = async (TaskDelete: TaskProps) => {
		await api.delete(`/task/delete/${_id}`);
	};

	return (
		<Tr>
			<Td>{description}</Td>
			<Td>{moment(dueDate).locale('pt-br').format('LL')}</Td>

			<Td>{status}</Td>
			<Td>
				<CheckCircleIcon color="green" onClick={() => onClick} />
			</Td>
		</Tr>
	);
};
