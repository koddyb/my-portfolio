import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "./button";
import { X, Download } from "lucide-react";

type PdfViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
};

export function PdfViewer({ isOpen, onClose, pdfUrl, title }: PdfViewerProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader className="flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <DialogTitle className="text-xl">{title}</DialogTitle>
            <a 
              href={`./${pdfUrl}`} 
              download 
              title="Télécharger le document"
              className="text-gray-100 hover:text-gray-700 transition-colors"
            >
              <Download className="h-7 w-7" />
            </a>
          </div>
          {/* <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button> */}
        </DialogHeader>
        <div className="flex-1 overflow-auto">
          <iframe
            src={`./${pdfUrl}#toolbar=0`}
            className="w-full h-[70vh] border rounded-md"
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
