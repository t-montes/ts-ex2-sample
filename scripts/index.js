var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ConferenceLoader.ts o Index.ts
import { Conference } from './conference.js';
const url = 'https://gist.githubusercontent.com/k-garces/d2ea7b6ba0a5502a7856f10b1cd1e032/raw/3eabcbb93362a44de1fabe194c26f6ec5a4c84bc/conferences.json';
function loadConferences() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            const data = yield response.json();
            return data.map((conf) => {
                var _a;
                return new Conference(conf.id, conf.name, parseDate((_a = conf.starts) !== null && _a !== void 0 ? _a : conf.stars), parseDate(conf.ends), conf.venue, conf.description);
            });
        }
        catch (error) {
            console.error('Error loading conferences:', error);
            return [];
        }
    });
}
function parseDate(dateStr) {
    const parts = dateStr.split('/');
    console.log(`${parts[2]}-${parts[1]}-${parts[0]}`);
    return new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
}
function countUpcomingConferences() {
    return __awaiter(this, void 0, void 0, function* () {
        const conferences = yield loadConferences();
        console.log(conferences);
        const currentDate = new Date();
        const upcomingConferencesCount = conferences.filter(conf => conf.starts > currentDate).length;
        const countElement = document.getElementById('conteo');
        if (countElement) {
            countElement.textContent = `Upcoming conferences: ${upcomingConferencesCount}`;
        }
        else {
            console.error('Element with ID "conteo" not found.');
        }
    });
}
countUpcomingConferences();
