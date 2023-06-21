import { FunctionComponent } from 'react';
import { SearchResultDetail } from '../../shared/models/ihm/search-result-detail.model';
import { Grid } from '@nextui-org/react';
import { BookingFormResultCard } from './BookingFormResultCard/BookingFormResultCard';
import { RoomBookingState } from '../../shared/models/rest/room-booking.model';
import { DeskBookingState } from '../../shared/models/rest/desk-booking.model';

type Props = {
    data: SearchResultDetail[],
    onSelectItem(bookingState: DeskBookingState | RoomBookingState): void;

}

export const BookingFormResult: FunctionComponent<Props> = ({ data, onSelectItem }) => {
    return (
        <Grid.Container gap={3}>
            {data.map((d, index) => (
                <Grid key={index} xs={12} sm={6} md={4} xl={3}>
                    <BookingFormResultCard data={d} onSelectItem={onSelectItem}
                    />
                </Grid>
            ))}
        </Grid.Container>
    )

}