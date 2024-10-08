import Contacts from './contacts';

const Footer = () => {
  return (
    <div className="w-full ">
      <hr className="mb-4" />
      <Contacts />
      <hr className="mb-4" />
      <footer className="container flex flex-col items-center justify-center py-0 pb-4 text-xs ">
        <div>© {new Date().getFullYear()} Michaela Kořínková, All Rights Reserved.</div>
        <div>
          <span>Made by </span>
          <a href="https://sevcik.dev" className="w-min hover:text-gray-500" style={{ margin: '0 auto' }}>
            sevcik.dev
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
