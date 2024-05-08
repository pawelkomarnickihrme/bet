import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Table from "@/components/Table/index";
import { Wyniki } from "../components/wyniki";
import { redirect } from "next/navigation";

export default async function Index() {
  const supabase = createClient();
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("id,full_name,points");

  let { data: matches, error: err } = await supabase
    .from("matches")
    .select("match_id,team_a,team_b,match_time");
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log(user);
  if (!user) {
    return redirect("/login");
  }
  if (profiles && matches)
    return (
      <>
        <Table profiles={profiles} matches={matches} />
      </>
    );
}
