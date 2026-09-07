"use client";

import { Printer, ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";

export function ResumeActions() {
  return (
    <div className="resume-actions">
      <Link href="/" className="text-link">
        <ArrowLeft size={18} />
        Kembali ke portofolio
      </Link>
      <button
        type="button"
        className="button button-primary"
        onClick={() => window.print()}
      >
        <Printer size={19} />
        Cetak / Simpan PDF
      </button>
    </div>
  );
}
