import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../lib/api";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const editing = Boolean(id);

  const [form, setForm] = useState({
    title: "", slug: "", shortDescription: "", description: "",
    heroImage: "", gallery: "", technologies: "", category: "",
    client: "", location: "", date: ""
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (editing) {
      api.get("/projects").then(r => {
        const p = r.data.find(x => x._id === id);
        if (p) setForm({
          ...p,
          gallery: (p.gallery || []).join(", "),
          technologies: (p.technologies || []).join(", "),
          date: p.date ? p.date.substr(0,10) : ""
        });
      });
    }
  }, [id, editing]);

  const change = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const uploadImage = async (field, file) => {
    const fd = new FormData();
    fd.append("image", file);
    setUploading(true);
    const { data } = await api.post("/projects/upload", fd, { headers: { "Content-Type": "multipart/form-data" }});
    setUploading(false);
    setForm(f => ({ ...f, [field]: data.url }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies.split(",").map(s=>s.trim()).filter(Boolean),
      gallery: form.gallery.split(",").map(s=>s.trim()).filter(Boolean)
    };
    if (editing) await api.put(`/projects/${id}`, payload);
    else await api.post("/projects", payload);
    navigate("/admin");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{editing? "Edit" : "New"} Project</h1>
      <form onSubmit={submit} className="grid gap-4">
        <input name="title" className="border p-3 rounded-lg" placeholder="Title" value={form.title} onChange={change}/>
        <input name="slug" className="border p-3 rounded-lg" placeholder="Slug (optional)" value={form.slug} onChange={change}/>
        <input name="shortDescription" className="border p-3 rounded-lg" placeholder="Short description" value={form.shortDescription} onChange={change}/>
        <textarea name="description" rows="5" className="border p-3 rounded-lg" placeholder="Full description" value={form.description} onChange={change}/>
        <div className="flex gap-3 items-center">
          <input name="heroImage" className="flex-1 border p-3 rounded-lg" placeholder="Hero image URL" value={form.heroImage} onChange={change}/>
          <label className="border px-3 py-2 rounded-lg cursor-pointer">
            Upload
            <input type="file" className="hidden" onChange={e=>uploadImage("heroImage", e.target.files[0])}/>
          </label>
        </div>
        <input name="gallery" className="border p-3 rounded-lg" placeholder="Gallery (comma separated URLs)" value={form.gallery} onChange={change}/>
        <div className="flex gap-3 items-center">
          <input name="technologies" className="flex-1 border p-3 rounded-lg" placeholder="Technologies (comma separated)" value={form.technologies} onChange={change}/>
          {uploading && <span className="text-sm">Uploading...</span>}
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <input name="category" className="border p-3 rounded-lg" placeholder="Category" value={form.category} onChange={change}/>
          <input name="client" className="border p-3 rounded-lg" placeholder="Client" value={form.client} onChange={change}/>
          <input name="location" className="border p-3 rounded-lg" placeholder="Location" value={form.location} onChange={change}/>
        </div>
        <input type="date" name="date" className="border p-3 rounded-lg" value={form.date} onChange={change}/>
        <button className="bg-teal-600 text-white p-3 rounded-lg">{editing? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
