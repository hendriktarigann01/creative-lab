import { useMemo } from 'react';

interface JsonLdProps {
  schema: any;
}

export function JsonLd({ schema }: JsonLdProps) {
  const htmlContent = useMemo(() => {
    return `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
  }, [schema]);

  return (
    <div
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{
        __html: htmlContent,
      }}
    />
  );
}
