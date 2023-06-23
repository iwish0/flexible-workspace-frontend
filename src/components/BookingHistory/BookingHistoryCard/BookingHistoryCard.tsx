import { DateHelper } from '../../../shared/helpers/date.helper';
import { Button, Text, Card } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import { Delete } from 'react-iconly';
import './BookingHistoryCard.css';

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

export const BookingHistoryCard: FunctionComponent<Props> = ({
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
        <Card>
            <Card.Header>
                <Text b>Réservé le {DateHelper.formatDate(bookingDateCreated || '')}</Text>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
                <div className='flex-row'>
                    <Text b>Du</Text>
                    <Text>{DateHelper.formatDate(checkInDate)}</Text>
                </div>
                <div className='flex-row'>
                    <Text b>Au</Text>
                    <Text>{DateHelper.formatDate(checkOutDate)}</Text>
                </div>
                <div className='flex-row'>
                    <Text b>Emplacement</Text>
                    <Text>{placeName}</Text>
                </div>
                {comment && (<div className='comment'>
                    <Text b>Commentaire</Text>
                    <Text>{comment}</Text>
                </div>)}
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Button rounded style={{ flex: 1 }}
                    onClick={() => onCancel(id)}
                    size='sm'
                    color='primary'>
                    <Delete set="light" primaryColor="white" />
                </Button>
            </Card.Footer>
        </Card >
    );
}