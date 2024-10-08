import Typography from '../ui/typography';
import FacebookIcon from './facebookIcon';
import InstagramIcon from './instagramIcon';
import MailIcon from './mailIcon';
import PhoneIcon from './phoneIcon';
import UserIcon from './userIcon';
import YouTubeIcon from './youtubeIcon';

const ContactsOverview = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h2" className="text-4xl" id="kontakty">
        Kontakty
      </Typography>
      <div className="flex items-center gap-3">
        <UserIcon />
        <p>Michaela Kořínková</p>
      </div>
      <div className="flex items-center gap-3">
        <InstagramIcon />
        <a href="https://www.instagram.com/michaelakorinkova___/">@michaelakorinkova___</a>
      </div>
      <div className="flex items-center gap-3">
        <FacebookIcon />
        <a href="https://www.facebook.com/misa.korinkova">misa.korinkova</a>
      </div>
      <div className="flex items-center gap-3">
        <YouTubeIcon />
        <a href="https://www.youtube.com/@michaelakorinkovajumping3662">@michaelakorinkovajumping3662</a>
      </div>
      <div className="flex items-center gap-3">
        <MailIcon />
        <a href="mailto:michaela@korinkova.fitness">michaela@korinkova.fitness</a>
      </div>
      <div className="flex items-center gap-3">
        <PhoneIcon />
        <a href="tel:+420731252312">+420 731 252 312</a>
      </div>
    </div>
  );
};

export default ContactsOverview;
