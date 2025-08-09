import Link from "next/link";
import { company } from "@/config/company";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-neutral-600 dark:text-neutral-300 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h4 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
              {company.name}
            </h4>
            <p className="mt-3 max-w-sm">{company.description}</p>
            <p className="mt-3 text-xs">Established {company.establishedYear}</p>
          </div>
          <div>
            <h5 className="font-semibold">Company</h5>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:underline">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Contact</h5>
            <ul className="mt-3 space-y-2">
              <li>
                {company.address}, {company.city}, {company.state}-{company.postalCode}, {company.country}
              </li>
              <li>CEO: {company.ceo}</li>
              <li>GST: {company.gstNumber}</li>
              <li>Bank: {company.bank}</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Payments & Logistics</h5>
            <ul className="mt-3 space-y-2">
              <li>Payment Modes: {company.paymentModes.join(", ")}</li>
              <li>Shipment Mode: {company.shipmentMode}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-neutral-200 pt-6 text-xs dark:border-neutral-800">
          © {new Date().getFullYear()} GK International. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


