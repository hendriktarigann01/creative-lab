import { useId } from 'react';
import Script from 'next/script';

interface JsonLdProps {
  schema: any;
}

export function JsonLd({ schema }: JsonLdProps) {
  const id = useId();

  return (
    <Script
      id={`json-ld-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}
