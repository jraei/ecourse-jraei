
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Trash2, Plus } from 'lucide-react';
import { ReactNode } from 'react';

interface Column<T> {
    key: keyof T | string;
    label: string;
    render?: (item: T) => ReactNode;
}

interface DataTableProps<T> {
    title: string;
    data: T[];
    columns: Column<T>[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
    onCreate: () => void;
    createLabel?: string;
}

export function DataTable<T extends { id: number }>({
    title,
    data,
    columns,
    onEdit,
    onDelete,
    onCreate,
    createLabel = 'Create New'
}: DataTableProps<T>) {
    return (
        <Card className="bg-gray-900 border-yellow-500/30">
            <CardHeader className="border-b border-yellow-500/20">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-yellow-400">{title}</CardTitle>
                    <Button
                        onClick={onCreate}
                        className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                        size="sm"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        {createLabel}
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/50">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column.key.toString()}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
                                    >
                                        {column.label}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {data.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-800/30 transition-colors">
                                    {columns.map((column) => (
                                        <td key={column.key.toString()} className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                            {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(item)}
                                                className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-500/10"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(item)}
                                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {data.length === 0 && (
                    <div className="py-12 text-center text-gray-500">
                        No data available
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
