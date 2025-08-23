import { fileFormat as checkFileFormat } from '@/components/ui/file-thumbnail/utils';
import UploadPlaceholder from './upload-placeholder';
import { ALLOWED_PREVIEW, type FileWithPathAndPreview } from './utils';

interface SinglePreviewProps {
    file?: FileWithPathAndPreview | string | null;
    multiple: boolean;
}

export default function SinglePreview({ file, multiple }: SinglePreviewProps) {
    if (!file) {
        return <UploadPlaceholder multiple={multiple} />;
    }

    const fileFormat = checkFileFormat(typeof file === 'string' ? file : file.name);

    if (!ALLOWED_PREVIEW.includes(fileFormat)) return <UploadPlaceholder multiple={multiple} />;

    if (fileFormat === 'image') {
        return (
            <div className="absolute inset-0 h-full w-full">
                <img
                    src={typeof file === 'string' ? file : file.preview}
                    alt={`${typeof file === 'string' ? file : file.name}-file preview`}
                    height={400}
                    width={400}
                    className="h-[400px] w-full object-cover"
                />
            </div>
        );
    }

    const src = typeof file === 'string' ? file : file.preview;
    if (fileFormat === 'pdf') {
        return (
            <div className="h-[460px]">
                <embed type="application/pdf" src={src} className="-mt-8 h-[460px] w-full" />
            </div>
        );
    }

    return <UploadPlaceholder multiple={multiple} />;
}
