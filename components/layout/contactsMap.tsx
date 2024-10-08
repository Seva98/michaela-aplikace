import Typography from '../ui/typography';
import MapIcon from './mapIcon';

const ContactsMap = () => {
  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h2" className="text-4xl">
        Fitness Galerie
      </Typography>
      <div className="flex items-center gap-3">
        <MapIcon />
        <div>
          <a href="https://www.fitnessgalerie.cz/" target="_blank" rel="noreferrer">
            Fitness Galerie
          </a>
          <p>nám. Generála Píky 2703/27</p>
          <p>326 00 Plzeň</p>
        </div>
      </div>
      <div className="w-full h-64">
        <iframe
          width="100%"
          height="240"
          id="gmap_canvas"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.8733676720663!2d13.399115215995913!3d49.73200867938268!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470aee28e323fd79%3A0x13ae9338100068f6!2sn%C3%A1m.%20Gen.%20P%C3%ADky%202703%2F27%2C%20326%2000%20Plze%C5%88%202-Slovany!5e0!3m2!1sen!2scz!4v1680853660733!5m2!1sen!2scz"
          loading="lazy"
          allowFullScreen={false}
        ></iframe>
      </div>
    </div>
  );
};

export default ContactsMap;
