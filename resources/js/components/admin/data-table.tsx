
import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';

interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onAdd?: () => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    searchPlaceholder?: string;
    title: string;
    addButtonText?: string;
}

export function DataTable<T extends Record<string, any>>({
    data,
    columns,
    onAdd,
    onEdit,
    onDelete,
    searchPlaceholder = "Search...",
    title,
    addButtonText = "Add New"
}: DataTableProps<T>) {
    const [search, setSearch] = useState('');
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = useMemo(() => {
        return data.filter(item =>
            Object.values(item).some(value =>
                String(value).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [data, search]);

    const sortedData = useMemo(() => {
        if (!sortColumn) return filteredData;
        
        return [...filteredData].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            
            if (sortDirection === 'asc') {
                return aVal > bVal ? 1 : -1;
            }
            return aVal < bVal ? 1 : -1;
        });
    }, [filteredData, sortColumn, sortDirection]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage]);

    const totalPages = Math.ceil(sortedData.length / itemsPerPage);

    const handleSort = (column: keyof T) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">{title}</h1>
                    <p className="text-gray-400 mt-1">
                        Showing {paginatedData.length} of {sortedData.length} entries
                    </p>
                </div>
                {onAdd && (
                    <Button
                        onClick={onAdd}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/25"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {addButtonText}
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder:text-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                />
            </div>

            {/* Desktop Table */}
            <Card className="bg-zinc-900 border-zinc-800 hidden md:block overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                {columns.map((column) => (
                                    <th
                                        key={String(column.key)}
                                        className="text-left p-4 text-gray-300 font-medium"
                                    >
                                        {column.sortable ? (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                                            >
                                                {column.label}
                                                <ArrowUpDown className="w-4 h-4" />
                                            </button>
                                        ) : (
                                            column.label
                                        )}
                                    </th>
                                ))}
                                <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors"
                                >
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="p-4 text-white">
                                            {column.render
                                                ? column.render(item[column.key], item)
                                                : String(item[column.key])
                                            }
                                        </td>
                                    ))}
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            {onEdit && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="border-zinc-600 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all"
                                                >
                                                    Edit
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all"
                                                >
                                                    Delete
                                                </Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
                {paginatedData.map((item, index) => (
                    <Card key={index} className="bg-zinc-900 border-zinc-800 p-4">
                        <div className="space-y-3">
                            {columns.map((column) => (
                                <div key={String(column.key)} className="flex justify-between">
                                    <span className="text-gray-400 text-sm">{column.label}:</span>
                                    <span className="text-white text-sm">
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : String(item[column.key])
                                        }
                                    </span>
                                </div>
                            ))}
                            <div className="flex gap-2 pt-2">
                                {onEdit && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(item)}
                                        className="border-zinc-600 text-white hover:bg-yellow-500 hover:text-black hover:border-yellow-500 transition-all flex-1"
                                    >
                                        Edit
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete(item)}
                                        className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all flex-1"
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-zinc-600 text-white hover:bg-zinc-700"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <span className="text-white px-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-zinc-600 text-white hover:bg-zinc-700"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
