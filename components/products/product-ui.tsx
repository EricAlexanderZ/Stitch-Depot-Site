"use client";

import Image from "next/image";
import { useEffect, useState, type ChangeEvent, type ReactNode } from "react";

export function Label({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-base font-bold text-[#F0F0F0]">{children}</p>;
}

export function PlacementButton({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className={`rounded-2xl border px-4 py-3 text-left text-sm font-semibold transition ${selected ? "border-[#4A90C4] bg-[#0C2340] shadow-sm text-[#F0F0F0]" : "border-white/10 bg-[#222222] text-[#A8B4BC] hover:border-white/20"}`}>
      {label}
    </button>
  );
}

export function Feature({ image, title, text }: { image: string; title: string; text: string }) {
  return (
    <div className="text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center">
        <Image src={image} alt={title} width={96} height={96} className="object-contain" />
      </div>
      <h3 className="mt-4 text-xl font-bold text-[#111111]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#444444]">{text}</p>
    </div>
  );
}

export function ReviewCard({ initials, title, date, text }: { initials: string; title: string; date: string; text: string }) {
  return (
    <div className="border-t border-white/10 py-8 first:border-t-0 first:pt-0">
      <div className="flex gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4A90C4] text-sm font-bold text-white">{initials}</div>
        <div className="flex-1">
          <div className="text-[#f0b100]">★★★★★</div>
          <h3 className="mt-1 text-lg font-bold text-[#F0F0F0]">{title}</h3>
          <p className="text-xs text-[#A8B4BC]">Verified · {date}</p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#A8B4BC]">{text}</p>
        </div>
      </div>
    </div>
  );
}

export type QuantityOption = { label: string; qty: number; price: number };

export function QuantitySelector({ quantities, selectedQuantity, isCustomQuantity, customQuantity, customQuantityError, customQtyIsValid, total, perUnit, upcharge = 0, perPieceUpcharge = 0, onPresetSelect, onCustomChange, onCustomFocus }: {
  quantities: QuantityOption[]; selectedQuantity: string; isCustomQuantity: boolean; customQuantity: string; customQuantityError: string; customQtyIsValid: boolean; total: number; perUnit: number; upcharge?: number; perPieceUpcharge?: number;
  onPresetSelect: (label: string) => void; onCustomChange: (e: ChangeEvent<HTMLInputElement>) => void; onCustomFocus: () => void;
}) {
  return (
    <div className="space-y-3">
      {quantities.map((q) => (
        <button key={q.label} type="button" onClick={() => onPresetSelect(q.label)} className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left text-sm font-semibold transition ${!isCustomQuantity && selectedQuantity === q.label ? "border-[#4A90C4] bg-[#0C2340] shadow-sm text-[#F0F0F0]" : "border-white/10 bg-[#222222] text-[#A8B4BC] hover:border-white/20"}`}>
          <span>{q.label}</span>
          <span>${(q.price + upcharge + q.qty * perPieceUpcharge).toFixed(2)}</span>
        </button>
      ))}
      <div className={`rounded-2xl border px-4 py-4 transition ${isCustomQuantity ? "border-[#4A90C4] bg-[#0C2340] shadow-sm" : "border-white/10 bg-[#222222]"}`}>
        <div className="flex items-center justify-between gap-4">
          <button type="button" onClick={onCustomFocus} className="text-left text-sm font-semibold text-[#F0F0F0]">Custom quantity</button>
          <div className="flex items-center gap-4">
            <input type="text" inputMode="numeric" pattern="[0-9]*" value={isCustomQuantity ? customQuantity : ""} onChange={onCustomChange} onFocus={onCustomFocus} placeholder="Enter" className="w-20 sm:w-24 rounded-2xl border border-[#4A90C4] bg-[#222222] px-4 py-3 text-center text-sm font-medium text-[#F0F0F0] outline-none" />
            {isCustomQuantity && customQtyIsValid && (
              <div className="min-w-[92px] text-right">
                <p className="text-xl font-bold text-[#F0F0F0]">${total.toFixed(2)}</p>
                <p className="text-xs text-[#A8B4BC]">${perUnit.toFixed(2)} each</p>
              </div>
            )}
          </div>
        </div>
        {isCustomQuantity && customQuantityError && <p className="mt-3 text-sm text-red-400">{customQuantityError}</p>}
      </div>
    </div>
  );
}

export function PriceSummary({ total, perUnit, unit, isValid, onSubmit, summaryItems }: {
  total: number; perUnit: number; unit: string; isValid: boolean; onSubmit: () => void; summaryItems: { label: string; value: string }[];
}) {
  return (
    <div>
      <div className="rounded-[1.75rem] border border-white/10 bg-[#222222] p-6 text-center shadow-sm">
        <p className="text-4xl font-extrabold text-[#F0F0F0]">{isValid ? `$${total.toFixed(2)}` : "—"}</p>
        <p className="mt-2 text-sm text-[#A8B4BC]">{isValid ? `$${perUnit.toFixed(2)} / ${unit}` : "—"}</p>
      </div>
      <button type="button" onClick={onSubmit} disabled={!isValid} className={`mt-5 w-full rounded-2xl px-6 py-4 text-sm font-bold text-white transition ${!isValid ? "cursor-not-allowed bg-[#444]" : "bg-[#4A90C4] hover:scale-[1.02] hover:bg-[#4A90C4]"}`}>
        Continue to Upload
      </button>
      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#222222] p-5 text-left shadow-sm">
        <p className="text-sm font-bold text-[#F0F0F0]">Your Selection</p>
        <div className="mt-4 space-y-2 text-sm text-[#A8B4BC]">
          {summaryItems.map((item) => (
            <p key={item.label}><span className="font-semibold text-[#F0F0F0]">{item.label}:</span> {item.value}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductPreview({ src, backSrc, alt, fallbackHex, fallbackEmoji, label, colorPickerSlot }: {
  src: string; backSrc?: string; alt: string; fallbackHex: string; fallbackEmoji: string; label: string; colorPickerSlot?: ReactNode;
}) {
  const [imgError, setImgError] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalView, setModalView] = useState<"front" | "back">("front");
  useEffect(() => { setImgError(false); }, [src]);
  const canExpand = !!backSrc || !!colorPickerSlot;
  return (
    <>
      <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[#222222] p-5 shadow-sm">
        <p className="text-sm font-semibold text-[#A8B4BC]">Selected Preview</p>
        <button type="button" onClick={() => canExpand && (setModalView("front"), setModalOpen(true))} disabled={!canExpand} className={`mt-4 block w-full rounded-[1.5rem] bg-[#222222] p-2 transition ${canExpand ? "cursor-pointer hover:opacity-90" : "cursor-default"}`}>
          {canExpand && <p className="mb-2 text-center text-sm font-semibold text-[#4A90C4]">{backSrc ? "Tap to view front & back · pick a color" : "Tap to pick a color"}</p>}
          <div className="flex items-center justify-center">
            {!imgError && src ? (
              <div className="relative h-72 w-full"><Image src={src} alt={alt} fill priority className="object-contain" onError={() => setImgError(true)} /></div>
            ) : (
              <div className="flex h-40 w-40 items-center justify-center rounded-2xl" style={{ backgroundColor: fallbackHex }}><span className="text-6xl">{fallbackEmoji}</span></div>
            )}
          </div>
        </button>
        <p className="mt-4 text-center text-sm font-semibold text-[#F0F0F0]">{label}</p>
      </div>
      {modalOpen && canExpand && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 sm:items-center" onClick={() => setModalOpen(false)}>
          <div className="flex max-h-[88vh] w-full max-w-sm flex-col overflow-hidden rounded-t-[2rem] bg-[#222222] sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3">
              <p className="text-sm font-bold text-[#F0F0F0]">{label}</p>
              <button type="button" onClick={() => setModalOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-[#F0F0F0] hover:bg-white/20">✕</button>
            </div>
            <div className="overflow-y-auto px-5 pb-2">
              {backSrc && (
                <div className="flex gap-2">
                  {(["front", "back"] as const).map((view) => (
                    <button key={view} type="button" onClick={() => setModalView(view)} className={`flex-1 rounded-xl py-2.5 text-sm font-semibold capitalize transition ${modalView === view ? "bg-[#4A90C4] text-white" : "bg-[#222222] text-[#A8B4BC] hover:bg-[#2a2a2a]"}`}>{view}</button>
                  ))}
                </div>
              )}
              <div className="mt-4 flex items-center justify-center rounded-[1.5rem] bg-[#222222] p-2">
                <div className="relative h-60 sm:h-80 w-full"><Image src={backSrc && modalView === "back" ? backSrc : src} alt={alt} fill className="object-contain" /></div>
              </div>
              {colorPickerSlot && <div className="mt-4">{colorPickerSlot}</div>}
            </div>
            <div className="px-5 pt-3 pb-5">
              <button type="button" onClick={() => setModalOpen(false)} className="w-full rounded-2xl bg-[#4A90C4] py-3 text-sm font-bold text-white transition hover:bg-[#4A90C4]">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
