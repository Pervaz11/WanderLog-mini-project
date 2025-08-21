import React from "react";

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
    isNew = false,
    completed,
    total,
    tags,
    collaborators,
    createdAt,
}) => {
    return (
        <div className="border rounded-md p-4 shadow-sm">
            <h2 className="font-bold text-lg">{title}</h2>
            <p className="text-gray-600">{description}</p>
            <p>
                Completed: {completed}/{total}
            </p>
            <p>Tags: {tags.join(", ")}</p>
            <p>Collaborators: {collaborators}</p>
            <p>Created at: {createdAt}</p>
            <p>{isPublic ? "Public" : "Private"}</p>
            {isNew && <span className="text-green-500 font-semibold">New!</span>}
        </div>
    );
};

export default ListCard;
