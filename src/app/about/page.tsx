import { company } from "@/config/company";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
      <h1 className="text-3xl font-semibold">About {company.name}</h1>
      <p className="mt-4 text-neutral-700 dark:text-neutral-300">
        Established in the year {company.establishedYear}, {`"${company.name}"`} has
        made a well‑recognized name as a Manufacturer and Wholesale Trader of
        Cattle Feed, Animal Feed, Chicken Feed, etc. {company.description}
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
          <h3 className="text-sm font-semibold">Basic Information</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>Nature of Business: {company.natureOfBusiness}</li>
            <li>CEO: {company.ceo}</li>
            <li>
              Registered Address: {company.address}, {company.city}, {company.state}-
              {company.postalCode}, {company.country}
            </li>
            <li>Total Employees: {company.employeesRange}</li>
            <li>GST Registration Date: {company.gstRegistrationDate}</li>
            <li>Legal Status: {company.legalStatus}</li>
            <li>Annual Turnover: {company.annualTurnover}</li>
            <li>GST No.: {company.gstNumber}</li>
            <li>Banker: {company.bank}</li>
          </ul>
        </div>
        <div className="rounded-lg border border-neutral-200 p-5 dark:border-neutral-800">
          <h3 className="text-sm font-semibold">Why Us?</h3>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
            {company.whyUsBlurb}
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-neutral-600 dark:text-neutral-300">
            {company.keyFactors.map((k) => (
              <li key={k}>{k}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


