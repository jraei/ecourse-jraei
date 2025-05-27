import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, ChevronLeft, ChevronRight, ArrowUpDown, Database, Zap } from 'lucide-react';

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
        <div className="space-y-8">
            {/* Enhanced Header */}
            <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center">
                <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full"></div>
                    <div>
                        <div className="flex items-center gap-3">
                            <Database className="w-8 h-8 text-cyan-400" />
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
                                {title}
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <p className="text-gray-400 font-mono text-sm">
                                {paginatedData.length} of {sortedData.length} entries loaded
                            </p>
                        </div>
                    </div>
                </div>
                {onAdd && (
                    <Button
                        onClick={onAdd}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 px-6 py-3"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        {addButtonText}
                        <Zap className="w-4 h-4 ml-2" />
                    </Button>
                )}
            </div>

            {/* Enhanced Search */}
            <div className="relative max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-12 bg-zinc-900/50 border-zinc-700/50 text-white placeholder:text-gray-400 focus:border-cyan-400 focus:ring-cyan-400/20 rounded-xl backdrop-blur-sm h-12"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-100 transition-opacity pointer-events-none"></div>
            </div>

            {/* Enhanced Desktop Table */}
            <Card className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 border border-zinc-700/50 hidden lg:block overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 backdrop-blur-sm">
                            <tr className="border-b border-zinc-700/50">
                                {columns.map((column) => (
                                    <th
                                        key={String(column.key)}
                                        className="text-left p-6 text-gray-300 font-semibold uppercase tracking-wider text-sm"
                                    >
                                        {column.sortable ? (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="flex items-center gap-2 hover:text-cyan-400 transition-colors group"
                                            >
                                                {column.label}
                                                <ArrowUpDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                        ) : (
                                            column.label
                                        )}
                                    </th>
                                ))}
                                <th className="text-left p-6 text-gray-300 font-semibold uppercase tracking-wider text-sm">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-zinc-800/50 hover:bg-gradient-to-r hover:from-zinc-800/30 hover:to-zinc-700/30 transition-all duration-300 group"
                                >
                                    {columns.map((column) => (
                                        <td key={String(column.key)} className="p-6 text-white">
                                            {column.render
                                                ? column.render(item[column.key], item)
                                                : String(item[column.key])
                                            }
                                        </td>
                                    ))}
                                    <td className="p-6">
                                        <div className="flex gap-3">
                                            {onEdit && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onEdit(item)}
                                                    className="border-cyan-600/50 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-cyan-500/25"
                                                >
                                                    Modify
                                                </Button>
                                            )}
                                            {onDelete && (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => onDelete(item)}
                                                    className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-red-500/25"
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

            {/* Enhanced Mobile Cards */}
            <div className="lg:hidden space-y-4">
                {paginatedData.map((item, index) => (
                    <Card key={index} className="bg-gradient-to-br from-zinc-900/90 via-zinc-800/50 to-zinc-900/90 border border-zinc-700/50 p-6 hover:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm">
                        <div className="space-y-4">
                            {columns.map((column) => (
                                <div key={String(column.key)} className="flex justify-between items-start">
                                    <span className="text-gray-400 text-sm font-mono uppercase tracking-wider">{column.label}:</span>
                                    <span className="text-white text-sm text-right flex-1 ml-4">
                                        {column.render
                                            ? column.render(item[column.key], item)
                                            : String(item[column.key])
                                        }
                                    </span>
                                </div>
                            ))}
                            <div className="flex gap-3 pt-4 border-t border-zinc-700/50">
                                {onEdit && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onEdit(item)}
                                        className="border-cyan-600/50 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:border-cyan-500 transition-all duration-300 flex-1"
                                    >
                                        Modify
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => onDelete(item)}
                                        className="border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 flex-1"
                                    >
                                        Delete
                                    </Button>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="border-zinc-600/50 text-white hover:bg-zinc-700/50 disabled:opacity-30 backdrop-blur-sm"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-lg backdrop-blur-sm border border-zinc-700/50">
                        <span className="text-cyan-400 font-mono text-sm">Page</span>
                        <span className="text-white font-bold">{currentPage}</span>
                        <span className="text-gray-400 font-mono text-sm">of {totalPages}</span>
                    </div>
                    
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                        className="border-zinc-600/50 text-white hover:bg-zinc-700/50 disabled:opacity-30 backdrop-blur-sm"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            )}
        </div>
    );
}
