import { createClient } from "@/utils/supabase/server";
import Table from "@/components/Table/index";
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
  if (!user) {
    return redirect("/login");
  }
  if (profiles && matches)
    return <Table profiles={profiles} matches={matches} />;
}
