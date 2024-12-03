import Card from '@/components/ui/card';
import Typography from '@/components/ui/typography';
import { featureTypes } from '../constants';
import { title } from 'process';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Feature = ({ text }: { text: string }) => (
  <div className="flex space-x-2">
    <div className="text-teal-500">✔</div>
    <div>{text}</div>
  </div>
);

const Pricing = () => {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center mt-24">
      <Typography className="text-4xl text-center tracking-tighter">Jediný plán pro všechny funkce</Typography>
      <Typography className="text-lg font-light text-center ">Vyzkoušej plně fukční aplikaci na 7 dní zdarma!</Typography>
      <Tabs defaultValue="yearly" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Měsíční</TabsTrigger>
          <TabsTrigger value="yearly">Roční (20% sleva)</TabsTrigger>
        </TabsList>
        <TabsContent value="monthly">
          <div className="space-y-8">
            <div className="max-w-sm mx-auto shadow-lg shadow-teal-300">
              <Card className="space-y-3 ">
                <Typography className="text-3xl font-semibold">Plus</Typography>
                <Typography className="text-sm">Odemkni plný potencial aplikace</Typography>
                <Separator />
                <div className="space-y-1">
                  {Object.values(featureTypes).map(({ title }) => (
                    <Feature key={`pricing-feature-${title}`} text={title} />
                  ))}
                  <Feature text="Pravidelné updaty a nové funkce" />
                </div>
                <Separator />
                <div>
                  <Typography className="text-3xl text-right font-semibold tracking-tighter">
                    7 dní zdarma <span className="text-base">poté</span>
                  </Typography>
                  <Typography className="text-2xl text-right font-semibold tracking-tighter">990 Kč / měsíc</Typography>
                </div>
                <Button className="w-full ">Začít</Button>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="yearly">
          <div className="space-y-8 ">
            <div className="max-w-sm mx-auto shadow-lg shadow-teal-300">
              <Card className="space-y-3 ">
                <Typography className="text-3xl font-semibold">Plus (roční)</Typography>
                <Typography className="text-sm">Odemkni plný potencial aplikace</Typography>
                <Separator />
                <div className="space-y-1">
                  {Object.values(featureTypes).map(({ title }) => (
                    <Feature key={`pricing-feature-${title}`} text={title} />
                  ))}
                  <Feature text="Pravidelné updaty a nové funkce" />
                </div>
                <Separator />
                <div>
                  <Typography className="text-3xl text-right font-semibold tracking-tighter">
                    7 dní zdarma <span className="text-base">poté</span>
                  </Typography>
                  <Typography className="text-2xl text-right font-semibold tracking-tighter">9 504 Kč / rok</Typography>
                  <Typography className="text-base text-right font-light tracking-tighter">
                    <span className="line-through">990 Kč</span> <strong>792</strong> Kč / měsíc
                  </Typography>
                </div>
                <Button className="w-full ">Začít</Button>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pricing;
