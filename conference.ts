// Conference.ts

export class Conference {
    id: number;
    name: string;
    starts: Date;
    ends: Date;
    venue: string;
    description: string;

    constructor(id: number, name: string, starts: Date, ends: Date, venue: string, description: string) {
        this.id = id;
        this.name = name;
        this.starts = starts;
        this.ends = ends;
        this.venue = venue;
        this.description = description;
    }
}
