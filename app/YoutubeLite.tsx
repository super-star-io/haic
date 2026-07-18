"use client";
import {useState} from "react";
import {youtubeEmbedUrl} from "../lib/youtube";
import ResponsiveImage from "./ResponsiveImage";

export default function YoutubeLite({url,title,posterImage,className="video-frame"}:{url:string;title:string;posterImage?:string;className?:string}){
  const [active,setActive]=useState(false); const embed=youtubeEmbedUrl(url);
  if(!embed)return null;
  return <div className={`${className} youtube-lite`}>{active?<iframe src={`${embed}?autoplay=1`} title={title} referrerPolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/>:<button type="button" className="youtube-lite-trigger" onClick={()=>setActive(true)} aria-label={`Reproducir ${title}`}>{posterImage&&<ResponsiveImage src={posterImage} alt="" loading="lazy" sizes="(max-width: 900px) 100vw, 60vw"/>}<span className="youtube-lite-play">▶</span><strong>Reproducir clase</strong></button>}</div>;
}
