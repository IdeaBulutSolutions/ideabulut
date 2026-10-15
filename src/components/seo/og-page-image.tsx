import fs from 'node:fs';
import path from 'node:path';

export function OgPageImage({ title }: { title: string }) {
  const logo = `data:image/png;base64,${fs.readFileSync(path.join(process.cwd(), 'public/images/brand/negative-favicon.png')).toString('base64')}`;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: 72,
        backgroundColor: '#090045',
        color: '#FFFFFF',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 25, fontWeight: 700 }}>
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: '#090045',
            color: '#F2A03C',
          }}
        >
          {/* next/og renders this image into a PNG, not a browser image element. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={48} height={48} alt="" />
        </span>
        IDEA BULUT SOLUTIONS
      </div>
      <div
        style={{
          display: 'flex',
          maxWidth: 1020,
          fontSize: title.length > 28 ? 64 : 76,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: -2,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', color: '#2266DE', fontSize: 24, fontWeight: 600 }}>
        Intelligent. Delivery. Engineered. At scale.
      </div>
    </div>
  );
}