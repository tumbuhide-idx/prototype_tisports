import { notFound } from 'next/navigation';
import { getEventBySlug } from '@/lib/events';
import type { Metadata } from 'next';
import { EventPageClient } from './EventPageClient';
import EventDetailLoading from './loading';
import { Suspense } from 'react';

interface EventPageProps {
  params: { slug: string };
}

export async function generateMetadata(props: EventPageProps): Promise<Metadata> {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: event.title,
    description: event.description,
  };
}

export default async function EventPage(props: EventPageProps) {
  const params = await props.params;
  const event = await getEventBySlug(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <Suspense fallback={<EventDetailLoading />}>
      <EventPageClient event={event} />
    </Suspense>
  );
}