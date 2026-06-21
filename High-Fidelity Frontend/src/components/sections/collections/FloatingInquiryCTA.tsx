import { MessageCircle } from "lucide-react";

interface FloatingInquiryCTAProps {
  itemCount: number;
  onSendInquiry: () => void;
}

export default function FloatingInquiryCTA({
  itemCount,
  onSendInquiry,
}: FloatingInquiryCTAProps) {
  if (itemCount === 0) return null;

  return (
    <div className="fixed bottom-[96px] lg:bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-[calc(100%-48px)] sm:w-auto">
      <div className="bg-foreground shadow-2xl p-4 flex items-center justify-between gap-6 sm:gap-12">
        <div>
          <p className="text-[10px] font-bold tracking-[0.16em] uppercase text-background/70 mb-0.5">Inquiry List</p>
          <p className="text-[13px] font-semibold text-background">
            {itemCount} Item{itemCount > 1 ? "s" : ""}
          </p>
        </div>
        <button
          onClick={onSendInquiry}
          className="flex items-center gap-2 bg-card text-foreground text-[11px] font-bold tracking-[0.13em] uppercase px-5 py-3 hover:bg-card transition-colors cursor-pointer"
        >
          <MessageCircle size={14} /> Send Inquiry
        </button>
      </div>
    </div>
  );
}
