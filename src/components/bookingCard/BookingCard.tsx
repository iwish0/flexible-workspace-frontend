import { Button, Text, Divider, Card, Row } from '@nextui-org/react';
import { DateHelper } from '../../shared/helpers/date.helper';
import { FunctionComponent } from 'react';
import './BookingCard.css';

type Props = {
    id: string;
    bookingDateCreated: string;
    checkInDate: string;
    checkOutDate: string;
    placeName: string;
    checkInTime?: string;
    checkoutTime?: string;
    comment?: string;
    onCancel: (id: string) => void;
}

export const BookingCard: FunctionComponent<Props> = ({
    id,
    bookingDateCreated,
    checkInDate,
    checkInTime,
    checkOutDate,
    checkoutTime,
    placeName,
    comment,
    onCancel

}) => {
    return (
        <Card css={{ mw: '330px' }}>
            <Card.Header>
                <Text b>Réservé le {DateHelper.formatDate(bookingDateCreated || '')} </Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
                <div className='flex-row'>
                    <span>Du :</span>
                    <span>{DateHelper.formatDate(checkInDate)}</span>
                </div>
                <div className='flex-row'>
                    <span>Au :</span>
                    <span>{DateHelper.formatDate(checkOutDate)}</span>
                </div>
                <div className='flex-row'>
                    <span>Emplacement:</span>
                    <span>{placeName}</span>
                </div>
                <Divider css={{ mb: 10, mt: 10 }} />
                <div className='comment'>
                    <span>Commentaire:</span>
                    <span>{comment}</span>
                </div>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Row justify='flex-end'>
                    <Button
                        onClick={() => onCancel(id)}
                        size='sm'
                        color='primary'>
                        Supprimer
                    </Button>
                </Row>
            </Card.Footer>
        </Card>
    );
}