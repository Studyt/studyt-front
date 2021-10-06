import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

export const Subject = () => {

    const { subjectID } = useParams<{subjectID: string}>();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {subjectID}    
        </motion.div>
    );
};