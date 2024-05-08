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
    async function fetchMatches() {
      const { data: matches, error } = await supabase
        .from("matches")
        .select("*");
      if (error) console.error(error);
      if (matches) setMatches(matches);
    }

    fetchMatches();
  }, []);
  console.log(matches);
  console.log(matches);
  const saveResult = (id: number, hostsGoals: string, guestsGoals: string) => {
    console.log(
      `Match ${id} result saved: Hosts ${hostsGoals} - Guests ${guestsGoals}`
    );
    // Tutaj logika do obsługi zapisu wyniku, np. aktualizacja stanu meczu
  };

  return (
    <div>
      {matches.map((match) => (
        <Match key={match.match_id} match={match} onSave={saveResult} />
      ))}
    </div>
  );
};

export default MatchList;
