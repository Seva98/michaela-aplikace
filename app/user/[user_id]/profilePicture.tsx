'use client';

import { uploadImage } from '@/server/uploadImage';
import { FaCamera } from 'react-icons/fa';
import FormSubmitButton from '@/components/common/formSubmitButton';
import { cn } from '@/utils/cn';
import { useState } from 'react';

export function ProfilePicture({ user_id, image }: { user_id: number; image?: string }) {
  const [selectedImage, setSelectedImage] = useState(image);
  const [showSubmitButton, setShowSubmitButton] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setShowSubmitButton(true);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setShowSubmitButton(true);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  return (
    <form
      action={async (formData) => {
        setSelectedImage(formData.get('image') as string);
        await uploadImage(formData);
        setShowSubmitButton(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <label
        htmlFor="image"
        className={cn('w-[292px] aspect-[9/16] shadow-lg rounded block bg-transparent bg-cover bg-center cursor-pointer relative')}
        style={{
          backgroundColor: selectedImage ? 'transparent' : 'gray',
          backgroundImage: selectedImage ? `url(${selectedImage})` : 'none',
        }}
        onDrop={handleImageDrop}
      >
        {!image && (
          <FaCamera
            style={{
              fontSize: '2rem',
              color: 'white',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </label>
      <input type="hidden" name="user_id" value={user_id} />
      <input type="hidden" name="old_image" value={image} />
      <input type="file" id="image" name="image" style={{ display: 'none' }} required onChange={handleImageChange} />
      {showSubmitButton && <FormSubmitButton className="w-full mt-2">Uložit nový obrázek</FormSubmitButton>}
    </form>
  );
}
