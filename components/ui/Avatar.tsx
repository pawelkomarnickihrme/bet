import { FC, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
interface AvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
}

export const Avatar: FC<AvatarProps> = ({ uid, url, size }) => {
  const supabase = createClient();
  console.log(url);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  useEffect(() => {
    async function downloadImage(path: string) {
      try {
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url, supabase]);
  console.log(avatarUrl);
  return avatarUrl ? (
    <Image
      width={size}
      height={size}
      src={avatarUrl}
      alt="Avatar"
      className="avatar image"
      style={{ height: size, width: size, display: "block", margin: "auto" }}
    />
  ) : (
    <div className="avatar no-image" style={{ height: size, width: size }} />
  );
};
