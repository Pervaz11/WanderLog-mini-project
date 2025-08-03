type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearTags: () => void;
};

const tagOptions = ["culture", "asia", "europe", "nature", "urban", "beach", "romantic"];

export const ExploreFilterBar = ({
  search,
  onSearchChange,
  selectedTags,
  onTagToggle,
  onClearTags,
}: Props) => {
  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Search destinations or journals..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-4 py-2  rounded-lg shadow-sm text-sm"
      />

      <div className="flex flex-wrap gap-2">
        {tagOptions.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`text-xs px-3 py-1 rounded-full  transition ${selectedTags.includes(tag)
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
          >
            #{tag}
          </button>
        ))}
        {selectedTags.length > 0 && (
          <button
            onClick={onClearTags}
            className="text-xs text-gray-600 hover:underline ml-2"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};
