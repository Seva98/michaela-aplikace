import Content from '@/components/containers/content';
import Typography from '@/components/ui/typography';
import { getAllBookings } from '@/db/bookings/getBookings';

const Bookings = async () => {
  const bookings = await getAllBookings();

  return (
    <Content>
      <Typography variant="h2">Všechny tréninky</Typography>
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div key={booking.id}>
            <Typography variant="h3">{booking.date}</Typography>
            <Typography variant="p">{booking.userId}</Typography>
          </div>
        ))
      ) : (
        <Typography variant="p">Žádné tréninky nebyly nalezeny</Typography>
      )}
    </Content>
  );
};

export default Bookings;
