'use client';

import { Button } from '@/components/ui/button';
import { Input, LabeledInput } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { OwnerMenuItem } from '@/db/ownerSettings/ownerSettings';
import { useState } from 'react';
import { LuX } from 'react-icons/lu';

const PagePersonalizationLinks = ({ menuItems }: { menuItems?: OwnerMenuItem[] }) => {
  const [count, setCount] = useState(menuItems?.length || 1);
  const [links, setLinks] = useState(menuItems || [{ title: '', href: '' }]);
  console.log('>>>>', menuItems, links);

  const handleInputChange = (index: number, value: string, type: 'title' | 'href') => {
    const newLinks = [...links];
    newLinks[index][type] = value;
    setLinks(newLinks);
  };

  const handleAddLink = () => {
    setLinks([...links, { title: '', href: '' }]);
    setCount(count + 1);
  };

  const handleRemoveLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    setCount(count - 1);
  };

  return (
    <TableCell className="flex flex-col gap-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="flex space-x-2 items-end" key={`link-${index}`}>
          <div className="w-full ">
            <LabeledInput
              label={`Odkaz #${index + 1}`}
              onChange={(e) => handleInputChange(index, e.target.value, 'title')}
              value={links[index]?.title || ''}
              placeholder={`Název odkazu #${index + 1} v menu`}
            />
            <Input
              onChange={(e) => handleInputChange(index, e.target.value, 'href')}
              value={links[index]?.href || ''}
              placeholder="https://www.odkaz-na-tvuj-web.cz/podstranka"
            />
          </div>
          {index === count - 1 && (
            <Button variant="outline" className="mb-4" onClick={() => handleRemoveLink(index)}>
              <LuX />
            </Button>
          )}
        </div>
      ))}
      {count < 5 && (
        <Button variant="outline" onClick={handleAddLink} type="button">
          Přidat odkaz
        </Button>
      )}
      <input type="hidden" name="menu" value={JSON.stringify(links.filter((l) => l.title))} />
    </TableCell>
  );
};

export default PagePersonalizationLinks;
