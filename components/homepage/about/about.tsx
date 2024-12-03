import Typography from '@/components/ui/typography';
import Image from 'next/image';

const About = () => {
  return (
    <div style={{ background: `linear-gradient(#ccf0e6, #ccf0e6, white)` }}>
      <div className=" -mt-16 px-2 md:px-16">
        <div className="z-10 relative mx-auto grid grid-cols-2  max-w-[1600px] space-x-8 bg-white shadow-lg rounded-xl">
          <Image
            src="/homepage/about-us.jpg"
            alt="deadlift"
            className=" w-full aspect-square object-contain border-4 rounded-r-none border-teal-800 hover:border-dashed rounded-xl"
            width={800}
            height={800}
          />
          <div className="space-y-8 self-center">
            <Typography className="text-4xl">O aplikaci</Typography>
            <div className="space-y-4">
              <Typography variant="p">
                Mým cílem je vytvořit komplexní aplikaci, která usnadní trénérům prácí s jejich každodenní &quot;management&quot; rutinou, aby se mohli co
                nejvíce soustředit právě na své klienty a věnovat čas těm aktivitám, které vytváří hodnotu.
              </Typography>
              <Typography variant="p">
                Hlavní motivací aplikaci neustalé vyvíjet je pro mne má manželka, protože vím, že jako vývojář aplikací a bývalý trenér ji dokážu vytvořit
                nástroj, který ji za použití nejmodernějších technologií dokáže zjednodušit práci s klienty tak, aby měla co nejvíce času právě na práci přimo s
                klienty.
              </Typography>
            </div>
            <Typography className="text-xl">... aneb aplikace od trenéru pro trenéry 💪🏻</Typography>
            <Typography variant="p" className="text-sm">
              P.S. Kdyby vám v aplikaci něco chybělo, tak mi stačí napsat a domluvíme se!
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
