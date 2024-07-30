'use client';

import { useState } from 'react';
import { Button } from '../ui/button';
import { LabeledInput } from '../ui/input';

const EditColor = ({ color }: { color?: string }) => {
  const [selectedColor, setSelectedColor] = useState(color ?? '#000000');

  return (
    <div className="grid grid-cols-3 gap-2 items-end">
      <LabeledInput
        label="Barva"
        type="color"
        name="color"
        className="p-0  border-none"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
      />
      <Button
        style={{
          backgroundColor: selectedColor,
        }}
        className="w-full col-span-2 "
        onClick={(e) => e.preventDefault()}
      >
        Ukázka barvy
      </Button>
    </div>
  );
};

export default EditColor;
