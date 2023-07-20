import { ErrorInformation } from '../../../shared/models/ihm/error.model';
import { Modal, Text, Divider } from '@nextui-org/react';
import { FunctionComponent } from 'react';

type Props = {
    error: ErrorInformation | null;
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
                {error && error.title &&
                    (<Text css={{ color: '$error' }} id="modal-title" size={18}>{error.title}</Text>)
                }
            </Modal.Header>
            <Divider />
            <Modal.Body>
                {error && error.message &&
                    (<Text>{error.message}</Text>)
                }
            </Modal.Body>
        </Modal>
    );
}