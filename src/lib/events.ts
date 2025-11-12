
'use server';

import { promises as fs } from 'fs';
import path from 'path';
import type { Event } from './types';

// Path to the events.json file
const eventsFilePath = path.join(process.cwd(), 'public', 'data', 'events.json');

async function loadEventsData(): Promise<Event[]> {
  try {
    const jsonData = await fs.readFile(eventsFilePath, 'utf-8');
    return JSON.parse(jsonData) as Event[];
  } catch (error) {
    console.error('Error loading events data:', error);
    return [];
  }
}

/**
 * Fetches all events from the data source.
 * @returns A promise that resolves to an array of events.
 */
export async function getEvents(): Promise<Event[]> {
  const allEvents = await loadEventsData();
  return allEvents;
}

/**
 * Fetches a single event by its slug.
 * @param slug The slug of the event to fetch.
 * @returns A promise that resolves to the event, or null if not found.
 */
export async function getEventBySlug(slug: string): Promise<Event | null> {
  const allEvents = await loadEventsData();
  const event = allEvents.find((e) => e.slug === slug);
  return event || null;
}

/**
 * Fetches a single event by its ID.
 * @param id The ID of the event to fetch.
 * @returns A promise that resolves to the event, or null if not found.
 */
export async function getEventById(id: string): Promise<Event | null> {
    const allEvents = await loadEventsData();
    const event = allEvents.find((e) => e.id === id);
    return event || null;
}
