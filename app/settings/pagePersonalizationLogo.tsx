import ImageUpload from '@/components/common/imageUpload';
import { TableCell } from '@/components/ui/table';
import { updateLogo } from '@/db/ownerSettings/updateOwnerSettings';

const PagePersonalizationLogo = async ({ owner_id, logo }: { owner_id: number; logo?: string }) => {
  return (
    <TableCell className="align-top">
      <ImageUpload
        useForm={false}
        imageClass="w-[64px] aspect-square"
        id={owner_id}
        id_key="owner_id"
        image={logo}
        action={updateLogo}
        folder={`/owner/${owner_id}/logo/`}
      />
    </TableCell>
  );
};

export default PagePersonalizationLogo;
