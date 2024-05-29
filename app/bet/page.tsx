import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import FetchDataSteps from "@/components/tutorial/FetchDataSteps";
import Header from "@/components/Header";
import { redirect } from "next/navigation";
import Bet from "../../components/Prediction";

export default async function ProtectedPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: matches } = await supabase
    .from("matches")
    .select("*")
    .eq("status", "bet");

  if (!user) {
    return redirect("/login");
  }
  let { data: profiles, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);
  if (!profiles || profiles.length === 0) return redirect("/login");

  const userID = profiles[0].userID;
  console.log(profiles, user.id);
  return <Bet userID={userID} matches={matches || []} />;
}
