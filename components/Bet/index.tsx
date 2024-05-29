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
const MatchList = ({ matches }: { matches: MatchData[] }) => {
  return (
    <>
      {matches.map((match) => (
        <Match key={match.match_id} match={match} />
      ))}
    </>
  );
};

export default MatchList;
