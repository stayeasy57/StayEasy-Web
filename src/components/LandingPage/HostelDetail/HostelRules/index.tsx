import React from "react";

const HostelRules: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th
              colSpan={2}
              className="text-2xl font-bold text-center py-4 border-b border-gray-300"
            >
              Hostel Rules
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300">
            <td className="w-1/3 px-4 py-3 font-semibold border-r border-gray-300">
              Check In
            </td>
            <td className="w-2/3 px-4 py-3">
              From 7 am - You'll need to let the property know in advance what
              time you'll arrive.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="w-1/3 px-4 py-3 font-semibold border-r border-gray-300">
              Check Out
            </td>
            <td className="w-2/3 px-4 py-3">Until 10:00 pm</td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="w-1/3 px-4 py-3 font-semibold border-r border-gray-300">
              Cancellation/ prepayment
            </td>
            <td className="w-2/3 px-4 py-3">
              Cancellation and prepayment policies vary according to
              accommodation type.
            </td>
          </tr>
          <tr className="border-b border-gray-300">
            <td className="w-1/3 px-4 py-3 font-semibold border-r border-gray-300">
              Smoking
            </td>
            <td className="w-2/3 px-4 py-3">Smoking is Strictly Prohibited</td>
          </tr>
          <tr>
            <td className="w-1/3 px-4 py-3 font-semibold border-r border-gray-300">
              Security
            </td>
            <td className="w-2/3 px-4 py-3">
              Every resident must provide valid ID proof for security purposes.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default HostelRules;
