import React, { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface MatchProps {
  match: {
    match_id: number;
    team_a: string;
    team_b: string;
    match_time: string;
    result_a: number | null;
    result_b: number | null;
    status: "bet" | "finished";
  };
}
const Match: React.FC<MatchProps> = ({ match }) => {
  const supabase = createClient();
  const { match_time, match_id, team_a, team_b, result_a, result_b, status } =
    match;

  const [hostsGoals, setHostsGoals] = useState(result_a ? result_a : "");
  const [guestsGoals, setGuestsGoals] = useState(result_b ? result_b : "");
  const [error, setError] = useState<null | string>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const isFinished = status === "finished";
  const matchDate = new Date(match_time);
  const niceView = `${matchDate.toLocaleDateString()} ${matchDate.toLocaleTimeString()}`;
  async function updateMatches() {
    const { data, error } = await supabase
      .from("matches")
      .update({
        result_a: hostsGoals,
        result_b: guestsGoals,
        status: "finished",
      })
      .eq("match_id", match_id)
      .select();
    if (error) setError(error.message);
    else {
      setError("");
      setSuccess("Match updated successfully");
    }
  }
  return (
    <div key="1" className="flex flex-col items-center justify-center py-6">
      <div
        className={`bg-white dark:bg-gray-900 rounded-lg shadow-lg px-6 pt-2 py-2 w-full border ${
          isFinished ? "border-green-500" : ""
        }`}
      >
        <div className="text-gray-500  dark:text-gray-400 text-center pb-2 font-medium">
          {niceView}
        </div>
        <div className="flex flex-row items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <div className="text-right w-16 font-medium">{team_a}</div>
            <div className="flex items-center space-x-2">
              <Input
                className="w-12 text-center font-bold text-xl"
                placeholder={hostsGoals.toString() || "0"}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setHostsGoals(value);
                  }
                }}
                max={99}
              />
              <span className="font-bold text-2xl">-</span>
              <Input
                className="w-12 text-center font-bold text-xl"
                placeholder={guestsGoals.toString() || "0"}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (!isNaN(value)) {
                    setGuestsGoals(value);
                  }
                }}
              />
            </div>
            <div className="font-medium w-20">{team_b}</div>
            <Button className="ml-4" onClick={updateMatches}>
              Submit
            </Button>
          </div>
        </div>
        <div className="h-6 text-center pt-2 font-medium">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>
      </div>
    </div>
  );
};
export default Match;
