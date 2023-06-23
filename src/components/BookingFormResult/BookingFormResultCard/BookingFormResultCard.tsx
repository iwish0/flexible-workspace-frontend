import { SearchResultDetail } from '../../../shared/models/ihm/search-result-detail.model';
import { DeskBookingState } from '../../../shared/models/rest/desk-booking.model';
import { Card, Row, Text, Badge, Container, Col, Button } from '@nextui-org/react';
import { RoomBookingState } from '../../../shared/models/rest/room-booking.model';
import { Location, User } from 'react-iconly';
import { FunctionComponent } from 'react';
import './BookingFormResultCard.css';
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
    return (
        <Card>
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
                    <Location set="light" />
                    <Text>{location}</Text>
                </Row>
                {maxCapacity && <Row justify='space-between' align='center'>
                    <Text b>Nombre de personnes max.</Text>
                    <Text>{maxCapacity}</Text>
                </Row>}
                {isBooked &&
                    <>
                        {user && (<Row justify='space-between' align='center'>
                            <User set="light" />
                            <Text>
                                {user.name}
                            </Text>
                        </Row>)}
                        <Col>
                            <Row justify='space-between'>
                                <Text b>Du</Text>
                                <Text>{checkInDate}</Text>
                                {checkInTime && <Text>{checkInTime}</Text>}
                            </Row>
                            <Row justify='space-between'>
                                <Text b>Au</Text>
                                <Text>{checkoutDate}</Text>
                                {checkOutTime && <Text>{checkOutTime}</Text>}
                            </Row>
                        </Col>
                    </>
                }
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Button rounded disabled={isBooked} style={{ flex: 1 }} onClick={() => onSelectItem(bookingState)}>Réserver</Button>
            </Card.Footer>
        </Card>
    );
}