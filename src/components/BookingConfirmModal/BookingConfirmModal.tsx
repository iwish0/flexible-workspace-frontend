import { Modal, Button, Text, Textarea, FormElement, Divider } from '@nextui-org/react';
import { FunctionComponent, useState } from 'react';
import './BookingConfirmModal.css';

export type BookingConfirmationModalData = {
    placeName: string;
    checkInDate: string;
    checkOutDate: string;
    checkInTime?: string;
    checkOutTime?: string;
}

type Props = {
    visible: boolean;
    onCancel: () => void;
    onConfirm: (comment: string) => void;
    bookingConfirmationModalData: BookingConfirmationModalData;
}

export const BookingConfirmModal: FunctionComponent<Props> = (
    {
        visible,
        onConfirm,
        onCancel,
        bookingConfirmationModalData
    }) => {
    const [comment, setComment] = useState<string>('');
    const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement | FormElement>): void => {
        const comment: string = e.target.value;
        setComment(comment);
    };
    const { checkInDate, checkOutDate, placeName, checkInTime, checkOutTime } = bookingConfirmationModalData;
    console.log('placeName', placeName)
    return (
        <Modal
            closeButton
            aria-labelledby='modal-title'
            open={visible}
            onClose={onCancel}
        >
            <Modal.Header>
                <Text id='modal-title' size={18}>
                    Confirmation de réservation
                </Text>
            </Modal.Header>
            <Divider />
            <Modal.Body>
                <div className='item'>
                    <span>Du :</span>
                    <span>{checkInDate}</span>
                    {checkInTime && (<div className='item'><span>{checkInTime}</span></div>)}
                </div>
                <div className='item'>
                    <span>Au :</span>
                    <span>{checkOutDate}</span>
                    {checkOutTime && (<div className='item'><span>{checkOutTime}</span></div>)}
                </div>
                <div className='item'>
                    <span>Emplacement:</span>
                    <span>{placeName}</span>
                </div>
                <Textarea css={{ mt: 12 }}
                    bordered
                    color='primary'
                    labelPlaceholder='Commentaire'
                    maxLength={250}
                    onChange={(e) => handleTextareaChange(e)}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button auto flat color='error' onPress={onCancel}>
                    Annuler
                </Button>
                <Button auto onPress={() => { onConfirm(comment) }}>
                    Confirmer
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
