import Link from "next/link";

export default function WorkflowsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Workflows</h1>
      <p>Manage your workflows here.</p>
      <Link
        href="/workflows/builder"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Create New Workflow
      </Link>
    </div>
  );
}
