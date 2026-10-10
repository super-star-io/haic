"use client";
import { useEffect, useState } from "react";
import { Button, Input, Label, ListBox, Select, TextArea, TextField } from "@heroui/react";

type Post = { id:string; title:string; slug:string; excerpt:string; content:string; category:string; status:string; requiredAccessLevel:number; githubUrl:string; youtubeUrl:string; coverImageUrl:string; showOnHome:boolean };
type User = { id:string; name:string; email:string; role:string; accessLevel:number; status:string; createdAt:string };
const blank: Omit<Post,"id"> = { title:"", slug:"", excerpt:"", content:"", category:"Proyecto", status:"draft", requiredAccessLevel:1, githubUrl:"", youtubeUrl:"", coverImageUrl:"", showOnHome:false };
const projectCoverLibrary = [
  "vision-artificial-comercio-poster-v2-1200.avif",
  "prediccion-demanda-turistica-poster-v2-1200.avif",
  "clasificacion-tensorflow-poster-v2-1200.avif",
  "agricultura-precision-poster-1200.avif",
  "gestion-inteligente-agua-poster-1200.avif",
  "triaje-salud-comunitaria-poster-1200.avif",
  "movilidad-inteligente-poster-1200.avif",
  "clasificacion-residuos-poster-1200.avif",
  "energia-renovable-poster-1200.avif",
  "mantenimiento-predictivo-poster-1200.avif",
  "monitoreo-ambiental-poster-1200.avif",
  "lenguas-originarias-poster-1200.avif",
  "proteccion-civil-poster-1200.avif",
];

function CoverImagePicker({ initialValue }: { initialValue: string }) {
  const [value, setValue] = useState(initialValue);

  return <div className="editor-field wide-field cover-picker">
    <Label>Imagen de portada (opcional)</Label>
    <input type="hidden" name="coverImageUrl" value={value}/>
    <div className="cover-picker-grid" role="group" aria-label="Portadas disponibles">
      {projectCoverLibrary.map((cover) => {
        const imageUrl = `/projects/${cover}`;
        const isSelected = value === imageUrl;
        return <button className={`cover-picker-option${isSelected ? " selected" : ""}`} type="button" key={cover} aria-pressed={isSelected} onClick={() => setValue(imageUrl)}>
          <img src={imageUrl} alt="" loading="lazy"/>
          <span>{cover.replace(/-poster.*$/, "").replaceAll("-", " ")}</span>
        </button>;
      })}
    </div>
    <TextField className="editor-field cover-custom-url" value={value.startsWith("/projects/") && projectCoverLibrary.some((cover) => value === `/projects/${cover}`) ? "" : value} onChange={setValue}>
      <Label>O pega una URL de imagen</Label>
      <Input type="url" placeholder="https://ejemplo.com/portada.jpg"/>
    </TextField>
    {value&&<div className="cover-picker-preview"><img src={value} alt="Vista previa de la portada seleccionada"/><span>Portada seleccionada</span></div>}
    <small>Elige una miniatura o pega una URL HTTPS terminada en JPG, PNG, WebP o AVIF.</small>
  </div>;
}

export default function AdminPanel({ canPosts, canUsers, isSuper, canCreate = false }: { canPosts:boolean; canUsers:boolean; isSuper:boolean; canCreate?:boolean }) {
  const [tab,setTab]=useState<"posts"|"users">(canPosts||canCreate?"posts":"users"); const [posts,setPosts]=useState<Post[]>([]); const [users,setUsers]=useState<User[]>([]); const [userQuery,setUserQuery]=useState(""); const [editing,setEditing]=useState<Post|null>(null); const [creating,setCreating]=useState(canCreate&&!canPosts); const [notice,setNotice]=useState("");
  async function load(){ if(canPosts){const p=await fetch("/api/admin/posts");if(p.ok)setPosts((await p.json()).posts)} if(canUsers){const u=await fetch("/api/admin/users");if(u.ok)setUsers((await u.json()).users)}}
  useEffect(()=>{void load()},[]);
  async function save(event:React.FormEvent<HTMLFormElement>){event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));const target=editing?`/api/admin/posts/${editing.id}`:canPosts?"/api/admin/posts":"/api/blog/posts";const response=await fetch(target,{method:editing?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const body=await response.json();if(!response.ok){setNotice(body.error);return}setNotice(canPosts?"Entrada guardada correctamente.":"Borrador enviado. Un administrador podrá revisarlo y publicarlo.");setEditing(null);setCreating(false);await load()}
  async function archive(id:string){if(!confirm("¿Archivar esta entrada?"))return;await fetch(`/api/admin/posts/${id}`,{method:"DELETE"});await load()}
  async function updateUser(user:User,event:React.FormEvent<HTMLFormElement>){event.preventDefault();const data=Object.fromEntries(new FormData(event.currentTarget));const response=await fetch(`/api/admin/users/${user.id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});const body=await response.json();setNotice(response.ok?"Acceso actualizado.":body.error);if(response.ok)await load()}
  async function mergeManuelAccount(user:User){const keepEmail="n.manuelcamacho@gmail.com";if(!window.confirm(`Se conservará ${keepEmail}. La otra cuenta (${user.email}), sus sesiones, accesos y proyectos se consolidarán allí, y la cuenta duplicada se eliminará. ¿Continuar?`))return;const confirmation=window.prompt(`Para confirmar, escribe el correo que se conservará: ${keepEmail}`);if(confirmation===null)return;const response=await fetch("/api/admin/users/merge-manuel",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({duplicateId:user.id,confirmation})});const body=await response.json();setNotice(response.ok?`Cuenta ${body.mergedEmail} consolidada en ${body.targetEmail}.`:body.error);if(response.ok)await load()}
  const normalizeName=(name:string)=>name.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("es").replace(/[^a-z0-9]/g,"");
  const normalizeEmail=(email:string)=>email.trim().toLocaleLowerCase("en-US");
  const nameCounts=new Map<string,number>();const emailCounts=new Map<string,number>();for(const user of users){const name=normalizeName(user.name);const email=normalizeEmail(user.email);if(name)nameCounts.set(name,(nameCounts.get(name)??0)+1);if(email)emailCounts.set(email,(emailCounts.get(email)??0)+1)}
  const possibleDuplicateNames=new Set([...nameCounts].filter(([,count])=>count>1).map(([name])=>name));
  const possibleDuplicateEmails=new Set([...emailCounts].filter(([,count])=>count>1).map(([email])=>email));
  const isPossibleDuplicate=(user:User)=>possibleDuplicateNames.has(normalizeName(user.name))||possibleDuplicateEmails.has(normalizeEmail(user.email));
  const query=userQuery.trim();const matchingUsers=users.filter(user=>normalizeName(user.name).includes(normalizeName(query))||normalizeEmail(user.email).includes(normalizeEmail(query))||`${user.role} ${user.status}`.toLocaleLowerCase("es").includes(query.toLocaleLowerCase("es")));
  const possibleDuplicateCount=users.filter(isPossibleDuplicate).length;
  const manuelTargetExists=users.some(user=>normalizeEmail(user.email)==="n.manuelcamacho@gmail.com");
  const selected=editing??blank;
  return <div className="admin-layout"><aside><img src="/haic-logo.svg" alt="HAIC"/><span>{canCreate&&!canPosts?"Contribuciones":"Administración"}</span>{canPosts&&<button className={tab==="posts"?"active":""} onClick={()=>setTab("posts")}>Entradas</button>}{canUsers&&<button className={tab==="users"?"active":""} onClick={()=>setTab("users")}>Usuarios</button>}<a href="/blog">← Volver al blog</a></aside><main><header><div><span className="kicker">{canCreate&&!canPosts?"PUBLICAR EN HAIC":"PANEL DE CONTROL"}</span><h1>{tab==="posts"?"Entradas":"Usuarios y accesos"}</h1></div>{canPosts&&tab==="posts"&&<button className="button primary" onClick={()=>{setEditing(null);setCreating(true)}}>+ Nueva entrada</button>}</header>{notice&&<div className="notice">{notice}<button onClick={()=>setNotice("")}>×</button></div>}{(canPosts||canCreate)&&tab==="posts"&&<>{(creating||editing)&&<form className="editor-form" key={editing?.id ?? "new-entry"} onSubmit={save}><div className="form-title"><h2>{editing?"Editar entrada":"Nueva entrada"}</h2>{canPosts&&<button type="button" onClick={()=>{setEditing(null);setCreating(false)}}>Cerrar</button>}</div><div className="form-grid">
<TextField className="editor-field" name="title" defaultValue={selected.title} isRequired><Label>Título</Label><Input placeholder="Título de la entrada" /></TextField>
<TextField className="editor-field" name="slug" defaultValue={selected.slug}><Label>Slug</Label><Input placeholder="titulo-de-la-entrada" /></TextField>
<div className="editor-field"><Label id="post-category-label">Categoría</Label><Select aria-labelledby="post-category-label" name="category" defaultSelectedKey={selected.category || "Proyecto"} className="editor-select"><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox>{["Proyecto","Artículo","Tutorial","Aprendizaje","Comunidad"].map((category)=><ListBox.Item id={category} key={category}>{category}</ListBox.Item>)}</ListBox></Select.Popover></Select></div>
{canPosts?<div className="editor-field"><Label id="post-status-label">Estado</Label><Select aria-labelledby="post-status-label" name="status" defaultSelectedKey={selected.status} className="editor-select"><Select.Trigger><Select.Value /><Select.Indicator /></Select.Trigger><Select.Popover><ListBox><ListBox.Item id="draft">Borrador</ListBox.Item><ListBox.Item id="published">Publicado</ListBox.Item><ListBox.Item id="archived">Archivado</ListBox.Item></ListBox></Select.Popover></Select></div>:<input type="hidden" name="status" value="draft"/>}
{canPosts&&<TextField className="editor-field" name="requiredAccessLevel" defaultValue={String(selected.requiredAccessLevel)}><Label>Nivel requerido</Label><Input type="number" min={0} max={100} placeholder="1"/></TextField>}
<TextField className="editor-field" name="githubUrl" defaultValue={selected.githubUrl}><Label>GitHub</Label><Input type="url" placeholder="https://github.com/usuario/proyecto" /></TextField>
<TextField className="editor-field wide-field" name="excerpt" defaultValue={selected.excerpt}><Label>Resumen</Label><TextArea rows={3} placeholder="Describe brevemente de qué trata la entrada"/></TextField>
<TextField className="editor-field wide-field" name="content" defaultValue={selected.content} isRequired={canCreate&&!canPosts}><Label>Contenido</Label><TextArea rows={12} placeholder="Escribe aquí el contenido de tu entrada"/></TextField>
<CoverImagePicker initialValue={selected.coverImageUrl}/>
<TextField className="editor-field wide-field" name="youtubeUrl" defaultValue={selected.youtubeUrl}><Label>YouTube (opcional)</Label><Input type="url" placeholder="https://www.youtube.com/watch?v=..."/><small>Si agregas una sesión, se reproducirá dentro del detalle de la entrada.</small></TextField>
{canPosts&&<label className="wide-field home-visibility-field"><input type="checkbox" name="showOnHome" defaultChecked={selected.showOnHome}/><span><b>Mostrar esta entrada en la HOME</b><small>Actívalo para destacar el proyecto en la página principal.</small></span></label>}
</div><Button type="submit" className="button primary">{canPosts?"Guardar entrada →":"Enviar borrador para revisión →"}</Button></form>}{canPosts&&<div className="admin-table"><div className="table-head"><span>Entrada</span><span>Estado</span><span>Acceso</span><span>Acciones</span></div>{posts.map(post=><div className="table-row" key={post.id}><div><b>{post.title}</b><small>/{post.slug}</small></div><span className={`state ${post.status}`}>{post.status}{post.showOnHome?" · HOME":""}</span><span>Nivel {post.requiredAccessLevel}</span><div><button onClick={()=>{setEditing(post);setCreating(false)}}>Editar</button><button onClick={()=>archive(post.id)}>Archivar</button></div></div>)}{!posts.length&&<p className="table-empty">Aún no hay entradas. Crea la primera.</p>}</div>}</>}{tab==="users"&&canUsers&&<section className="user-admin"><div className="user-admin-summary"><article><b>{users.length}</b><span>Cuentas</span></article><article><b>{users.filter(user=>user.status==="active").length}</b><span>Activas</span></article><article><b>{possibleDuplicateCount}</b><span>Posibles duplicados</span></article></div><label className="user-search">Buscar cuenta<input value={userQuery} onChange={event=>setUserQuery(event.target.value)} placeholder="Nombre, correo, rol o estado" type="search"/></label>{possibleDuplicateCount>0&&<p className="duplicate-review-note">Hay coincidencias de nombre o correo. Confirma que sean la misma persona comparando sus correos antes de cambiar o suspender una cuenta; una coincidencia no confirma que sea un duplicado.</p>}{isSuper&&!manuelTargetExists&&<p className="duplicate-review-note">No se encontró la cuenta de Manuel con el correo que se conservará. La acción de fusión aparecerá cuando exista.</p>}<div className="user-list">{matchingUsers.map(user=>{const possibleDuplicate=isPossibleDuplicate(user);const duplicateLabel=possibleDuplicateEmails.has(normalizeEmail(user.email))?"Correo repetido":"Nombre repetido";const manuelDuplicate=normalizeName(user.name)==="manuelantoniocamachoreyes"&&normalizeEmail(user.email)!=="n.manuelcamacho@gmail.com";return <form key={user.id} onSubmit={(e)=>updateUser(user,e)}><div className="user-main"><span className="avatar small">{user.name.slice(0,2).toUpperCase()}</span><div><b>{user.name}</b><small>{user.email}</small><small>Registrado {new Intl.DateTimeFormat("es-MX",{dateStyle:"medium"}).format(new Date(user.createdAt))}{possibleDuplicate&&<em className="duplicate-badge">{duplicateLabel}</em>}</small></div></div><select name="role" defaultValue={user.role} aria-label={`Rol de ${user.name}`}>{[["standard","Estándar"],["contributor","Contribuidor"],["admin","Administrador"],...(isSuper?[["superadmin","Superusuario"]]:[])].map(([role,label])=><option value={role} key={role}>{label}</option>)}</select><input name="accessLevel" type="number" min="0" max="100" defaultValue={user.accessLevel} aria-label={`Nivel de acceso de ${user.name}`}/><select name="status" defaultValue={user.status} aria-label={`Estado de ${user.name}`}><option value="active">Activo</option><option value="suspended">Suspendido</option></select><div className="user-actions"><button>Guardar</button>{isSuper&&manuelDuplicate&&manuelTargetExists&&<button type="button" className="merge-user" onClick={()=>void mergeManuelAccount(user)}>Fusionar en correo conservado</button>}</div></form>})}{matchingUsers.length===0&&<p className="table-empty">No hay cuentas que coincidan con la búsqueda.</p>}</div></section>}</main></div>;
}
