import React from 'react';
import { Lock, Globe, Share2 } from 'lucide-react';

interface ListCardProps {
    title: string;
    description: string;
    isPublic: boolean;
    isNew?: boolean;
    completed: number;
    total: number;
    tags: string[];
    collaborators: number;
    createdAt: string;
}

const ListCard: React.FC<ListCardProps> = ({
    title,
    description,
    isPublic,
    isNew,
    completed,
    total,
    tags,
    collaborators,
    createdAt,
}) => {
    const progress = (completed / total) * 100;

    return (
        <div className="bg-white rounded-xl shadow-sm border flex flex-col overflow-hidden transition hover:shadow-md">
            <div className="bg-gray-100 h-40 flex items-center justify-center">
                <div className="text-gray-400 text-sm">No Image</div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                {/* Status */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        {isPublic ? (
                            <span className="flex items-center gap-1 text-xs text-gray-600 border px-2 py-0.5 rounded-full">
                                <Globe className="w-4 h-4" />
                                Public
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-xs text-gray-600 border px-2 py-0.5 rounded-full">
                                <Lock className="w-4 h-4" />
                                Private
                            </span>
                        )}
                        {isNew && (
                            <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded-full">
                                New
                            </span>
                        )}
                    </div>

                    <Share2 className="w-5 h-5 text-gray-500 cursor-pointer hover:text-black" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">{description}</p>

                {/* Progress */}
                <p className="text-xs text-gray-600 mb-1">
                    {completed}/{total} destinations completed
                </p>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                    <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                    {tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{collaborators} collaborator{collaborators > 1 ? 's' : ''}</span>
                    <span>Created {createdAt}</span>
                </div>
            </div>
        </div>
    );
};

export default ListCard;
