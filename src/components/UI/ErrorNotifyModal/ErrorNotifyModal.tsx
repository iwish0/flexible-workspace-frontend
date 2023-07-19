import { Modal, Text, Divider } from '@nextui-org/react';
import { FunctionComponent } from 'react';

type Props = {
    error: Error;
    visible: boolean;
    onClose: () => void;
}

export const ErrorNotifyModal: FunctionComponent<Props> = ({
    error,
    visible,
    onClose
}) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={onClose}
            animated={false}
        >
            <Modal.Header>
                <Text css={{ color: '$error' }} id="modal-title" size={18}>
                    Une erreur est survenue
                </Text>
            </Modal.Header>
            <Divider />
            <Modal.Body>
                {error && error.message && <Text>{error.message}</Text>}
            </Modal.Body>
        </Modal>
    );
}