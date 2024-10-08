import Image from 'next/image';
import Typography from '../ui/typography';

const ContactsInstagram = () => {
  const imageClasses = 'object-cover object-center w-full h-full aspect-square hover:opacity-90';

  return (
    <div className="flex flex-col gap-2">
      <Typography variant="h2" className="text-4xl">
        Instagram
      </Typography>
      <nav className="grid grid-cols-3 gap-1">
        <a target="_blank" href="https://www.instagram.com/p/Cu4f9IUor0Q/?img_index=1">
          <Image className={imageClasses} src={'/osobni/instagram/1.jpeg'} height={300} width={300} alt="Instagram image 1" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/Cl_joczjOIs/">
          <Image className={imageClasses} src={'/osobni/instagram/2.jpeg'} height={300} width={300} alt="Instagram image 2" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/CsOkzliIBLC/?img_index=1">
          <Image className={imageClasses} src={'/osobni/instagram/3.jpeg'} height={300} width={300} alt="Instagram image 3" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/CgtjxJlDiX9/">
          <Image className={imageClasses} src={'/osobni/instagram/4.jpeg'} height={300} width={300} alt="Instagram image 4" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/Cv4YXFnoCFm/">
          <Image className={imageClasses} src={'/osobni/instagram/5.png'} height={300} width={300} alt="Instagram image 5" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/Cr_J2_2otRH/?img_index=1">
          <Image className={imageClasses} src={'/osobni/instagram/6.jpg'} height={300} width={300} alt="Instagram image 6" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/CfEYEd1DS2y/">
          <Image className={imageClasses} src={'/osobni/instagram/7.jpeg'} height={300} width={300} alt="Instagram image 7" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/Clt6HMMLtpH/?img_index=1">
          <Image className={imageClasses} src={'/osobni/instagram/8.jpeg'} height={300} width={300} alt="Instagram image 8" />
        </a>
        <a target="_blank" href="https://www.instagram.com/p/CejEOiYDLTF">
          <Image className={imageClasses} src={'/osobni/instagram/9.jpeg'} height={300} width={300} alt="Instagram image 9" />
        </a>
      </nav>
    </div>
  );
};

export default ContactsInstagram;
