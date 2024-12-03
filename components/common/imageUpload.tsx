'use client';

import { FaCamera } from 'react-icons/fa';
import { cn } from '@/utils/cn';
import { useEffect, useRef, useState } from 'react';
import FormWithError from '@/components/common/formWithError';
import { useFormStatus } from 'react-dom';

const ImageUpload = ({
  id,
  id_key,
  image,
  imageClass,
  folder,
  action,
  useForm = true,
}: {
  id: number;
  id_key: string;
  image?: string;
  imageClass?: string;
  folder: string;
  action: (formData: FormData) => Promise<void>;
  useForm?: boolean;
}) => {
  const [selectedImage, setSelectedImage] = useState(image);
  const { pending } = useFormStatus();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      if (useForm) submitForm();
    }
  };

  const handleImageDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));

      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
      }

      if (useForm) submitForm();
    }
  };

  const submitForm = async () => {
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await action(formData);
    }
  };

  useEffect(() => {
    if (pending) setSelectedImage(undefined);
  }, [pending]);
  const renderContent = () => (
    <>
      <label
        htmlFor="image"
        className={cn(imageClass, 'shadow-lg block bg-transparent bg-cover bg-center cursor-pointer relative')}
        style={{
          backgroundColor: selectedImage || image ? 'transparent' : 'gray',
          backgroundImage: selectedImage ? `url(${selectedImage})` : image ? `url(${image})` : 'none',
        }}
        onDrop={handleImageDrop}
        onDragOver={(e) => e.preventDefault()}
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
      <input type="hidden" name={id_key} value={id} />
      <input type="hidden" name="old_image" value={image} />
      <input type="hidden" name="folder" value={folder} />
      <input type="file" id="image" name="image" style={{ width: '1px', height: '0px' }} ref={fileInputRef} onChange={handleImageChange} />
    </>
  );

  if (useForm) {
    return (
      <FormWithError ref={formRef} action={(formData) => action(formData)}>
        {renderContent()}
      </FormWithError>
    );
  }

  return <div>{renderContent()}</div>;
};

export default ImageUpload;
