import { redirect } from "next/navigation";
import Bet from "../../components/Bet";
import { createClient } from "../../utils/supabase/server";

export default async function Page() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  //@ts-ignore
  if (!user || user.admin === false) redirect("/");
  return <Bet />;
}
