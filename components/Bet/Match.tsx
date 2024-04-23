import React, { useState } from "react";
import { createClient } from "../../utils/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader } from "../ui/card";
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
  onSave: (id: number, hostsGoals: string, guestsGoals: string) => void;
}
const Match: React.FC<MatchProps> = ({ match, onSave }) => {
  const form = useForm();

  const supabase = createClient();
  const { match_time, match_id, team_a, team_b, result_a, result_b, status } =
    match;

  const [hostsGoals, setHostsGoals] = useState(result_a ? result_a : "");
  const [guestsGoals, setGuestsGoals] = useState(result_b ? result_b : "");
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
    console.log(data, error);
  }
  return (
    <Card
      className={`w-96 my-4  ${status === "finished" ? "bg-green-500" : ""}`}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(updateMatches)}
          className="flex flex-col items-center space-y-2"
        >
          <div className="flex justify-between items-center">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center p-2">
                  <FormLabel className="">{team_a}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={isNaN(hostsGoals) ? "" : hostsGoals.toString()}
                      onChange={(e) => setHostsGoals(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-8">-</div>
            <FormField
              control={form.control}
              name="guestsGoals"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center p-2">
                  <FormLabel className="">{team_b}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={guestsGoals?.toString() || ""}
                      onChange={(e) => setGuestsGoals(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mx-auto my-auto">
            Save Result
          </Button>
        </form>
      </Form>
      <CardDescription className="text-center pt-2">{niceView}</CardDescription>{" "}
    </Card>
  );
};
export default Match;
