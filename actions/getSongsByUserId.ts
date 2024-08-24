import { Song } from "@/types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

const getSongsByUserId = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
        console.log(userError.message);
        return [];
    }

    if (!userData?.user) {
        console.log("No authenticated user found.");
        return [];
    }

    const { data, error } = await supabase
        .from('songs')
        .select('*')
        .eq('user_id', userData.user.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.log(error.message);
        return [];
    }

    return data || [];
};

export default getSongsByUserId;
