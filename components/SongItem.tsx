"use client";
import { Song } from "@/types";
import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import PlayButton from "./PlayButton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-lg
                overflow-hidden
                gap-x-4
                cursor-pointer
                transition
                p-5
            "
        >
            <div
                className="
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-full
                    overflow-hidden
                "
            >
                <Image
                    className="object-cover"
                    src={imagePath || '/image/liked.png'}
                    fill
                    alt="Image"
                />
            </div>
            <div
                className="
                    flex
                    flex-col
                    items-start
                    w-full
                    pt-4
                    gap-y-1
                "
            >
                <p className="font-semibold truncate w-full text-md">
                    {data.title}
                </p>
                <p className="text-sm text-gray-100">
                    {data.author}
                </p>
            </div>
            <div
                className="
                    absolute
                    bottom-24
                    right-5
                "
            >
                <PlayButton />
            </div>
        </div>
    );
}

export default SongItem;
