import { Modal, Button, Text, Textarea, FormElement } from "@nextui-org/react";
import { FunctionComponent, useState } from 'react';
import './DeskBookingConfirmModal.css';
import { SearchCriteria } from "../../shared/models/rest/desk-booking.model";
import { Desk } from "../../shared/models/rest/desk.model";
import { DateHelper } from "../../shared/helpers/date.helper";

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (comment: string) => void;
    searchCriteria: SearchCriteria;
    deskInfo: Desk;
}

export const DeskBookingConfirmModal: FunctionComponent<Props> = ({ visible, onConfirm, onCancel, searchCriteria, deskInfo }) => {
    const [comment, setComment] = useState<string>('');
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement | FormElement>): void => {
        const comment: string = e.target.value;
        setComment(comment);
    }

    return (
        <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={onCancel}
        >
            <Modal.Header>
                <Text id="modal-title" size={18}>
                    Confirmation de réservation
                </Text>
            </Modal.Header>
            <Modal.Body>
                <div className="item">
                    <span>Date de début :</span>
                    <span>{DateHelper.formatDate(searchCriteria.checkInDateTime)}</span>
                </div>
                <div className="item">
                    <span>Date de fin :</span>
                    <span>{DateHelper.formatDate(searchCriteria.checkOutDateTime)}</span>
                </div>
                <div className="item">
                    <span>Emplacement</span>
                    <span>{deskInfo.name}</span>
                </div>
                <Textarea css={{ mt: 12 }}
                    bordered
                    color="primary"
                    labelPlaceholder="Commentaire"
                    maxLength={250}
                    onChange={(e) => handleTextareaChange(e)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color="error" onPress={onCancel}>
                    Annuler
                </Button>
                <Button auto onPress={() => { onConfirm(comment) }}>
                    Confirmer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
