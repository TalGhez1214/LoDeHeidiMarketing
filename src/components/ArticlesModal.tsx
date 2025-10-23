import { X, ExternalLink } from "lucide-react";
import { Dialog, DialogContent } from "./ui/dialog";
import { cn } from "../lib/utils";

export interface ArticlesModalItem {
  title: string;
  author?: string;
  url: string;
  summary?: string;
  quote?: string;
  imageUrl?: string | null;
}

interface ArticlesModalProps {
  open: boolean;
  onClose: () => void;
  articles: ArticlesModalItem[];
}

export default function ArticlesModal({ open, onClose, articles }: ArticlesModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-0">
        <div className="sticky top-0 bg-white border-b z-10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl">Related Articles</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {articles.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all group"
            >
              <div className="flex gap-4">
                {article.imageUrl && (
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                    <img
                      src={article.imageUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2">
                    <h3 className="flex-1 font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                      {article.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 flex-shrink-0 mt-0.5" />
                  </div>
                  {article.author && (
                    <p className="text-sm text-gray-600 mt-1">By {article.author}</p>
                  )}
                  {article.summary && (
                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">{article.summary}</p>
                  )}
                  {article.quote && (
                    <p className="text-sm text-indigo-600/80 italic mt-2 line-clamp-2">
                      "{article.quote}"
                    </p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}