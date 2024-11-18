import Section from '@/components/containers/section';
import LogoutButton from '@/components/layout/logoutButton';
import Card from '@/components/ui/card';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Typography from '@/components/ui/typography';
import { getOwnerSettings } from '@/db/ownerSettings/getOwnerSettings';
import { getOwnerId } from '@/utils/db/owner/getOwnerId';
import Link from 'next/link';
import PagePersonalizationLinks from './pagePersonalizationLinks';
import PagePersonalizationLogo from './pagePersonalizationLogo';
import PagePersonalizationTitle from './pagePersonalizationTitle';
import Save from '@/components/common/save';
import { updateOwnerSettings } from '@/db/ownerSettings/updateOwnerSettings';
import FormWithError from '@/components/common/formWithError';
import { Button } from '@/components/ui/button';
import { LuLogOut } from 'react-icons/lu';

const Page = async () => {
  const owner_id = await getOwnerId();
  const ownerSettings = await getOwnerSettings();
  return (
    <Section title="Nastavení">
      <Card className="space-y-4">
        <FormWithError action={updateOwnerSettings}>
          <div className="flex justify-between">
            <Typography variant="h2">Personalizace stránky</Typography>
            <Save variant="icon" />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Logo</TableHead>
                <TableHead>Titulek stránky (vlevo nahoře)</TableHead>
                <TableHead>Odkazy (vpravo nahoře)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <PagePersonalizationLogo owner_id={owner_id} logo={ownerSettings.logo} />
                <PagePersonalizationTitle title={ownerSettings.title} />
                <PagePersonalizationLinks menuItems={ownerSettings.menu} />
              </TableRow>
            </TableBody>
          </Table>
        </FormWithError>
      </Card>
      <Card className="space-y-4">
        <Typography variant="h2">Další akce</Typography>
        <Link href="/auth/logout">
          <Button className="flex space-x-2 items-center" variant="outline">
            <Typography>Odhlásit se</Typography>
            <LuLogOut className="scale-110" />
          </Button>
        </Link>
      </Card>
    </Section>
  );
};

export default Page;
