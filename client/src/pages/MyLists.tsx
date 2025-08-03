import { useState } from 'react';
import { TravelListCard } from './TravelListCard';
import { EmptyState } from './EmptyState';

const mockLists = [
    {
        id: '1',
        title: 'European Adventure 2024',
        description: 'Exploring the historic cities and beautiful landscapes of Europe',
        destinations: 8,
        completed: 3,
        isPublic: true,
        tags: ['#culture', '#history', '#food'],
        image: '',
        new: true,
    },
    {
        id: '2',
        title: 'Asian Escape 2025',
        description: 'Discovering hidden gems across Southeast Asia',
        destinations: 10,
        completed: 5,
        isPublic: false,
        tags: ['#temples', '#beaches', '#streetfood'],
        image: '',
        new: false,
    },
];

export const MyLists = () => {
    const [activeTab, setActiveTab] = useState<'my' | 'shared'>('my');
    const [search, setSearch] = useState("");

    const filteredLists = (activeTab === 'my' ? mockLists : []).filter((list) =>
        list.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="px-6 py-8 max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-semibold mb-6">My Travel Lists</h1>

            {/* Tabs */}
            <div className="flex gap-3 mb-5">
                <button
                    onClick={() => setActiveTab('my')}
                    className={`px-5 py-2 text-sm rounded-full font-medium transition ${activeTab === 'my'
                        ? 'bg-black text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    My Lists ({mockLists.length})
                </button>
                <button
                    onClick={() => setActiveTab('shared')}
                    className={`px-5 py-2 text-sm rounded-full font-medium transition ${activeTab === 'shared'
                        ? 'bg-black text-white shadow'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Shared with Me (0)
                </button>
            </div>

            {/* Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search your travel lists..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm"
                />
                <button className="inline-flex items-center gap-2 px-4 py-2 text-sm border rounded-lg hover:bg-gray-100 transition">
                    <i className="ri-filter-line" />
                    Filter
                </button>
            </div>

            {/* Lists */}
            {filteredLists.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLists.map((list) => (
                        <TravelListCard key={list.id} list={list} />
                    ))}
                </div>
            )}
        </div>
    );
};
