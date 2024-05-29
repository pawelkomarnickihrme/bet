import { redirect } from "next/navigation";
import Bet from "../../components/Bet";
import { createClient } from "../../utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  const { data: matches, error } = await supabase.from("matches").select("*");
  if (error) console.error(error);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  //@ts-ignore
  if (!user || user.admin === false) redirect("/");
  return <Bet matches={matches} />;
}
