import FullScreen from '@/components/containers/fullScreen';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Card from '@/components/ui/card';
import Typography from '@/components/ui/typography';

const Faq = () => {
  return (
    <FullScreen className="relative">
      <div className="h-12" />
      <div className="max-w-xl mx-auto bg-white">
        <Card className="" title="FAQ">
          <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>Pro koho je aplikace určená?</AccordionTrigger>
              <AccordionContent>
                <Typography>
                  Aplikace je vyvijená především pro trénery s cílem usnadnit jim rutinní prácí jako je plánování termínu, sledování tréninku nebo výběr plateb
                  od klientů.
                </Typography>
                <Typography>
                  Nicméně, aplikaci může využívat také normální uživatel a využívat funkce pro sledování svého tréninku nebo jídelníčku a využívat funkce AI
                  trénéra pro zlepšení svého výkonu.
                </Typography>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Co je funkce AI Trenér?</AccordionTrigger>
              <AccordionContent>
                <Typography>
                  AI Trenér je pomůcka, která na základě informací (věk, míry, předchozí tréninky a jiné zápisky v tréninku) o Vás nebo Vašem klientovi dokáže
                  navrhnout optimální plán pro další zlepšení, který je přizpůsobený na míru.
                </Typography>
                <Typography>
                  Nezáleží na sportu nebo na otázce, AI Trenér dokáže navrhnout to co je v danou situaci nejlepší. Čím více informací má AI Trenér, tím přesněji
                  a lépe dokáže odpovědět.
                </Typography>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Jaký je rozdíl mezi zkušební a placenou verzi aplikace?</AccordionTrigger>
              <AccordionContent>
                <Typography>
                  Ve zkušební verzí aplikace si po omezenou dobu můžete zadarmo vyzkoušet co vše aplikace umí a pokud Vám aplikace nevyhovuje, tak můžete
                  předplatné bezdůvodně zrušit.
                </Typography>
                <Typography>
                  V placené verzi potom máte neomezený přístup ke všem funkcím aplikace. Placené členství jde samozřejmě vždy ihned bezdůvodně zrušit.
                </Typography>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </FullScreen>
  );
};

export default Faq;
