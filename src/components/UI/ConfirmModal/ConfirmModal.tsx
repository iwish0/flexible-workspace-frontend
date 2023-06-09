import { Modal, Button, Text, Divider } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import './ConfirmModal.css';

type Props = {
    title: string;
    bodyContent: string;
    btnConfirmLabel: string;
    btnCancelLabel: string;
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const ConfirmModal: FunctionComponent<Props> = ({
    title,
    bodyContent,
    btnConfirmLabel,
    btnCancelLabel,
    visible,
    onCancel,
    onConfirm
}) => {
    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={onCancel}
            animated={false}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    {title}
                </Text>
            </Modal.Header>
            <Divider />
            <Modal.Body>
                <Text>{bodyContent}</Text>
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={onCancel}>
                    {btnCancelLabel}
                </Button>
                <Button auto onPress={onConfirm}>
                    {btnConfirmLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}