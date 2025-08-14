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
    <div className="bg-white border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="h-40 bg-gray-100 flex items-center justify-center">
        {list.image ? <img src={list.image} className="w-full h-full object-cover" /> : "No Image"}
      </div>
      <div className="p-4 space-y-2">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{list.isPublic ? "Public" : "Private"}</span>
          {list.new && <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-full">New</span>}
        </div>
        <h3 className="font-semibold">{list.title}</h3>
        <p className="text-sm text-gray-600">{list.description}</p>
        <p className="text-xs text-gray-500">{list.completed}/{list.destinations} destinations completed</p>
        <div className="flex flex-wrap gap-2 text-xs mt-2">
          {list.tags.map((t, i) => <span key={i} className="bg-gray-200 px-2 py-0.5 rounded-full">{t}</span>)}
        </div>
      </div>
    </div>
  );
};
