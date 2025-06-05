
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';

interface PDFViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string | null;
  title: string;
}

const PDFViewerDialog = ({ isOpen, onClose, pdfUrl, title }: PDFViewerDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-[90vw] h-[90vh] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="flex items-center justify-between">
            <span>{title}</span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          {pdfUrl ? (
            <iframe
              src={pdfUrl}
              className="w-full h-full border-0"
              title={title}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">PDF wird geladen...</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PDFViewerDialog;
