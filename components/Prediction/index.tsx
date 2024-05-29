"use client";
import Match from "./Match";
interface MatchData {
  match_id: number;
  team_a: string;
  team_b: string;
  match_time: string;
  result_a: number | null;
  result_b: number | null;
  status: "bet" | "finished";
}
const MatchList = ({
  userID,
  matches,
}: {
  userID: any;
  matches: MatchData[];
}) => {
  return (
    <div>
      {matches.map((match) => (
        <Match key={match.match_id} match={match} userId={userID} />
      ))}
    </div>
  );
};

export default MatchList;
