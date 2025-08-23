import { Button } from '@/components/ui/buttons/button';
import { IconButton } from '@/components/ui/buttons/icon-button';
import { fileFormat } from '@/components/ui/file-thumbnail/utils';
import { cn } from '@/lib/utils';
import { CloudUpload, X } from 'lucide-react';
import { type HTMLAttributes } from 'react';
import { type Accept, type DropzoneOptions, useDropzone } from 'react-dropzone';

import MultiFilePreview from './preview-multi-file';
import SinglePreview from './preview-single-file';
import RejectionFiles from './rejection-files';
import { ALLOWED_PREVIEW, type FileWithPathAndPreview } from './utils';

// ----------------------------------------------------------------------

interface UploadProps extends DropzoneOptions {
    disabled?: boolean;
    error?: boolean;
    helperText?: React.ReactNode;
    accept?: Accept;
    className?: Pick<HTMLAttributes<HTMLDivElement>, 'className'>;
    multiple?: boolean;
    thumbnail?: boolean;

    file?: FileWithPathAndPreview | null | string;
    onDelete?: () => void;

    files?: (FileWithPathAndPreview | null | string)[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemove?: (file: FileWithPathAndPreview | string, index: number) => any;
    onRemoveAll?: () => void;
    onUpload?: () => void;
}

const Upload = (props: UploadProps) => {
    const {
        disabled,
        multiple = false,
        error,
        helperText,
        //
        file,
        onDelete,
        //
        files,
        thumbnail = false,
        onUpload,
        onRemove,
        onRemoveAll,
        className,
        ...other
    } = props;

    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        multiple,
        disabled,
        ...other,
    });

    const hasError = isDragReject || !!error;
    const hasFile = !!file && !multiple;
    const hasFiles = !!files && multiple && !!files.length;

    const isFileAllowedPreview = !hasFile ? false : ALLOWED_PREVIEW.includes(fileFormat(typeof file === 'string' ? file : file.name));

    const removeSinglePreview = hasFile && isFileAllowedPreview && !!onDelete && (
        <IconButton size="xs" onClick={onDelete} className="absolute top-4 right-4 z-10 bg-gray-500/70 text-white hover:bg-gray-500/50">
            <X width={18} />
        </IconButton>
    );

    const renderMultiPreview = hasFiles && multiple && (
        <>
            <div className="my-6 space-y-3">
                <MultiFilePreview files={files} thumbnail={thumbnail} onRemove={onRemove} />
            </div>
            <div className="flex justify-end gap-2.5">
                {!!onRemoveAll && (
                    <Button variant="outline" size="sm" onClick={onRemoveAll}>
                        Remove All
                    </Button>
                )}
                {!!onUpload && (
                    <Button size="sm" variant="filled" onClick={onUpload}>
                        <CloudUpload className="mr-1" />
                        Upload
                    </Button>
                )}
            </div>
        </>
    );

    return (
        <div className={cn('relative w-full', className)}>
            <div
                {...getRootProps()}
                className={cn(
                    'relative min-h-[200px] cursor-pointer overflow-hidden rounded-lg bg-gray-400/12 outline-2 outline-input transition-all outline-dashed hover:opacity-80 dark:outline-input/35',
                    {
                        'opacity-80': isDragActive,
                        'pointer-events-none opacity-50': disabled,
                        'text-error bg-error/10 dark:bg-error/5 outline-error/35': hasError || (!!fileRejections.length && files?.length === 0),
                        'h-[400px] bg-transparent': hasFile && isFileAllowedPreview,
                    },
                )}
            >
                <input {...getInputProps()} />
                <SinglePreview file={file} multiple={multiple} />
            </div>

            {removeSinglePreview}

            {!!fileRejections.length && <RejectionFiles fileRejections={fileRejections} />}

            {hasFile && !isFileAllowedPreview && (
                <div className="my-4 space-y-3">
                    <MultiFilePreview files={[file] as FileWithPathAndPreview[] | string[]} onRemove={onDelete} thumbnail={thumbnail} />
                </div>
            )}

            {renderMultiPreview}

            {!!helperText && helperText}
        </div>
    );
};

Upload.displayName = 'Upload';

export { Upload, type UploadProps };
