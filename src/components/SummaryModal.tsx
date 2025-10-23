import { X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";

interface SummaryModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  summary: string;
  imageUrl?: string | null;
  articleUrl?: string | null;
}

export default function SummaryModal({
  open,
  onClose,
  title,
  summary,
  imageUrl,
  articleUrl,
}: SummaryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">Summary</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {imageUrl && (
            <div className="mb-6 rounded-lg overflow-hidden">
              <img src={imageUrl} alt="" className="w-full h-auto" />
            </div>
          )}

          <h3 className="text-2xl font-semibold text-gray-900 mb-4">{title}</h3>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{summary}</p>
          </div>

          {articleUrl && (
            <div className="mt-6 pt-6 border-t">
              <a
                href={articleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Read full article
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}