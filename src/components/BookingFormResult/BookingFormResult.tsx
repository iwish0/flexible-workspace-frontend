import { SearchResultDetail } from '../../shared/models/ihm/search-result-detail.model';
import { BookingFormResultCard } from './BookingFormResultCard/BookingFormResultCard';
import { RoomBookingState } from '../../shared/models/rest/room-booking.model';
import { DeskBookingState } from '../../shared/models/rest/desk-booking.model';
import { FunctionComponent } from 'react';
import { Grid } from '@nextui-org/react';

type Props = {
    data: SearchResultDetail[],
    onSelectItem(bookingState: DeskBookingState | RoomBookingState): void;
}

export const BookingFormResult: FunctionComponent<Props> = ({ data, onSelectItem }) => {
    return (
        <Grid.Container gap={2} justify='center' >
            {data.map((s: SearchResultDetail, index: number) => (
                <Grid key={index} xs={12} sm={6} md={4} xl={3} justify='center'>
                    <BookingFormResultCard data={s} onSelectItem={onSelectItem}
                    />
                </Grid>
            ))}
        </Grid.Container>
    );
}