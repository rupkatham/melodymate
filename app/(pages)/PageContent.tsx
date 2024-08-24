"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
    const onPlay = useOnPlay(songs);

    if (!Array.isArray(songs) || songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No song available
            </div>
        );
    }

    return (
        <div className="
            grid
            grid-cols-2
            sm:grid-cols-4
            md:grid-cols-6
            lg:grid-cols-5
            xl:grid-cols-6
            2xl:grid-cols-12
            gap-4
            mt-4
        ">
            {songs.map((item) => (
                <SongItem
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
};

export default PageContent;
