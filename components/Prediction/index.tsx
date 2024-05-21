"use client";
import { createClient } from "../../utils/supabase/client";
import Match from "./Match";
import { useEffect, useState } from "react";
interface MatchData {
  match_id: number;
  team_a: string;
  team_b: string;
  match_time: string;
  result_a: number | null;
  result_b: number | null;
  status: "bet" | "finished";
}
const MatchList = () => {
  const supabase = createClient();
  const [matches, setMatches] = useState<MatchData[]>([]);

  useEffect(() => {
    async function getMatchesWithBetStatus() {
      // Fetch matches with status 'bet'
      const { data: matches, error } = await supabase
        .from("matches")
        .select("*")
        .eq("status", "bet");

      if (error) {
        console.error("Error fetching matches:", error);
        return null;
      }

      return matches;
    }

    getMatchesWithBetStatus().then((matches) => {
      setMatches(matches || []);
    });
  }, []);

  return (
    <div>
      {matches.map((match) => (
        <Match key={match.match_id} match={match} />
      ))}
    </div>
  );
};

export default MatchList;
