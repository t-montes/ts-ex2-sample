// ConferenceLoader.ts o Index.ts
import { Conference } from './conference.js';

const url = 'https://gist.githubusercontent.com/k-garces/d2ea7b6ba0a5502a7856f10b1cd1e032/raw/3eabcbb93362a44de1fabe194c26f6ec5a4c84bc/conferences.json';

async function loadConferences(): Promise<Conference[]> {
    try {
        const response = await fetch(url);
        const data = await response.json();

        return data.map((conf: any) => new Conference(
            conf.id, 
            conf.name, 
            parseDate(conf.starts ?? conf.stars), 
            parseDate(conf.ends), 
            conf.venue, 
            conf.description
        ));
    } catch (error) {
        console.error('Error loading conferences:', error);
        return [];
    }
}

function parseDate(dateStr: string): Date {
    const parts = dateStr.split('/');
    console.log(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
}

async function countUpcomingConferences() {
    const conferences = await loadConferences();
    console.log(conferences);
    const currentDate = new Date();
    
    const upcomingConferencesCount = conferences.filter(conf => conf.starts > currentDate).length;

    const countElement = document.getElementById('conteo');
    if (countElement) {
        countElement.textContent = `Upcoming conferences: ${upcomingConferencesCount}`;
    } else {
        console.error('Element with ID "conteo" not found.');
    }
}

countUpcomingConferences();
