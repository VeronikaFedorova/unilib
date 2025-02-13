'use client';

import { toast } from '@/hooks/use-toast';
import config from '@/lib/config';
import { cn } from '@/lib/utils';
import { IKImage, IKVideo, ImageKitProvider, IKUpload } from 'imagekitio-next';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Props {
  type: 'image' | 'video';
  accept: string;
  placeholder: string;
  folder: string;
  variant: 'dark' | 'light';
  onFileChange: (filePath: string) => void;
}

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}`);
    }
    const data = await response.json();
    const { signature, expire, token } = data;
    return { token, expire, signature };
  } catch (error: any) {
    throw new Error(`Authenticatiion request failed: ${error.message}`);
  }
};

const FileUpload = ({
  type,
  accept,
  placeholder,
  folder,
  variant,
  onFileChange,
}: Props) => {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filePath: string } | null>(null);
  const [progress, setProgress] = useState(0);

  const styles = {
    button:
      variant === 'dark'
        ? 'bg-gray-300'
        : 'bg-light-600 border border-gray-100',
    placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
    text: variant === 'dark' ? 'text-light-100' : 'text-slate-400',
  };

  const onError = (error: any) => {
    console.error(error);

    toast({
      title: `${type} upload failed`,
      description: `Your ${type} could not be uploaded. Please try again`,
      variant: 'destructive',
    });
  };

  const onSuccess = (response: any) => {
    setFile(response);
    onFileChange(response.filePath);
    toast({
      title: `${type} uploaded successfully`,
      description: `${response.filePath} uploaded successfully!`,
    });
  };

  const onValidate = (file: File) => {
    if (type == 'image') {
      if (file.size > 20 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is 20MB or less',
          variant: 'destructive',
        });
        return false;
      }
    } else if (type === 'video') {
      if (file.size > 50 * 1024 * 1024) {
        toast({
          title: 'File size too large',
          description: 'Please upload a file that is 50MB or less',
          variant: 'destructive',
        });
        return false;
      }
    }
    return true;
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        useUniqueFileName={true}
        validateFile={onValidate}
        onUploadStart={() => setProgress(0)}
        onUploadProgress={({ loaded, total }) => {
          const precent = Math.round((loaded / total) * 100);
          setProgress(precent);
        }}
        folder={folder}
        accept={accept}
        className='hidden'
      />
      <button
        className={cn('upload-btn', styles.button)}
        onClick={(e) => {
          e.preventDefault();
          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <Image
          src='/icons/upload.svg'
          alt='upload-icon'
          width={20}
          height={20}
          className='object-contain'
        />
        <p className={cn('text-base text-light-100', styles.placeholder)}>
          {placeholder}
        </p>

        {progress > 0 && progress !== 0 && (
          <div className='w-full rounded-full bg-green-200'>
            <div className='progress' style={{ width: `${progress}` }}>
              {progress}%
            </div>
          </div>
        )}
      </button>
      {file &&
        (type === 'image' ? (
          <IKImage
            alt={file.filePath}
            path={file.filePath}
            width={500}
            height={300}
          />
        ) : type === 'video' ? (
          <IKVideo
            path={file.filePath}
            controls={true}
            className='h-96 w-full rounded-xl'
          />
        ) : null)}
    </ImageKitProvider>
  );
};

export default FileUpload;
