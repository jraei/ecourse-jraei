
import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'password' | 'textarea' | 'select'
  options?: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
}

interface CrudModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: Record<string, any>) => void
  title: string
  description?: string
  fields: FormField[]
  initialData?: Record<string, any>
  isLoading?: boolean
}

export function CrudModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  fields,
  initialData = {},
  isLoading = false,
}: CrudModalProps) {
  const [formData, setFormData] = React.useState<Record<string, any>>(initialData)

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-white">{title}</DialogTitle>
            {description && (
              <DialogDescription className="text-gray-400">
                {description}
              </DialogDescription>
            )}
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            {fields.map((field) => (
              <div key={field.name} className="grid grid-cols-4 items-center gap-4">
                <Label 
                  htmlFor={field.name} 
                  className="text-right text-gray-300"
                >
                  {field.label}
                </Label>
                
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="col-span-3 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500 rounded-md p-2 min-h-[80px]"
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    required={field.required}
                    className="col-span-3 bg-gray-700 border-gray-600 text-white focus:border-yellow-500 rounded-md p-2"
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    required={field.required}
                    className="col-span-3 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-yellow-500"
                  />
                )}
              </div>
            ))}
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-yellow-500 text-black hover:bg-yellow-400 disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
