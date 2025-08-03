type Props = {
    item: {
        id: string;
        type: "list" | "journal";
        title: string;
        description: string;
        tags: string[];
        image?: string;
        createdAt: string;
        author: string;
    };
};

export const ExploreCard = ({ item }: Props) => {
    return (
        <div className="group bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
            <div className="h-40 bg-gray-100 relative">
                {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>
                )}
                <div className="absolute top-2 left-2 bg-white text-xs px-2 py-0.5 rounded-full shadow">
                    {item.type === "list" ? "Travel List" : "Journal"}
                </div>
                <div className="absolute top-2 right-2 bg-white text-xs px-2 py-0.5 rounded-full shadow">
                    {new Date(item.createdAt).toLocaleDateString()}
                </div>
            </div>

            <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold group-hover:text-blue-600 transition">{item.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                <div className="text-xs text-gray-500">by @{item.author}</div>
                <div className="flex flex-wrap gap-2 mt-2">
                    {item.tags.map((tag, idx) => (
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
