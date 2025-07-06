
import ClickLead from "../../../models/ClickLead";
import { format } from "date-fns";
import { writeFileSync } from "fs";
import { join } from "path";
import dbConnect from "../../../utils/db";


export const dynamic = "force-dynamic";

export default async function LeadsAdminPage() {
  await dbConnect();
  const leads = await ClickLead.find().sort({ createdAt: -1 }).lean();

  const handleExport = async () => {
    const csvRows = [
  ["Email", "Element Name", "Date"],
  ...leads.map((lead) => [
    "email" in lead ? lead.email : "",
    "elementName" in lead ? lead.elementName : "",
    "createdAt" in lead ? format(new Date(lead.createdAt as string), "yyyy-MM-dd HH:mm") : "",
  ]),
];

    const csvContent = csvRows.map((row) => row.join(",")).join("\n");
    const filePath = join(process.cwd(), "public", "leads.csv");

    writeFileSync(filePath, csvContent);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">📋 Leads Capturés</h1>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Email</th>
            <th className="p-2">Element</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead, idx: number) => (
            <tr key={idx} className="border-t">
              <td className="p-2">{lead.email}</td>
              <td className="p-2">{lead.elementName}</td>
              <td className="p-2">
                {format(new Date(lead.createdAt), "yyyy-MM-dd HH:mm")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a
        href="/leads.csv"
        download
        className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleExport}
      >
        Exporter en CSV
      </a>
    </main>
  );
}
export const metadata = {
  title: "Admin - Leads Capturés",
  description: "Page d'administration pour gérer les leads capturés.",
};