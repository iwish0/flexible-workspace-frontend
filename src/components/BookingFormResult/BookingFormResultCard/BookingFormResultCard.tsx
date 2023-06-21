import { SearchResultDetail } from '../../../shared/models/ihm/search-result-detail.model';
import { DeskBookingState } from '../../../shared/models/rest/desk-booking.model';
import { Card, Row, Text, Badge, Container, Col, Button } from '@nextui-org/react';
import { FunctionComponent } from 'react';
import './BookingFormResultCard.css';
import { RoomBookingState } from '../../../shared/models/rest/room-booking.model';

type Props = {
    data: SearchResultDetail,
    onSelectItem: (deskBookingState: DeskBookingState | RoomBookingState) => void;
}

export const BookingFormResultCard: FunctionComponent<Props> = ({ data: {
    isBooked,
    placeName,
    location,
    user,
    checkInTime,
    checkOutTime,
    checkoutDate,
    checkInDate,
    maxCapacity,
    bookingState
},
    onSelectItem
}) => {
    return (<Card css={{mw:330}}>
        <Card.Header>
            <Container>
                <Row justify='space-between'>
                    <Text b>{placeName}</Text>
                    <Badge disableOutline color={isBooked ? 'error' : 'success'}>
                        {isBooked ? 'Réservé' : 'Libre'}
                    </Badge>
                </Row>
            </Container>
        </Card.Header>
        <Card.Divider />
        <Card.Body css={{ py: "$10" }}>
            <Row justify='space-between' align='center'>
                <Text b>Localisation</Text>
                <Text>{location}</Text>
            </Row>
            { maxCapacity && <Row justify='space-between' align='center'>
                <Text b>Nombre de personnes max.</Text>
                <Text>{maxCapacity}</Text>
            </Row> }
            {isBooked &&
                <>
                    {user && (<Row justify='space-between' align='center'>
                        <Text b>
                            Réservataire
                        </Text>
                        <Text>
                            {user.name}
                        </Text>
                    </Row>)}
                    <Col>
                        <Row justify='space-between'>
                            <Text b>Début</Text>
                            <Text>{checkInDate}</Text>
                            {checkInTime && <Text>{checkInTime}</Text>}
                        </Row>
                        <Row justify='space-between'>
                            <Text b>Fin</Text>
                            <Text>{checkoutDate}</Text>
                            {checkOutTime && <Text>{checkOutTime}</Text>}
                        </Row>
                    </Col>
                </>
            }
        </Card.Body>
        <Card.Divider />
        <Card.Footer>
            <Button disabled={isBooked} style={{ flex: 1 }} onClick={() => onSelectItem(bookingState)}>Réserver</Button>
        </Card.Footer>
    </Card>)
}