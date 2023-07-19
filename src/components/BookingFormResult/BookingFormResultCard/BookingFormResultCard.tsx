import { Card, Row, Text, Badge, Container, Col, Button, Tooltip } from '@nextui-org/react';
import { SearchResultDetail } from '../../../shared/models/ihm/search-result-detail.model';
import { DeskBookingState } from '../../../shared/models/rest/desk-booking.model';
import { RoomBookingState } from '../../../shared/models/rest/room-booking.model';
import { Location, Show, User } from 'react-iconly';
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
    description,
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
                        {isBooked ?
                            <Tooltip
                                placement='leftStart'
                                css={{ minWidth: 200, border: '#F0F0F0', borderWidth: 2, borderStyle: 'solid' }}
                                hideArrow
                                animated={false}
                                content={
                                    <>
                                        {user && (<Row justify='space-between' align='center'>
                                            <User set="light" />
                                            <Text>
                                                {user.name}
                                            </Text>
                                        </Row>)}
                                        <Col>
                                            <Row justify='space-between' align='center'>
                                                <Text b>Du</Text>
                                                <Text>{checkInDate}</Text>
                                                {checkInTime && <Text>{checkInTime}</Text>}
                                            </Row>
                                            <Row justify='space-between' align='center'>
                                                <Text b>Au</Text>
                                                <Text>{checkoutDate}</Text>
                                                {checkOutTime && <Text>{checkOutTime}</Text>}
                                            </Row>
                                        </Col>
                                    </>
                                }>
                                <Badge disableOutline color='error'>
                                    <Row align='center' justify='space-between'><Show style={{ marginRight: 10 }} set='light' size={'small'} /> Réservé</Row>
                                </Badge>
                            </Tooltip>
                            : <Badge disableOutline color='success'>Libre</Badge>}
                    </Row>
                </Container>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: '$10' }}>
                <Row justify='space-between' align='center'>
                    <Location set="light" />
                    <Text>{location}</Text>
                </Row>
                {maxCapacity && <Row justify='space-between' align='center'>
                    <Text b>Capacité</Text>
                    <Text>{maxCapacity} personnes</Text>
                </Row>}
                {maxCapacity && <Row justify='space-between' align='center'>
                    <Text b>Description</Text>
                    <Text>{description}</Text>
                </Row>}
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
                <Button rounded ghost disabled={isBooked} style={{ flex: 1 }} onClick={() => onSelectItem(bookingState)}>Réserver</Button>
            </Card.Footer>
        </Card>
    );
}