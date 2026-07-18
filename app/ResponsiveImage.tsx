type Props = { src:string; alt:string; className?:string; loading?:"eager"|"lazy"; sizes?:string; kind?:"project"|"team" };

export default function ResponsiveImage({src,alt,className,loading="lazy",sizes="100vw",kind="project"}:Props){
  const match=src.match(/^(.*?)-(?:1200|1024)\.avif$/);
  const base=match?.[1];
  const srcSet=base ? kind==="team" ? `${base}-512.avif 512w, ${base}-1024.avif 1024w` : `${base}-640.avif 640w, ${base}-1200.avif 1200w` : undefined;
  return <img src={src} srcSet={srcSet} sizes={srcSet?sizes:undefined} alt={alt} className={className} loading={loading} decoding="async"/>;
}
