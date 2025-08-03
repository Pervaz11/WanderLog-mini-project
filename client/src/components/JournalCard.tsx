type Props = {
    journal: {
        id: string;
        title: string;
        excerpt: string;
        createdAt: string;
        tags: string[];
        image?: string;
    };
};

export const JournalCard = ({ journal }: Props) => {
    return (
        <div className="group bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="h-40 w-full bg-gray-100 relative">
                {journal.image ? (
                    <img src={journal.image} alt={journal.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>
                )}
                <div className="absolute top-2 right-2 bg-white px-2 py-1 text-xs rounded-full shadow text-gray-600">
                    {new Date(journal.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">{journal.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{journal.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                    {journal.tags.map((tag, idx) => (
                        <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
