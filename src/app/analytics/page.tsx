// // src/app/analytics/page.tsx
// import React from "react";

// const AnalyticsPage = () => {
//   return (
//     <div>
//       <h1>Analytics Page</h1>
//     </div>
//   );
// };

// export default AnalyticsPage;

import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 min-h-screen text-center">
      <h1 className="text-4xl font-bold">Welcome to Workflow Builder</h1>
      <p className="text-lg max-w-xl">
        Build and automate custom workflows visually. Get started by exploring
        the dashboard or creating your first workflow.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link
          href="/login"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Dashboard
        </Link>
        <Link
          href="/workflows"
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Workflows
        </Link>
        <Link
          href="/templates"
          className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
        >
          Templates
        </Link>
        <Link
          href="/analytics"
          className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}
