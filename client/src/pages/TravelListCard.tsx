type Props = {
  list: {
    id: string;
    title: string;
    description: string;
    destinations: number;
    completed: number;
    isPublic: boolean;
    tags: string[];
    image: string;
    new: boolean;
  };
};

export const TravelListCard = ({ list }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      {/* Image Section */}
      <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
        {list.image ? (
          <img src={list.image} alt={list.title} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm">No Image</span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Status row */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <i className="ri-earth-line" />
            {list.isPublic ? 'Public' : 'Private'}
          </div>
          {list.new && (
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full font-medium">
              New
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900">{list.title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-600">{list.description}</p>

        {/* Completion Info */}
        <p className="text-xs text-gray-500">
          {list.completed}/{list.destinations} destinations completed
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          {list.tags.map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
