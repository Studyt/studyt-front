import {
	Tr,
	Td,
	Select
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
	loadData: ()=> Promise<void>;
}

export const Tasks = ({
	description,
	dueDate,
	status,
	_id,
	loadData
}: TaskProps) => {

	const onSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		await api.patch(`/task/${_id}`, { status: e.target.value });
		await loadData();
	};

	const iconStrategy = {
		"Concluido": "green.500",
    	"A Fazer": "red.500",
		"Fazendo": "orange.400"
	};

	return (
		<Tr>
			<Td>{description}</Td>
			<Td>{moment(dueDate).locale('pt-br').format('LL')}</Td>

			<Td>
				<Select onChange={onSelect} value={status} size="sm">
  					<option value="Fazendo">Fazendo</option>
  					<option value="A Fazer">A Fazer</option>
  					<option value="Concluido">Concluído</option>
				</Select>
			</Td>
			<Td>
				<CheckCircleIcon color={iconStrategy[status as keyof typeof iconStrategy]} />
			</Td>
		</Tr>
	);
};
