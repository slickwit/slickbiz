import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { FileWithPathAndPreview } from '@/components/ui/upload/utils';
import { cn } from '@/lib/utils';
import type { MouseEventHandler } from 'react';
import DownloadButton from './download-button';
import { fileData, fileFormat, fileThumb } from './utils';

// ----------------------------------------------------------------------

interface FileThumbnailProps {
    file: string | FileWithPathAndPreview;
    tooltip?: boolean;
    imageView?: boolean;
    onDownload?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
}

export default function FileThumbnail({ file, tooltip, imageView, onDownload, className }: FileThumbnailProps) {
    const { name = '', path = '', preview = '' } = fileData(file);

    const format = fileFormat(path || preview);

    const renderContent =
        format === 'image' && imageView ? (
            <img alt="image preview" src={preview} className={cn('h-full w-full flex-shrink-0 object-cover', className)} />
        ) : (
            <img alt="image preview" src={fileThumb(format)} width={32} height={32} className={cn('flex-shrink-0', className)} />
        );

    if (tooltip) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <span className="flex h-[inherit] w-fit items-center justify-center">
                            {renderContent}
                            {onDownload && <DownloadButton onDownload={onDownload} />}
                        </span>
                    </TooltipTrigger>
                    <TooltipContent>
                        <span>{name}</span>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return (
        <>
            {renderContent}
            {onDownload && <DownloadButton onDownload={onDownload} />}
        </>
    );
}
