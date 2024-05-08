import { createClient } from "@/utils/supabase/server";

export default function Table({
  profiles,
  matches,
}: {
  profiles: any[];
  matches: any[];
}) {
  console.log(profiles);
  return (
    <div key="1" className="w-full pl-96  mx-auto py-12">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ">
              <th className="px-2 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Miejsce
              </th>
              <th className="w-8 px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Użytkownik
              </th>
              <th className="  px-2 py-3 text-left font-medium text-gray-500 dark:text-gray-400">
                Punkty
              </th>
              {matches.map((match, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 whitespace-nowrap"
                >
                  {match.team_a} - {match.team_b}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {profiles.map((user, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 dark:border-gray-800 border border-gray-200 dark:border-gray-700 transition-colors duration-200 ease-in hover:bg-gray-100"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 font-medium">{user.full_name}</td>
                <td className="px-4 py-3">{user.points}</td>
                {/* {user.results.map((result, index) => (
                  <td
                    key={index}
                    className="px-4 py-3 text-center border border-gray-200 dark:border-gray-700"
                  >
                    {result}
                  </td>
                ))} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
