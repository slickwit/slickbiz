import type { FileRejection } from 'react-dropzone';
import type { FileWithPathAndPreview } from './utils';

import { fileData } from '@/components/ui/file-thumbnail/utils';
import { fData } from '@/lib/format-number';

// ----------------------------------------------------------------------

export default function RejectionFiles({ fileRejections }: { fileRejections: readonly FileRejection[] }) {
    return (
        <div className="border-error bg-error/12 mt-6 rounded-lg border border-dashed px-4 py-2 text-left">
            {fileRejections.map(({ file, errors }) => {
                const { path, size } = fileData(file as FileWithPathAndPreview);
                return (
                    <div key={path} className="my-1">
                        <p className="text-common overflow-hidden text-sm font-medium text-nowrap text-ellipsis">
                            {path}
                            {size ? ` - ${fData(size)}` : ''}
                        </p>
                        {errors.map((err) => (
                            <span key={err.code} className="text-xs">
                                - {err.message}
                            </span>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}
