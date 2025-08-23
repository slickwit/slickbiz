import { fData } from '@/lib/format-number';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { FileWithPathAndPreview } from './utils';

import { varFade } from '@/components/ui/animate/variants/fade';
import { IconButton } from '@/components/ui/buttons/icon-button';
import FileThumbnail from '@/components/ui/file-thumbnail/file-thumbnail';
import { fileData } from '@/components/ui/file-thumbnail/utils';

// ----------------------------------------------------------------------

interface MultiFilePreviewProps {
    thumbnail?: boolean;
    files: (FileWithPathAndPreview | null | string)[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onRemove?: (file: FileWithPathAndPreview | string, index: number) => any;
    className?: string;
}

export default function MultiFilePreview({ thumbnail, files, onRemove, className }: MultiFilePreviewProps) {
    return (
        <AnimatePresence initial={false}>
            {files.map((file, idx) => {
                if (!file) return null;
                const { name = '', size = 0 } = fileData(file);

                const isNotFormatFile = typeof file === 'string';

                if (thumbnail) {
                    return (
                        <motion.div
                            key={idx}
                            {...varFade().inUp}
                            className="relative m-1 inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-sm border border-gray-800/12 dark:border-gray-800/80"
                        >
                            <FileThumbnail tooltip imageView file={file} className="absolute" />

                            {!!onRemove && (
                                <IconButton
                                    size="xs"
                                    onClick={() => onRemove(file, idx)}
                                    className="absolute top-1 right-1 bg-gray-900/60 p-1 text-white hover:bg-gray-600/55"
                                >
                                    <X width={14} />
                                </IconButton>
                            )}
                        </motion.div>
                    );
                }

                return (
                    <motion.div
                        key={idx}
                        // {...varFade().inUp}
                        className={cn(
                            'flex flex-row items-center space-x-3 rounded-lg border border-gray-900/15 px-3 py-3.5 dark:border-gray-600/55',
                            className,
                        )}
                    >
                        <FileThumbnail file={file} />

                        <div className="relative flex w-full items-center justify-start">
                            <div className="min-w-0 flex-1">
                                <p className="block text-sm">{isNotFormatFile ? file : name}</p>
                                <p className="block text-xs text-muted-foreground">{isNotFormatFile ? '' : fData(size)}</p>
                            </div>
                        </div>

                        {!!onRemove && (
                            <IconButton size="xs" onClick={() => onRemove(file, idx)}>
                                <X width={16} />
                            </IconButton>
                        )}
                    </motion.div>
                );
            })}
        </AnimatePresence>
    );
}
