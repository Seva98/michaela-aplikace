import ContactsOverview from './contactsOverview';
import ContactsMap from './contactsMap';
import ContactsInstagram from './contactsInstagram';

const Contacts = () => {
  return (
    <div className="container flex flex-col gap-4 px-2 py-4 sm:px-8 sm:py-12">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <ContactsOverview />
        <ContactsMap />
        <ContactsInstagram />
      </div>
    </div>
  );
};

export default Contacts;
