
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReactNode } from 'react';

interface CrudModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    onSubmit: (e: React.FormEvent) => void;
    children: ReactNode;
    submitLabel?: string;
    isSubmitting?: boolean;
}

export function CrudModal({
    isOpen,
    onClose,
    title,
    onSubmit,
    children,
    submitLabel = 'Save',
    isSubmitting = false
}: CrudModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-gray-900 border border-yellow-500/30 text-gray-100 max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-yellow-400">{title}</DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    {children}
                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-gray-600 hover:bg-gray-800"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900"
                        >
                            {isSubmitting ? 'Saving...' : submitLabel}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
