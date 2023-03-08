import { SOURCES } from "@/constants";

type Source = keyof typeof SOURCES;

export const createAngTitle = ({
    ang,
    source = 'G'
}: {
    ang: number,
    source?: Source
}) => {
    return `Ang ${ang} of ${SOURCES[source]}`;
}