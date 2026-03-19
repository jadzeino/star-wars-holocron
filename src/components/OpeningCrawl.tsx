import { useEffect, useRef } from 'react';

// wip: need to pass props properly later
export default function OpeningCrawl({ episode, title, crawlBody }: any) {
  const crawlRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // some console log to ensure it's mounting correctly
    console.log("Crawl mounted for", title);
  }, [title]);

  return (
    <div className="relative h-[60vh] overflow-hidden bg-black text-sw-yellow font-bold perspective-[400px]">
      <div className="flex justify-center h-full perspective-[400px]">
        {/* There's a slight bug here with animation not triggering correctly out of the box so I'll need to figure out the CSS */}
        <div 
          ref={crawlRef}
          className="absolute origin-bottom animate-crawl text-center max-w-2xl px-8"
        >
          <p className="text-xl mb-6">Episode {episode}</p>
          <h1 className="text-4xl uppercase mb-12 tracking-widest">{title}</h1>
          
          <div className="space-y-6 text-2xl leading-relaxed text-justify">
            {crawlBody?.split('\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// TODO: might need to adjust crawl speed based on text length later
