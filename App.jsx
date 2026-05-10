import { useState, useEffect } from "react";

function PreloadHeroImage() {
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80";
  }, []);
  return null;
}

function MobileStyles() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      * { box-sizing: border-box; }
      body { margin: 0; overflow-x: hidden; }
      @media (max-width: 768px) {
        .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        .hero-title { font-size: 38px !important; }
        .stats-row { gap: 16px !important; }
        .why-grid { grid-template-columns: 1fr 1fr !important; }
        .services-grid { grid-template-columns: 1fr !important; }
        .reviews-grid { grid-template-columns: 1fr !important; }
        .about-grid { grid-template-columns: 1fr !important; }
        .contact-grid { grid-template-columns: 1fr !important; }
        .booking-grid { grid-template-columns: 1fr !important; }
        .service-select-grid { grid-template-columns: 1fr 1fr !important; }
        .payment-tabs { grid-template-columns: repeat(3,1fr) !important; }
        .card-grid { grid-template-columns: 1fr 1fr !important; }
        .nav-links { display: none !important; }
        .mobile-book-btn { display: flex !important; }
        .section-pad { padding: 48px 20px !important; }
        .hero-pad { padding: 48px 20px !important; }
        .hero-cta { flex-direction: column !important; }
        .hero-cta button { width: 100% !important; }
        .summary-card { display: none !important; }
        .page-pad { padding: 32px 20px !important; }
        .step-bar { font-size: 10px !important; }
        .step-bar > div { padding: 8px 2px !important; margin-right: 8px !important; }
        .form-2col { grid-template-columns: 1fr !important; }
        .hours-row { flex-wrap: wrap !important; }
        .cal-time-grid { grid-template-columns: 1fr !important; }
        .about-stats { grid-template-columns: 1fr !important; }
        .footer-nav { flex-direction: column !important; gap: 8px !important; }
        .order-grid { grid-template-columns: 1fr !important; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
}

const G = "#00B074";
const GD = "#00834F";
const GG = "linear-gradient(135deg, #00B074 0%, #00623A 100%)";

const SERVICES = [
  { id:"standard", name:"Standard Clean", price:165, icon:"🧹", duration:"2–3 hrs", desc:"Perfect for regular upkeep. All main living areas, kitchen, bathrooms & floors.", includes:["Dusting all surfaces","Vacuum & mop floors","Kitchen wipe-down","Bathroom scrub","Trash removal"] },
  { id:"deep", name:"Deep Clean", price:300, icon:"✨", duration:"4–5 hrs", badge:"MOST POPULAR", desc:"Thorough top-to-bottom clean ideal if it's been a while or you want a fresh start.", includes:["Everything in Standard","Inside appliances","Baseboards & vents","Cabinet fronts","Window sills & blinds"] },
  { id:"moveout", name:"Move-Out Clean", price:280, icon:"📦", duration:"5–7 hrs", desc:"Get your full deposit back. Complete empty-home clean to meet landlord standards.", includes:["Everything in Deep Clean","Inside all cabinets","Inside oven & fridge","All closets","Garage sweep"] },
  { id:"airbnb", name:"Airbnb Turnover", price:175, icon:"🏡", duration:"2–4 hrs", desc:"Quick guest-ready turnover between stays. Linen swap, restock & full clean.", includes:["Full standard clean","Linen change & restock","Amenity check","Photo-ready staging","Priority scheduling"] },
  { id:"office", name:"Office Clean", price:185, icon:"🏢", duration:"2–4 hrs", desc:"Keep your workspace spotless and your team productive.", includes:["Desk & surface wipe","Common areas","Restrooms","Kitchen/break room","Trash & recycling"] },
  { id:"postconstruction", name:"Post-Construction", price:380, icon:"🔨", duration:"6–8 hrs", badge:"HEAVY DUTY", desc:"After renovations or builds. Removes all dust, debris & residue.", includes:["Debris removal","Fine dust cleanup","Window & frame clean","Floor scrub & polish","Full detail clean"] },
];

// ─── ADD-ONS ────────────────────────────────────────────────────────────────
const BEDROOM_PRICES = { "1-2":0, "3":30, "4":60, "5+":100 };
const BATHROOM_PRICES = { "1-2":0, "3":25, "4":50, "5+":80 };
const SQFT_PRICES = { "Under 1,000":0, "1,000-2,000":40, "2,000-3,500":80, "3,500+":130 };
const OFFICE_ROOMS_PRICES = { "1-3":0, "4-6":35, "7-10":65, "10+":100 };
const AIRBNB_BEDROOM_PRICES = { "Studio":0, "1 bed":0, "2 bed":30, "3 bed":60, "4+ bed":90 };

const HOME_ADDONS = [
  { id:"oven",    label:"Inside Oven",          price:35,  icon:"♨️" },
  { id:"fridge",  label:"Inside Fridge",         price:35,  icon:"🧊" },
  { id:"laundry", label:"Laundry (wash & fold)", price:40,  icon:"👕" },
  { id:"windows", label:"Interior Windows",      price:50,  icon:"🪟" },
  { id:"garage",  label:"Garage",                price:60,  icon:"🚗" },
  { id:"basement",label:"Basement",              price:50,  icon:"🏚️" },
];
const OFFICE_ADDONS = [
  { id:"carpets",   label:"Carpet Shampooing",    price:60,  icon:"🧹" },
  { id:"windows",   label:"Window Cleaning",      price:50,  icon:"🪟" },
  { id:"kitchen",   label:"Break Room Deep Clean", price:45, icon:"☕" },
  { id:"restrooms", label:"Extra Restrooms",      price:35,  icon:"🚽" },
  { id:"trash",     label:"Trash Removal",        price:25,  icon:"🗑️" },
  { id:"sanitize",  label:"Full Sanitization",    price:55,  icon:"🧴" },
];
const AIRBNB_ADDONS = [
  { id:"linen",     label:"Linen Change",         price:30,  icon:"🛏️" },
  { id:"restock",   label:"Amenity Restock",      price:25,  icon:"🧴" },
  { id:"laundry",   label:"Laundry Service",      price:40,  icon:"👕" },
  { id:"windows",   label:"Window Cleaning",      price:40,  icon:"🪟" },
  { id:"checklist", label:"Guest-Ready Check",    price:20,  icon:"✅" },
  { id:"express",   label:"Express 2hr Turnover", price:50,  icon:"⚡" },
];

const EXTRA_ADDONS = [
  { id:"oven",    label:"Inside Oven",          price:35,  icon:"♨️" },
  { id:"fridge",  label:"Inside Fridge",         price:35,  icon:"🧊" },
  { id:"laundry", label:"Laundry (wash & fold)", price:40,  icon:"👕" },
  { id:"windows", label:"Interior Windows",      price:50,  icon:"🪟" },
  { id:"garage",  label:"Garage",                price:60,  icon:"🚗" },
  { id:"basement",label:"Basement",              price:50,  icon:"🏚️" },
];

function calcTotal(serviceId, propertyType, bedrooms, bathrooms, sqft, officeRooms, airbnbBeds, addons) {
  const base = (SERVICES.find(s=>s.id===serviceId)||SERVICES[0]).price;
  let extra = 0;
  if (propertyType === "Home") {
    extra += (BEDROOM_PRICES[bedrooms]||0) + (BATHROOM_PRICES[bathrooms]||0);
    const allAddons = HOME_ADDONS;
    extra += addons.reduce((s,id)=>{ const a=allAddons.find(x=>x.id===id); return s+(a?a.price:0); },0);
  } else if (propertyType === "Office") {
    extra += (SQFT_PRICES[sqft]||0) + (OFFICE_ROOMS_PRICES[officeRooms]||0);
    extra += addons.reduce((s,id)=>{ const a=OFFICE_ADDONS.find(x=>x.id===id); return s+(a?a.price:0); },0);
  } else if (propertyType === "Airbnb") {
    extra += (AIRBNB_BEDROOM_PRICES[airbnbBeds]||0);
    extra += addons.reduce((s,id)=>{ const a=AIRBNB_ADDONS.find(x=>x.id===id); return s+(a?a.price:0); },0);
  }
  return base + extra;
}

const REVIEWS = [
  { name:"Jessica M.", location:"Phoenix, AZ", stars:5, text:"Fresh Out LLC is absolutely amazing! My home has never looked so clean. Maria was professional, thorough and so kind. Will definitely be a repeat customer!", service:"Deep Clean", avatar:"JM" },
  { name:"Carlos R.", location:"Scottsdale, AZ", stars:5, text:"Used them for an Airbnb turnover and my guests gave me a 5-star review specifically mentioning cleanliness. These guys are the real deal.", service:"Airbnb Turnover", avatar:"CR" },
  { name:"Tanya B.", location:"Tempe, AZ", stars:5, text:"Move-out clean was flawless. Got my full security deposit back! Worth every penny. Super professional team and very communicative.", service:"Move-Out Clean", avatar:"TB" },
  { name:"Mike D.", location:"Mesa, AZ", stars:5, text:"Our office has never been cleaner. Reliable, fast, and thorough. We've been using Fresh Out monthly and couldn't be happier.", service:"Office Clean", avatar:"MD" },
  { name:"Priya K.", location:"Chandler, AZ", stars:5, text:"Booked a standard clean and was blown away. The booking process was super easy and they showed up right on time. Highly recommend!", service:"Standard Clean", avatar:"PK" },
  { name:"Denise W.", location:"Gilbert, AZ", stars:5, text:"Post-construction clean after our kitchen reno — spotless result. They got into every corner. The team was friendly and worked so fast!", service:"Post-Construction", avatar:"DW" },
];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const paymentIcons = { card:"💳", cash:"💵", zelle:"🔵", venmo:"🟦", cashapp:"💚" };
const propertyIcons = { Home:"🏠", Office:"🏢", Airbnb:"🏡" };

function Logo({ dark = false, size = 40 }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <rect width="100" height="100" rx="22" fill={G}/>
        <path d="M50 18 C48 28 42 34 28 44" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M28 44 C42 54 48 60 50 70" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M50 70 C52 60 58 54 72 44" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <path d="M72 44 C58 34 52 28 50 18" stroke="white" strokeWidth="7" strokeLinecap="round" fill="none"/>
        <line x1="76" y1="22" x2="76" y2="32" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="71" y1="27" x2="81" y2="27" stroke="white" strokeWidth="4.5" strokeLinecap="round"/>
        <line x1="22" y1="60" x2="22" y2="68" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <line x1="18" y1="64" x2="26" y2="64" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      </svg>
      <div>
        <div style={{ fontFamily:"'Trebuchet MS',sans-serif", fontWeight:"900", fontSize:size*0.48, color:dark?"#1a1a1a":"#fff", letterSpacing:"0.05em", lineHeight:1 }}>FRESH OUT</div>
        <div style={{ fontFamily:"'Trebuchet MS',sans-serif", fontSize:size*0.25, color:dark?G:"rgba(255,255,255,0.6)", letterSpacing:"0.2em" }}>LLC · ARIZONA</div>
      </div>
    </div>
  );
}

function Stars({ n = 5 }) {
  return <span style={{ color:"#F59E0B", fontSize:14 }}>{"★".repeat(n)}</span>;
}

// Returns count of bookings per date from the shared bookings array
function getDateStatus(dateStr, bookingCounts) {
  const count = bookingCounts[dateStr] || 0;
  if (count >= 2) return "full";
  if (count === 1) return "one";
  return "open";
}

function Calendar({ selected, onSelect, bookingCounts }) {
  const [mo, setMo] = useState(3);
  const [yr, setYr] = useState(2026);
  const first = new Date(yr, mo, 1).getDay();
  const days = new Date(yr, mo+1, 0).getDate();
  const cells = Array(first).fill(null).concat(Array.from({length:days},(_,i)=>i+1));
  const fmt = d => `${yr}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const today = new Date(2026,3,24);

  // Find next available date suggestion
  const nextOpen = (() => {
    for (let offset = 1; offset <= 60; offset++) {
      const d = new Date(2026,3,24);
      d.setDate(d.getDate() + offset);
      const ds = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
      if ((bookingCounts[ds]||0) < 2) return ds;
    }
    return null;
  })();

  return (
    <div>
      <div style={{ background:"#fff", borderRadius:14, padding:20, boxShadow:"0 2px 12px rgba(0,176,116,0.1)", border:"1.5px solid #D1FAE5" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
          <button onClick={()=>mo===0?(setMo(11),setYr(yr-1)):setMo(mo-1)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:G, lineHeight:1 }}>‹</button>
          <b style={{ fontSize:15, fontFamily:"'Trebuchet MS',sans-serif" }}>{MONTHS[mo]} {yr}</b>
          <button onClick={()=>mo===11?(setMo(0),setYr(yr+1)):setMo(mo+1)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:22, color:G, lineHeight:1 }}>›</button>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3, marginBottom:6 }}>
          {DAYS.map(d=><div key={d} style={{ textAlign:"center", fontSize:10, color:"#9CA3AF", fontWeight:"700" }}>{d}</div>)}
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:3 }}>
          {cells.map((d,i)=>{
            if(!d) return <div key={i}/>;
            const ds = fmt(d);
            const sel = selected === ds;
            const past = new Date(yr,mo,d) < today;
            const status = getDateStatus(ds, bookingCounts);
            const full = status === "full";
            const one = status === "one";
            const disabled = past || full;

            let bg = "transparent";
            let color = "#1a1a1a";
            let border = "none";
            let title = "";

            if (sel) { bg = G; color = "#fff"; }
            else if (past) { color = "#D1D5DB"; }
            else if (full) { bg = "#FEE2E2"; color = "#FCA5A5"; }
            else if (one) { bg = "#FEF9C3"; color = "#92400E"; border = "1px solid #FDE68A"; title = "1 spot left!"; }
            else { bg = "#F0FDF8"; color = GD; border = `1px solid #D1FAE5`; }

            return (
              <button key={i} disabled={disabled} onClick={()=>!disabled&&onSelect(ds)}
                title={full?"Fully booked":one?"1 spot left — book fast!":"Available"}
                style={{ aspectRatio:"1", border, borderRadius:8, cursor:disabled?"not-allowed":"pointer", fontSize:11, fontWeight:sel||one?"800":"500", background:bg, color, transition:"all 0.1s", position:"relative" }}>
                {d}
                {one && !sel && <span style={{ position:"absolute", bottom:1, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:"#F59E0B", display:"block" }}/>}
                {full && !sel && <span style={{ position:"absolute", bottom:1, left:"50%", transform:"translateX(-50%)", width:4, height:4, borderRadius:"50%", background:"#EF4444", display:"block" }}/>}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display:"flex", gap:12, marginTop:14, flexWrap:"wrap" }}>
          {[["#F0FDF8","#00834F","Available"],["#FEF9C3","#92400E","1 Spot Left"],["#FEE2E2","#FCA5A5","Full"],["#00B074","#fff","Selected"]].map(([bg,color,label])=>(
            <div key={label} style={{ display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:12, height:12, borderRadius:3, background:bg, border:`1px solid ${color}` }}/>
              <span style={{ fontSize:10, color:"#6B7280" }}>{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart suggestion when full day selected */}
      {selected && getDateStatus(selected, bookingCounts)==="full" && nextOpen && (
        <div style={{ background:"#FFF8E1", border:"1px solid #FDE68A", borderRadius:12, padding:"14px 16px", marginTop:12, display:"flex", alignItems:"center", justifyContent:"space-between", gap:10 }}>
          <div>
            <div style={{ fontWeight:"800", fontSize:13, color:"#92400E" }}>⚠️ That day is fully booked!</div>
            <div style={{ fontSize:12, color:"#A16207", marginTop:3 }}>Next available: <b>{nextOpen}</b></div>
          </div>
          <button onClick={()=>onSelect(nextOpen)} style={{ background:"#F59E0B", color:"#fff", border:"none", borderRadius:8, padding:"8px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", whiteSpace:"nowrap" }}>
            Pick This Day →
          </button>
        </div>
      )}
    </div>
  );
}


const emptyForm = { name:"", phone:"", email:"", address:"", propertyType:"Home", serviceId:"deep", bedrooms:"1-2", bathrooms:"1-2", sqft:"Under 1,000", officeRooms:"1-3", airbnbBeds:"1 bed", companyName:"", addons:[], date:"", time:"", hours:3, gateCode:"", entryMethod:"", details:"", payment:"card", cardName:"", cardNumber:"", cardExpiry:"", cardCVV:"" };

// Pre-filled bookings to demo the limit (2 jobs on Apr 25)
const INITIAL_BOOKING_COUNTS = {
  "2026-04-25": 2,
  "2026-04-26": 1,
  "2026-04-28": 1,
};

export default function Website() {
  const [page, setPage] = useState("home");
  const [form, setForm] = useState(emptyForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [bookingCounts, setBookingCounts] = useState(INITIAL_BOOKING_COUNTS);


  const svc = SERVICES.find(s=>s.id===form.serviceId)||SERVICES[1];
  const totalPrice = calcTotal(form.serviceId, form.propertyType, form.bedrooms, form.bathrooms, form.sqft, form.officeRooms, form.airbnbBeds, form.addons);

  function toggleAddon(id) {
    setF("addons", form.addons.includes(id) ? form.addons.filter(a=>a!==id) : [...form.addons, id]);
  }
  function setF(k,v){ setForm(f=>({...f,[k]:v})); }

  const isPostConstruction = form.serviceId === "postconstruction";

  function submit() {
    if (form.date) {
      // Post-construction takes the full day — count as 2 jobs
      const increment = form.serviceId === "postconstruction" ? 2 : 1;
      setBookingCounts(prev => ({
        ...prev,
        [form.date]: (prev[form.date] || 0) + increment
      }));
    }
    setSubmitted(true);
    setTimeout(()=>{ setSubmitted(false); setPage("home"); setForm(emptyForm); setStep(1); }, 4000);
  }

  // Block if day full, or if post-construction needs a completely free day
  function isDayBlockedForService(date) {
    const count = bookingCounts[date] || 0;
    if (count >= 2) return true;
    if (form.serviceId === "postconstruction" && count >= 1) return true;
    return false;
  }

  function handleContinue() {
    if (step === 2 && form.date && isDayBlockedForService(form.date)) return;
    setStep(step + 1);
  }

  const inp = { style:{ width:"100%", padding:"13px 16px", border:"1.5px solid #D1FAE5", borderRadius:10, fontSize:15, fontFamily:"'Trebuchet MS',sans-serif", background:"#fff", outline:"none", boxSizing:"border-box", color:"#1a1a1a", transition:"border 0.2s" }};
  const lbl = t => <label style={{ fontSize:11, color:"#6B7280", letterSpacing:"0.08em", display:"block", marginBottom:7, fontWeight:"700" }}>{t}</label>;

  return (
    <div style={{ fontFamily:"'Trebuchet MS',sans-serif", minHeight:"100vh", background:"#fff", color:"#1a1a1a", overflowX:"hidden" }}>
      <MobileStyles/>
      <PreloadHeroImage/>

      {/* NAV */}
      <nav style={{ position:"sticky", top:0, zIndex:100, background:"rgba(255,255,255,0.97)", backdropFilter:"blur(12px)", borderBottom:"1px solid #E5F7F1", padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <button onClick={()=>setPage("home")} style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}><Logo dark size={32}/></button>
        <div className="nav-links" style={{ display:"flex", alignItems:"center", gap:4 }}>
          {[["home","Home"],["services","Services"],["about","About"],["reviews","Reviews"],["contact","Contact"]].map(([p,l])=>(
            <button key={p} onClick={()=>setPage(p)} style={{ padding:"8px 14px", border:"none", background:"none", cursor:"pointer", fontFamily:"inherit", fontSize:13, fontWeight:page===p?"800":"500", color:page===p?G:"#6B7280", borderBottom:page===p?`2px solid ${G}`:"2px solid transparent", transition:"all 0.15s" }}>{l}</button>
          ))}
          <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ marginLeft:8, background:G, color:"#fff", border:"none", borderRadius:10, padding:"10px 18px", fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>
            Book Now ✦
          </button>
        </div>
        {/* Mobile nav */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button onClick={()=>{ setPage("book"); setStep(1); }} className="mobile-book-btn" style={{ display:"none", background:G, color:"#fff", border:"none", borderRadius:8, padding:"8px 14px", fontSize:12, cursor:"pointer", fontFamily:"inherit", fontWeight:"800" }}>
            Book ✦
          </button>
          <button onClick={()=>setMobileMenu(!mobileMenu)} style={{ background:"none", border:"1px solid #E5E7EB", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:18, lineHeight:1 }}>☰</button>
        </div>
      </nav>
      {/* Mobile dropdown menu */}
      {mobileMenu && (
        <div style={{ position:"fixed", top:64, left:0, right:0, background:"#fff", zIndex:99, borderBottom:"2px solid #E5F7F1", boxShadow:"0 8px 24px rgba(0,0,0,0.1)" }}>
          {[["home","🏠 Home"],["services","💎 Services"],["about","👤 About"],["reviews","⭐ Reviews"],["contact","📞 Contact"]].map(([p,l])=>(
            <button key={p} onClick={()=>{ setPage(p); setMobileMenu(false); }} style={{ display:"block", width:"100%", padding:"16px 24px", border:"none", borderBottom:"1px solid #F0FDF8", background:page===p?"#E5F7F1":"#fff", cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:page===p?"800":"500", color:page===p?G:"#1a1a1a", textAlign:"left" }}>{l}</button>
          ))}
          <button onClick={()=>{ setPage("book"); setStep(1); setMobileMenu(false); }} style={{ display:"block", width:"100%", padding:"16px 24px", border:"none", background:G, cursor:"pointer", fontFamily:"inherit", fontSize:15, fontWeight:"800", color:"#fff", textAlign:"left" }}>✦ Book a Cleaning</button>
        </div>
      )}

      {/* ── HOME ── */}
      {page==="home" && (
        <div>
          {/* Hero */}
          <section className="hero-pad" style={{ position:"relative", minHeight:"88vh", display:"flex", alignItems:"center", overflow:"hidden", padding:"60px 40px" }}>
            {/* Real photo background - multiple sources for reliability */}
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80"
              alt=""
              onError={e=>{
                e.target.src="https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?w=1600";
                e.target.onerror=()=>{ e.target.style.display="none"; };
              }}
              style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center", zIndex:0, filter:"brightness(0.42)" }}
            />
            {/* Green brand overlay */}
            <div style={{ position:"absolute", inset:0, zIndex:1, background:"linear-gradient(135deg, rgba(0,70,40,0.78) 0%, rgba(0,150,90,0.62) 60%, rgba(0,176,116,0.45) 100%)" }}/>
            {/* Fallback green background if image fails */}
            <div style={{ position:"absolute", inset:0, zIndex:-1, background:"linear-gradient(135deg, #00623A 0%, #00B074 100%)" }}/>

            <div className="hero-grid" style={{ maxWidth:1100, margin:"0 auto", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center", position:"relative", zIndex:2 }}>
              <div>
                <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"6px 14px", marginBottom:24 }}>
                  <Stars/> <span style={{ color:"#fff", fontSize:12, fontWeight:"700" }}>5.0 · Trusted across Arizona</span>
                </div>
                <h1 className="hero-title" style={{ fontSize:58, fontWeight:"900", color:"#fff", lineHeight:1.05, margin:"0 0 20px", letterSpacing:"-0.02em" }}>
                  Arizona's<br/>Cleanest<br/><span style={{ color:"#A7F3D0" }}>Homes ✦</span>
                </h1>
                <p style={{ color:"rgba(255,255,255,0.85)", fontSize:18, lineHeight:1.6, margin:"0 0 28px", maxWidth:440 }}>
                  Professional cleaning services for homes, offices & Airbnbs across Arizona. Licensed, insured & satisfaction guaranteed.
                </p>

                {/* Cartoon Cleaner Character */}
                <div style={{ display:"flex", alignItems:"flex-end", gap:16, marginBottom:28 }}>
                  <svg width="90" height="110" viewBox="0 0 90 110" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter:"drop-shadow(0 8px 16px rgba(0,0,0,0.25))", flexShrink:0 }}>
                    {/* Body */}
                    <ellipse cx="45" cy="75" rx="22" ry="26" fill="white" opacity="0.95"/>
                    {/* Uniform stripes */}
                    <rect x="34" y="62" width="22" height="4" rx="2" fill="#A7F3D0"/>
                    <rect x="34" y="70" width="22" height="4" rx="2" fill="#A7F3D0"/>
                    <rect x="34" y="78" width="22" height="4" rx="2" fill="#A7F3D0"/>
                    {/* Head */}
                    <circle cx="45" cy="34" r="18" fill="#FDDCB5"/>
                    {/* Hair */}
                    <ellipse cx="45" cy="17" rx="18" ry="8" fill="#1a1a1a"/>
                    <ellipse cx="29" cy="26" rx="5" ry="8" fill="#1a1a1a"/>
                    <ellipse cx="61" cy="26" rx="5" ry="8" fill="#1a1a1a"/>
                    {/* Maid cap */}
                    <rect x="28" y="14" width="34" height="8" rx="4" fill="white" opacity="0.9"/>
                    <rect x="32" y="10" width="26" height="6" rx="3" fill="white" opacity="0.7"/>
                    {/* Eyes */}
                    <circle cx="38" cy="34" r="3" fill="#1a1a1a"/>
                    <circle cx="52" cy="34" r="3" fill="#1a1a1a"/>
                    <circle cx="39" cy="33" r="1" fill="white"/>
                    <circle cx="53" cy="33" r="1" fill="white"/>
                    {/* Smile */}
                    <path d="M38 41 Q45 47 52 41" stroke="#E8845A" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    {/* Cheeks */}
                    <circle cx="34" cy="40" r="4" fill="#FFB3A0" opacity="0.5"/>
                    <circle cx="56" cy="40" r="4" fill="#FFB3A0" opacity="0.5"/>
                    {/* Left arm holding mop */}
                    <path d="M23 65 Q12 60 8 50" stroke="#FDDCB5" strokeWidth="8" strokeLinecap="round"/>
                    {/* Right arm */}
                    <path d="M67 65 Q76 58 78 65" stroke="#FDDCB5" strokeWidth="8" strokeLinecap="round"/>
                    {/* Mop stick */}
                    <line x1="8" y1="50" x2="2" y2="20" stroke="#A0522D" strokeWidth="3" strokeLinecap="round"/>
                    {/* Mop head */}
                    <ellipse cx="2" cy="17" rx="8" ry="5" fill="#E0F7FA" opacity="0.9"/>
                    <line x1="-4" y1="14" x2="-2" y2="22" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="0" y1="13" x2="1" y2="22" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="4" y1="13" x2="4" y2="22" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="7" y1="14" x2="6" y2="22" stroke="#B2EBF2" strokeWidth="2" strokeLinecap="round"/>
                    {/* Legs */}
                    <rect x="36" y="96" width="10" height="14" rx="5" fill="white" opacity="0.9"/>
                    <rect x="49" y="96" width="10" height="14" rx="5" fill="white" opacity="0.9"/>
                    {/* Shoes */}
                    <ellipse cx="41" cy="110" rx="8" ry="4" fill="#1a1a1a"/>
                    <ellipse cx="54" cy="110" rx="8" ry="4" fill="#1a1a1a"/>
                    {/* Sparkles */}
                    <text x="68" y="30" fontSize="14" fill="#FCD34D">✦</text>
                    <text x="74" y="50" fontSize="10" fill="white" opacity="0.7">✦</text>
                    <text x="60" y="18" fontSize="8" fill="white" opacity="0.6">✦</text>
                  </svg>

                  {/* Speech bubble */}
                  <div style={{ background:"rgba(255,255,255,0.18)", backdropFilter:"blur(10px)", borderRadius:"18px 18px 18px 4px", padding:"14px 18px", border:"1px solid rgba(255,255,255,0.3)", maxWidth:220 }}>
                    <div style={{ color:"#fff", fontWeight:"800", fontSize:13, marginBottom:4 }}>Hi! I'm here to help! 👋</div>
                    <div style={{ color:"rgba(255,255,255,0.8)", fontSize:11, lineHeight:1.5 }}>Book your clean today and I'll make your space sparkle ✨</div>
                  </div>
                </div>

                <div className="hero-cta" style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                  <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ background:"#fff", color:G, border:"none", borderRadius:12, padding:"16px 32px", fontSize:16, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", boxShadow:"0 8px 30px rgba(0,0,0,0.15)", transition:"transform 0.15s" }}
                    onMouseEnter={e=>e.target.style.transform="translateY(-2px)"} onMouseLeave={e=>e.target.style.transform="translateY(0)"}>
                    Book a Cleaning →
                  </button>
                  <button onClick={()=>setPage("services")} style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"2px solid rgba(255,255,255,0.4)", borderRadius:12, padding:"16px 28px", fontSize:16, cursor:"pointer", fontFamily:"inherit", fontWeight:"700" }}>
                    View Pricing
                  </button>
                </div>
                <div className="stats-row" style={{ display:"flex", gap:28, marginTop:40 }}>
                  {[["500+","Jobs Done"],["5.0★","Avg Rating"],["100%","Satisfaction"]].map(([v,l])=>(
                    <div key={l}>
                      <div style={{ fontSize:24, fontWeight:"900", color:"#fff" }}>{v}</div>
                      <div style={{ fontSize:12, color:"rgba(255,255,255,0.6)", marginTop:2 }}>{l}</div>
                    </div>
                  ))}
                </div>

                {/* Trust badges */}
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginTop:32 }}>
                  {[
                    {icon:"🛡️", text:"Licensed & Fully Insured in Arizona"},
                    {icon:"⚡", text:"Same-week appointments available"},
                    {icon:"✦",  text:"Satisfaction guaranteed or we come back free"},
                  ].map(({icon,text})=>(
                    <div key={text} style={{ display:"flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.13)", borderRadius:12, padding:"12px 16px", backdropFilter:"blur(8px)" }}>
                      <span style={{ fontSize:18, minWidth:24, textAlign:"center" }}>{icon}</span>
                      <span style={{ color:"rgba(255,255,255,0.92)", fontSize:13, fontWeight:"600", lineHeight:1.3 }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* Social proof avatars */}
                <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:16, background:"rgba(0,0,0,0.18)", borderRadius:14, padding:"12px 16px" }}>
                  <div style={{ display:"flex" }}>
                    {["JM","CR","TB","MD","PK"].map((a,i)=>(
                      <div key={a} style={{ width:28, height:28, borderRadius:"50%", background:`hsl(${i*55+140},55%,38%)`, border:"2px solid rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:8, fontWeight:"800", marginLeft:i===0?0:-8 }}>{a}</div>
                    ))}
                  </div>
                  <div style={{ flex:1 }}>
                    <div style={{ color:"#fff", fontSize:12, fontWeight:"800" }}>500+ Happy Customers</div>
                    <div style={{ color:"rgba(255,255,255,0.55)", fontSize:10, marginTop:1 }}>Phoenix · Scottsdale · Tempe & more</div>
                  </div>
                  <div style={{ display:"flex", gap:1 }}>
                    {"★★★★★".split("").map((s,i)=><span key={i} style={{ color:"#FCD34D", fontSize:13 }}>{s}</span>)}
                  </div>
                </div>
              </div>

              {/* Quick Quote Card */}
              <div style={{ background:"#fff", borderRadius:20, padding:32, boxShadow:"0 20px 60px rgba(0,0,0,0.2)" }}>
                <div style={{ fontWeight:"900", fontSize:18, marginBottom:4 }}>Get an Instant Quote</div>
                <div style={{ color:"#9CA3AF", fontSize:13, marginBottom:22 }}>No commitment · Free estimate</div>
                <div style={{ marginBottom:14 }}>
                  {lbl("SELECT SERVICE")}
                  <select value={form.serviceId} onChange={e=>setF("serviceId",e.target.value)} {...inp}>
                    {SERVICES.map(s=><option key={s.id} value={s.id}>{s.icon} {s.name} — ${s.price}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom:14 }}>
                  {lbl("PROPERTY TYPE")}
                  <div style={{ display:"flex", gap:8 }}>
                    {["Home","Office","Airbnb"].map(pt=>(
                      <button key={pt} onClick={()=>{ setF("propertyType",pt); setF("addons",[]); }} style={{ flex:1, padding:"11px 6px", border:`2px solid ${form.propertyType===pt?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"700", fontSize:12, background:form.propertyType===pt?"#E5F7F1":"#fff", color:form.propertyType===pt?G:"#6B7280" }}>
                        {propertyIcons[pt]} {pt}
                      </button>
                    ))}
                  </div>
                </div>
                <div style={{ background:GG, borderRadius:12, padding:"18px 20px", marginBottom:20, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  <div>
                    <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:"700" }}>YOUR ESTIMATE</div>
                    <div style={{ color:"#fff", fontSize:13, marginTop:2 }}>{svc.icon} {svc.name} · {svc.duration}</div>
                  </div>
                  <div style={{ color:"#A7F3D0", fontSize:36, fontWeight:"900" }}>${svc.price}</div>
                </div>
                <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ width:"100%", background:G, color:"#fff", border:"none", borderRadius:10, padding:"14px", fontSize:15, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>
                  Book This Now ✦
                </button>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="section-pad" style={{ padding:"80px 40px", background:"#F4FBF8" }}>
            <div style={{ maxWidth:1100, margin:"0 auto", textAlign:"center" }}>
              <div style={{ color:G, fontSize:12, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>WHY FRESH OUT LLC</div>
              <h2 style={{ fontSize:40, fontWeight:"900", margin:"0 0 50px", letterSpacing:"-0.02em" }}>Cleaning You Can Count On</h2>
              <div className="why-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:24 }}>
                {[
                  { icon:"🛡️", title:"Licensed & Insured", desc:"Fully licensed and insured for your peace of mind. We take responsibility seriously." },
                  { icon:"⏰", title:"Always On Time", desc:"We show up when we say we will. Your time matters and we respect it." },
                  { icon:"✦", title:"Satisfaction Guaranteed", desc:"Not happy? We'll come back and make it right — no questions asked." },
                  { icon:"🌿", title:"Eco-Friendly Products", desc:"Safe for kids, pets & the planet. We use green-certified cleaning products." },
                ].map(({icon,title,desc})=>(
                  <div key={title} style={{ background:"#fff", borderRadius:16, padding:"28px 22px", boxShadow:"0 2px 12px rgba(0,176,116,0.08)", textAlign:"center" }}>
                    <div style={{ fontSize:36, marginBottom:12 }}>{icon}</div>
                    <div style={{ fontWeight:"800", fontSize:16, marginBottom:8 }}>{title}</div>
                    <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6 }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Teaser */}
          <section style={{ padding:"80px 40px" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40 }}>
                <div>
                  <div style={{ color:G, fontSize:12, fontWeight:"800", letterSpacing:"0.15em", marginBottom:8 }}>OUR SERVICES</div>
                  <h2 style={{ fontSize:40, fontWeight:"900", margin:0, letterSpacing:"-0.02em" }}>What We Offer</h2>
                </div>
                <button onClick={()=>setPage("services")} style={{ background:"none", border:`2px solid ${G}`, borderRadius:10, padding:"10px 22px", color:G, fontFamily:"inherit", fontWeight:"800", fontSize:14, cursor:"pointer" }}>See All Pricing →</button>
              </div>
              <div className="services-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
                {SERVICES.slice(0,3).map(s=>(
                  <div key={s.id} style={{ background:"#F4FBF8", borderRadius:16, padding:"24px 22px", border:"1.5px solid #D1FAE5", position:"relative", overflow:"hidden" }}>
                    {s.badge && <div style={{ position:"absolute", top:14, right:14, background:G, color:"#fff", fontSize:9, fontWeight:"800", padding:"3px 8px", borderRadius:10, letterSpacing:"0.06em" }}>{s.badge}</div>}
                    <div style={{ fontSize:32, marginBottom:10 }}>{s.icon}</div>
                    <div style={{ fontWeight:"900", fontSize:17, marginBottom:4 }}>{s.name}</div>
                    <div style={{ fontSize:28, fontWeight:"900", color:G, marginBottom:6 }}>${s.price}</div>
                    <div style={{ fontSize:12, color:"#9CA3AF", marginBottom:12 }}>⏱ {s.duration}</div>
                    <div style={{ fontSize:13, color:"#374151", lineHeight:1.6, marginBottom:16 }}>{s.desc}</div>
                    <button onClick={()=>{ setF("serviceId",s.id); setPage("book"); setStep(1); }} style={{ width:"100%", padding:"11px", border:`2px solid ${G}`, borderRadius:9, background:"transparent", color:G, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:13 }}>Book Now →</button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reviews Strip */}
          <section style={{ padding:"80px 40px", background:"#1a1a1a" }}>
            <div style={{ maxWidth:1100, margin:"0 auto" }}>
              <div style={{ textAlign:"center", marginBottom:50 }}>
                <div style={{ color:G, fontSize:12, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>CUSTOMER REVIEWS</div>
                <h2 style={{ fontSize:40, fontWeight:"900", color:"#fff", margin:"0 0 8px", letterSpacing:"-0.02em" }}>What Arizona Says</h2>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:14 }}>500+ happy customers across the state</div>
              </div>
              <div className="reviews-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
                {REVIEWS.slice(0,3).map((r,i)=>(
                  <div key={i} style={{ background:"rgba(255,255,255,0.06)", borderRadius:16, padding:"24px 22px", border:"1px solid rgba(255,255,255,0.08)" }}>
                    <Stars n={r.stars}/>
                    <div style={{ color:"#fff", fontSize:14, lineHeight:1.7, margin:"12px 0 16px", fontStyle:"italic" }}>"{r.text}"</div>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{ width:38, height:38, borderRadius:"50%", background:G, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:12, fontWeight:"800" }}>{r.avatar}</div>
                      <div>
                        <div style={{ color:"#fff", fontWeight:"700", fontSize:13 }}>{r.name}</div>
                        <div style={{ color:"rgba(255,255,255,0.4)", fontSize:11 }}>{r.location} · {r.service}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign:"center", marginTop:32 }}>
                <button onClick={()=>setPage("reviews")} style={{ background:"transparent", border:"2px solid rgba(255,255,255,0.2)", borderRadius:10, padding:"12px 28px", color:"rgba(255,255,255,0.7)", fontFamily:"inherit", fontWeight:"700", fontSize:14, cursor:"pointer" }}>Read All Reviews →</button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section style={{ padding:"80px 40px", background:GG, textAlign:"center" }}>
            <div style={{ maxWidth:600, margin:"0 auto" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✦</div>
              <h2 style={{ fontSize:42, fontWeight:"900", color:"#fff", margin:"0 0 16px", letterSpacing:"-0.02em" }}>Ready for a Fresh Start?</h2>
              <p style={{ color:"rgba(255,255,255,0.8)", fontSize:17, margin:"0 0 36px", lineHeight:1.6 }}>Book your cleaning in minutes. Professional, reliable & guaranteed.</p>
              <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ background:"#fff", color:G, border:"none", borderRadius:14, padding:"18px 44px", fontSize:18, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", boxShadow:"0 10px 40px rgba(0,0,0,0.15)" }}>
                Book Your Clean Now →
              </button>
            </div>
          </section>

          {/* Footer */}
          <footer style={{ background:"#111", padding:"40px", textAlign:"center" }}>
            <Logo size={32}/>
            <div style={{ color:"rgba(255,255,255,0.3)", fontSize:12, marginTop:16 }}>© 2026 Fresh Out LLC · Arizona · All rights reserved</div>
            <div style={{ color:"rgba(255,255,255,0.4)", fontSize:12, marginTop:6 }}>📞 (480) 593-5426 · 📧 bookmyfreshout@gmail.com</div>
          </footer>
        </div>
      )}

      {/* ── SERVICES PAGE ── */}
      {page==="services" && (
        <div style={{ background:"#F4FBF8", minHeight:"100vh" }}>
          {/* Header */}
          <div style={{ background:GG, padding:"50px 24px 60px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-60, right:-60, width:200, height:200, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
            <div style={{ position:"absolute", bottom:-40, left:-40, width:150, height:150, borderRadius:"50%", background:"rgba(255,255,255,0.04)" }}/>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>ARIZONA MARKET RATES · 2026</div>
            <h1 style={{ fontSize:36, fontWeight:"900", color:"#fff", margin:"0 0 10px", letterSpacing:"-0.02em" }}>Services & Pricing</h1>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:15, margin:0 }}>Transparent flat-rate pricing. No surprises.</p>
          </div>

          {/* Price summary strip */}
          <div style={{ background:"#fff", padding:"0 16px", boxShadow:"0 2px 12px rgba(0,0,0,0.06)", overflowX:"auto" }}>
            <div style={{ display:"flex", gap:0, minWidth:"max-content", margin:"0 auto" }}>
              {SERVICES.map((s,i)=>(
                <div key={s.id} style={{ padding:"14px 18px", borderBottom:`3px solid transparent`, cursor:"pointer", textAlign:"center", borderRight: i<SERVICES.length-1?"1px solid #F0F0F0":"none" }}
                  onClick={()=>document.getElementById("svc-"+s.id)?.scrollIntoView({behavior:"smooth",block:"center"})}>
                  <div style={{ fontSize:18 }}>{s.icon}</div>
                  <div style={{ fontSize:11, fontWeight:"800", color:"#1a1a1a", whiteSpace:"nowrap", marginTop:2 }}>{s.name.split(" ")[0]}</div>
                  <div style={{ fontSize:14, fontWeight:"900", color:G }}>${s.price}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Service cards — full width stacked */}
          <div style={{ padding:"24px 16px", display:"flex", flexDirection:"column", gap:16, maxWidth:700, margin:"0 auto" }}>
            {SERVICES.map((s,i)=>(
              <div id={"svc-"+s.id} key={s.id} style={{ background:"#fff", borderRadius:20, overflow:"hidden", boxShadow:"0 2px 16px rgba(0,176,116,0.08)", border:"1px solid #E5F7F1" }}>
                {/* Card top bar */}
                <div style={{ background:GG, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:44, height:44, background:"rgba(255,255,255,0.2)", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>{s.icon}</div>
                    <div>
                      <div style={{ color:"#fff", fontWeight:"900", fontSize:17 }}>{s.name}</div>
                      <div style={{ color:"rgba(255,255,255,0.7)", fontSize:12 }}>⏱ {s.duration}</div>
                    </div>
                  </div>
                  <div style={{ textAlign:"right" }}>
                    {s.badge && <div style={{ background:"rgba(255,255,255,0.25)", color:"#fff", fontSize:9, fontWeight:"800", padding:"3px 8px", borderRadius:10, letterSpacing:"0.06em", marginBottom:4 }}>{s.badge}</div>}
                    <div style={{ color:"#A7F3D0", fontSize:32, fontWeight:"900", lineHeight:1 }}>${s.price}</div>
                    <div style={{ color:"rgba(255,255,255,0.6)", fontSize:10 }}>flat rate</div>
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding:"18px 20px" }}>
                  <p style={{ fontSize:13, color:"#6B7280", lineHeight:1.6, margin:"0 0 16px" }}>{s.desc}</p>

                  {/* Includes — horizontal chips */}
                  <div style={{ marginBottom:18 }}>
                    <div style={{ fontSize:10, color:"#9CA3AF", fontWeight:"800", letterSpacing:"0.08em", marginBottom:8 }}>WHAT'S INCLUDED</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                      {s.includes.map(item=>(
                        <div key={item} style={{ display:"flex", alignItems:"center", gap:4, background:"#F0FDF8", border:"1px solid #D1FAE5", borderRadius:20, padding:"5px 10px" }}>
                          <span style={{ color:G, fontWeight:"900", fontSize:11 }}>✓</span>
                          <span style={{ fontSize:11, color:"#374151", fontWeight:"600" }}>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Book button */}
                  <button onClick={()=>{ setF("serviceId",s.id); setPage("book"); setStep(1); }}
                    style={{ width:"100%", padding:"14px", border:"none", borderRadius:12, background:G, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:"900", fontSize:15, boxShadow:"0 4px 14px rgba(0,176,116,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                    Book {s.name} <span style={{ fontSize:16 }}>→</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Tip note */}
            <div style={{ background:"#fff", borderRadius:14, padding:"18px 20px", border:"1px solid #D1FAE5", display:"flex", gap:12, alignItems:"flex-start" }}>
              <span style={{ fontSize:20 }}>💡</span>
              <div style={{ fontSize:13, color:"#374151", lineHeight:1.7 }}>
                <strong>Recurring clients save 10%</strong> on every visit. Prices may vary for very large homes (4,000+ sq ft). <span style={{ color:G, fontWeight:"700", cursor:"pointer" }} onClick={()=>setPage("contact")}>Contact us</span> for a custom quote.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── ABOUT PAGE ── */}
      {page==="about" && (
        <div style={{ background:"#F4FBF8", minHeight:"100vh" }}>

          {/* Header */}
          <div style={{ background:GG, padding:"50px 24px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-50, right:-50, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>OUR STORY</div>
            <h1 style={{ fontSize:30, fontWeight:"900", color:"#fff", margin:"0 0 12px", whiteSpace:"nowrap" }}>About Fresh Out LLC</h1>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, maxWidth:500, margin:"0 auto", lineHeight:1.7 }}>Arizona's trusted cleaning company — built on hard work, integrity, and a passion for pristine spaces.</p>
          </div>

          <div style={{ maxWidth:600, margin:"0 auto", padding:"24px 16px" }}>

            {/* Stats row */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
              {[["🏆","500+","Cleanings"],["⭐","5.0","Stars"],["🛡️","100%","Insured"]].map(([icon,val,label])=>(
                <div key={label} style={{ background:"#fff", borderRadius:14, padding:"16px 10px", textAlign:"center", border:"1px solid #E5F7F1", boxShadow:"0 1px 6px rgba(0,176,116,0.06)" }}>
                  <div style={{ fontSize:24, marginBottom:4 }}>{icon}</div>
                  <div style={{ fontWeight:"900", fontSize:20, color:G }}>{val}</div>
                  <div style={{ fontSize:10, color:"#9CA3AF", fontWeight:"700", marginTop:2 }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>

            {/* Who we are */}
            <div style={{ background:"#fff", borderRadius:18, padding:"22px 20px", marginBottom:14, boxShadow:"0 2px 12px rgba(0,176,116,0.07)", border:"1px solid #E5F7F1" }}>
              <div style={{ color:G, fontSize:11, fontWeight:"800", letterSpacing:"0.12em", marginBottom:8 }}>WHO WE ARE</div>
              <h2 style={{ fontSize:20, fontWeight:"900", margin:"0 0 14px", color:"#1a1a1a" }}>Fresh Out LLC —<br/>Arizona Born & Built</h2>
              <p style={{ fontSize:14, color:"#6B7280", lineHeight:1.8, marginBottom:12, margin:"0 0 12px" }}>Fresh Out LLC was founded with one simple mission: to make every Arizona home, office, and Airbnb shine. We're a locally owned and operated company that takes pride in every job we do.</p>
              <p style={{ fontSize:14, color:"#6B7280", lineHeight:1.8, margin:0 }}>From standard cleanings to full post-construction jobs, our team brings energy, attention to detail, and genuine care to every single visit.</p>
            </div>

            {/* Our Promise */}
            <div style={{ background:GG, borderRadius:18, padding:"24px 20px", marginBottom:14, textAlign:"center" }}>
              <div style={{ fontSize:40, marginBottom:10 }}>✦</div>
              <div style={{ color:"#fff", fontWeight:"900", fontSize:20, marginBottom:8 }}>Our Promise</div>
              <div style={{ color:"rgba(255,255,255,0.85)", fontSize:14, lineHeight:1.7 }}>If you're not 100% satisfied with your clean, we'll return within 24 hours and make it right — <strong style={{color:"#A7F3D0"}}>completely free.</strong></div>
            </div>

            {/* Values */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:14 }}>
              {[
                {icon:"⏰", title:"Always On Time", desc:"We show up when we say we will. Your time matters."},
                {icon:"🌿", title:"Eco-Friendly", desc:"Safe for kids, pets & the planet. Green-certified products."},
                {icon:"💬", title:"Communicative", desc:"We keep you updated before, during and after every clean."},
              ].map(({icon,title,desc})=>(
                <div key={title} style={{ background:"#fff", borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, border:"1px solid #E5F7F1", boxShadow:"0 1px 6px rgba(0,176,116,0.05)" }}>
                  <div style={{ width:44, height:44, background:"#F0FDF8", borderRadius:12, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight:"900", fontSize:14, color:"#1a1a1a" }}>{title}</div>
                    <div style={{ fontSize:12, color:"#9CA3AF", marginTop:2, lineHeight:1.4 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ background:"#1a1a1a", borderRadius:16, padding:"22px 20px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
              <div>
                <div style={{ color:"#fff", fontWeight:"900", fontSize:15 }}>Ready to experience it?</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:2 }}>Book your first clean today</div>
              </div>
              <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ background:G, color:"#fff", border:"none", borderRadius:10, padding:"12px 18px", fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>
                Book Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── REVIEWS PAGE ── */}
      {page==="reviews" && (
        <div style={{ background:"#F4FBF8", minHeight:"100vh" }}>

          {/* Header */}
          <div style={{ background:GG, padding:"50px 24px 40px", textAlign:"center", position:"relative", overflow:"hidden" }}>
            <div style={{ position:"absolute", top:-50, right:-50, width:160, height:160, borderRadius:"50%", background:"rgba(255,255,255,0.06)" }}/>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>VERIFIED REVIEWS</div>
            <h1 style={{ fontSize:34, fontWeight:"900", color:"#fff", margin:"0 0 12px" }}>What Our Clients Say</h1>
            {/* Stars row */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"8px 18px", display:"inline-flex" }}>
              <Stars/><span style={{ color:"#fff", fontWeight:"900", fontSize:15 }}>5.0</span>
              <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13 }}>· 500+ reviews across Arizona</span>
            </div>
          </div>

          {/* Overall rating card */}
          <div style={{ maxWidth:600, margin:"0 auto", padding:"20px 16px 0" }}>
            <div style={{ background:"#fff", borderRadius:16, padding:"20px", boxShadow:"0 2px 12px rgba(0,176,116,0.08)", border:"1px solid #E5F7F1", display:"flex", alignItems:"center", justifyContent:"space-around", marginBottom:4 }}>
              {[["5.0","Overall Rating"],["500+","Happy Clients"],["100%","Satisfaction"],["AZ","Statewide"]].map(([val,label])=>(
                <div key={label} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:"900", color:G }}>{val}</div>
                  <div style={{ fontSize:10, color:"#9CA3AF", fontWeight:"700", marginTop:2 }}>{label.toUpperCase()}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Review cards — full width stacked */}
          <div style={{ maxWidth:600, margin:"0 auto", padding:"16px 16px 32px", display:"flex", flexDirection:"column", gap:14 }}>
            {REVIEWS.map((r,i)=>(
              <div key={i} style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,176,116,0.07)", border:"1px solid #E5F7F1" }}>
                {/* Top colored strip */}
                <div style={{ background:GG, height:5 }}/>
                <div style={{ padding:"20px 20px 18px" }}>
                  {/* Stars + service badge */}
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
                    <Stars n={r.stars}/>
                    <span style={{ background:"#F0FDF8", color:G, fontSize:10, fontWeight:"800", padding:"4px 10px", borderRadius:20, border:"1px solid #D1FAE5" }}>{r.service}</span>
                  </div>
                  {/* Review text */}
                  <p style={{ fontSize:14, color:"#374151", lineHeight:1.75, margin:"0 0 16px", fontStyle:"italic" }}>"{r.text}"</p>
                  {/* Reviewer */}
                  <div style={{ display:"flex", alignItems:"center", gap:12, paddingTop:14, borderTop:"1px solid #F0FDF8" }}>
                    <div style={{ width:44, height:44, borderRadius:"50%", background:GG, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:14, fontWeight:"900", flexShrink:0 }}>{r.avatar}</div>
                    <div>
                      <div style={{ fontWeight:"900", fontSize:15, color:"#1a1a1a" }}>{r.name}</div>
                      <div style={{ fontSize:12, color:"#9CA3AF", marginTop:1 }}>📍 {r.location}</div>
                    </div>
                    <div style={{ marginLeft:"auto" }}>
                      {"★★★★★".split("").map((s,j)=><span key={j} style={{ color:"#FCD34D", fontSize:14 }}>{s}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom CTA */}
            <div style={{ background:GG, borderRadius:18, padding:"24px 20px", textAlign:"center" }}>
              <div style={{ fontSize:28, marginBottom:8 }}>✦</div>
              <div style={{ color:"#fff", fontWeight:"900", fontSize:18, marginBottom:6 }}>Join Our Happy Clients!</div>
              <div style={{ color:"rgba(255,255,255,0.8)", fontSize:13, marginBottom:18, lineHeight:1.5 }}>Experience the Fresh Out difference today.</div>
              <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ background:"#fff", color:G, border:"none", borderRadius:12, padding:"14px 28px", fontSize:15, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", boxShadow:"0 4px 14px rgba(0,0,0,0.15)" }}>
                Book Your Clean →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTACT PAGE ── */}
      {page==="contact" && (
        <div style={{ background:"#F4FBF8", minHeight:"100vh" }}>

          {/* Header */}
          <div style={{ background:GG, padding:"50px 24px 40px", textAlign:"center" }}>
            <div style={{ color:"rgba(255,255,255,0.7)", fontSize:11, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>GET IN TOUCH</div>
            <h1 style={{ fontSize:34, fontWeight:"900", color:"#fff", margin:"0 0 8px" }}>Contact Us</h1>
            <p style={{ color:"rgba(255,255,255,0.8)", fontSize:14, margin:0 }}>We typically respond within 1 hour during business hours.</p>
          </div>

          <div style={{ maxWidth:600, margin:"0 auto", padding:"24px 16px" }}>

            {/* Quick action buttons */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
              <a href="tel:4805935426" style={{ textDecoration:"none" }}>
                <div style={{ background:G, borderRadius:14, padding:"18px 16px", textAlign:"center", boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>📞</div>
                  <div style={{ color:"#fff", fontWeight:"900", fontSize:14 }}>Call Us</div>
                  <div style={{ color:"rgba(255,255,255,0.8)", fontSize:12, marginTop:2 }}>(480) 593-5426</div>
                </div>
              </a>
              <a href="sms:4805935426" style={{ textDecoration:"none" }}>
                <div style={{ background:"#1a1a1a", borderRadius:14, padding:"18px 16px", textAlign:"center", boxShadow:"0 4px 14px rgba(0,0,0,0.2)" }}>
                  <div style={{ fontSize:28, marginBottom:6 }}>💬</div>
                  <div style={{ color:"#fff", fontWeight:"900", fontSize:14 }}>Text Us</div>
                  <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:2 }}>(480) 593-5426</div>
                </div>
              </a>
            </div>

            {/* Contact info cards */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
              {[
                { icon:"📧", label:"Email", val:"bookmyfreshout@gmail.com", sub:"Fastest response", color:"#0284C7", bg:"#EFF6FF" },
                { icon:"📍", label:"Service Area", val:"All of Arizona", sub:"Phoenix · Scottsdale · Tempe & more", color:G, bg:"#F0FDF8" },
                { icon:"🕐", label:"Business Hours", val:"Mon – Sat: 7am – 7pm", sub:"Sunday: Closed", color:"#7C3AED", bg:"#F5F3FF" },
              ].map(({icon,label,val,sub,color,bg})=>(
                <div key={label} style={{ background:"#fff", borderRadius:14, padding:"16px 18px", border:"1px solid #E5E7EB", display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
                  <div style={{ width:46, height:46, borderRadius:12, background:bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>{icon}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontSize:10, color:"#9CA3AF", fontWeight:"800", letterSpacing:"0.08em" }}>{label.toUpperCase()}</div>
                    <div style={{ fontWeight:"800", fontSize:15, color:"#1a1a1a", marginTop:2 }}>{val}</div>
                    <div style={{ fontSize:11, color:"#9CA3AF", marginTop:2 }}>{sub}</div>
                  </div>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:color, flexShrink:0 }}/>
                </div>
              ))}
            </div>

            {/* Message form */}
            <div style={{ background:"#fff", borderRadius:20, padding:"24px 20px", boxShadow:"0 4px 20px rgba(0,176,116,0.08)", border:"1px solid #E5F7F1" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
                <div style={{ width:40, height:40, background:GG, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>✉️</div>
                <div>
                  <div style={{ fontWeight:"900", fontSize:16 }}>Send us a Message</div>
                  <div style={{ fontSize:12, color:"#9CA3AF" }}>We'll get back to you within 1 hour</div>
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>{lbl("YOUR NAME")}<input type="text" placeholder="Jane Smith" {...inp}/></div>
                  <div>{lbl("PHONE")}<input type="tel" placeholder="(480) 000-0000" {...inp}/></div>
                </div>
                <div>{lbl("EMAIL")}<input type="email" placeholder="jane@email.com" {...inp}/></div>
                <div>{lbl("SERVICE NEEDED")}
                  <select {...inp}>
                    <option value="">Select a service...</option>
                    {SERVICES.map(s=><option key={s.id} value={s.id}>{s.icon} {s.name} — ${s.price}</option>)}
                  </select>
                </div>
                <div>{lbl("MESSAGE")}<textarea placeholder="Tell us what you need, your address, preferred dates..." rows={4} style={{ ...inp.style, resize:"vertical" }}/></div>
                <button style={{ background:G, color:"#fff", border:"none", borderRadius:12, padding:"16px", fontSize:15, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", boxShadow:"0 4px 14px rgba(0,176,116,0.3)", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                  <span>Send Message</span><span>✦</span>
                </button>
              </div>
            </div>

            {/* Bottom book CTA */}
            <div style={{ background:"#1a1a1a", borderRadius:16, padding:"22px 20px", marginTop:16, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
              <div>
                <div style={{ color:"#fff", fontWeight:"900", fontSize:15 }}>Ready to Book?</div>
                <div style={{ color:"rgba(255,255,255,0.5)", fontSize:12, marginTop:2 }}>Skip the message — book instantly</div>
              </div>
              <button onClick={()=>{ setPage("book"); setStep(1); }} style={{ background:G, color:"#fff", border:"none", borderRadius:10, padding:"12px 20px", fontSize:13, cursor:"pointer", fontFamily:"inherit", fontWeight:"900", whiteSpace:"nowrap", boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>
                Book Now →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── BOOKING PAGE ── */}
      {page==="book" && (
        <div className="page-pad" style={{ maxWidth:800, margin:"0 auto", padding:"50px 40px" }}>
          {submitted ? (
            <div style={{ textAlign:"center", padding:"80px 20px" }}>
              <div style={{ fontSize:70, marginBottom:20 }}>✦</div>
              <h2 style={{ fontSize:36, fontWeight:"900", color:G, margin:"0 0 12px" }}>Booking Confirmed!</h2>
              <p style={{ fontSize:17, color:"#6B7280", lineHeight:1.7 }}>Thank you! We'll reach out shortly to confirm your appointment.<br/>Fresh Out LLC — Arizona's cleanest choice.</p>
            </div>
          ) : (
            <>
              <div style={{ textAlign:"center", marginBottom:36 }}>
                <div style={{ color:G, fontSize:12, fontWeight:"800", letterSpacing:"0.15em", marginBottom:10 }}>FRESH OUT LLC</div>
                <h1 style={{ fontSize:40, fontWeight:"900", margin:"0 0 8px", letterSpacing:"-0.02em" }}>Book Your Cleaning</h1>
                <p style={{ color:"#6B7280", fontSize:15 }}>Professional · Reliable · Guaranteed</p>
              </div>

              {/* Step Bar */}
              <div className="step-bar" style={{ display:"flex", marginBottom:36, background:"#F4FBF8", borderRadius:14, padding:6, gap:4 }}>
                {["1. Service","2. Schedule","3. Access","4. Payment"].map((s,i)=>(
                  <div key={s} style={{ flex:1, padding:"10px 4px", borderRadius:10, textAlign:"center", background:step===i+1?G:step>i+1?"#D1FAE5":"transparent", color:step===i+1?"#fff":step>i+1?GD:"#9CA3AF", fontSize:12, fontWeight:"800", transition:"all 0.2s", cursor:step>i+1?"pointer":"default" }} onClick={()=>step>i+1&&setStep(i+1)}>
                    {step>i+1?"✓ ":""}{s}
                  </div>
                ))}
              </div>

              {/* STEP 1 */}
              {step===1 && (
                <div>
                  <div className="service-select-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:22 }}>
                    {SERVICES.map(s=>(
                      <button key={s.id} onClick={()=>setF("serviceId",s.id)} style={{ padding:"16px 10px", border:`2px solid ${form.serviceId===s.id?G:"#E5E7EB"}`, borderRadius:14, cursor:"pointer", fontFamily:"inherit", background:form.serviceId===s.id?"#E5F7F1":"#fff", textAlign:"left", transition:"all 0.15s", position:"relative" }}>
                        {s.badge&&<div style={{ position:"absolute",top:6,right:6,background:G,color:"#fff",fontSize:7,fontWeight:"800",padding:"2px 6px",borderRadius:10 }}>{s.badge}</div>}
                        <div style={{ fontSize:22, marginBottom:5 }}>{s.icon}</div>
                        <div style={{ fontWeight:"800", fontSize:12, marginBottom:2 }}>{s.name}</div>
                        <div style={{ fontSize:20, fontWeight:"900", color:G }}>${s.price}</div>
                        <div style={{ fontSize:10, color:"#9CA3AF" }}>{s.duration}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ display:"flex", gap:8, marginBottom:18 }}>
                    {["Home","Office","Airbnb"].map(pt=>(
                      <button key={pt} onClick={()=>{ setF("propertyType",pt); setF("addons",[]); }} style={{ flex:1, padding:"13px", border:`2px solid ${form.propertyType===pt?G:"#E5E7EB"}`, borderRadius:12, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", background:form.propertyType===pt?"#E5F7F1":"#fff", color:form.propertyType===pt?G:"#6B7280" }}>
                        {propertyIcons[pt]} {pt}
                      </button>
                    ))}
                  </div>
                  {/* ── CUSTOMIZE YOUR CLEAN ── */}
                  <div style={{ background:"#F4FBF8", borderRadius:16, padding:"18px 18px", marginBottom:18, border:"1.5px solid #D1FAE5" }}>
                    <div style={{ fontWeight:"900", fontSize:14, color:"#1a1a1a", marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ background:G, color:"#fff", borderRadius:8, padding:"4px 10px", fontSize:11 }}>✦ CUSTOMIZE</span>
                      <span>{form.propertyType === "Home" ? "Select Size & Extras" : form.propertyType === "Office" ? "Office Details" : "Airbnb Details"}</span>
                    </div>

                    {/* ── HOME fields ── */}
                    {form.propertyType === "Home" && (<>
                      <div style={{ marginBottom:14 }}>
                        {lbl("🛏️ NUMBER OF BEDROOMS")}
                        <div style={{ display:"flex", gap:8 }}>
                          {["1-2","3","4","5+"].map(b=>(
                            <button key={b} onClick={()=>setF("bedrooms",b)} style={{ flex:1, padding:"10px 4px", border:`2px solid ${form.bedrooms===b?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:13, background:form.bedrooms===b?G:"#fff", color:form.bedrooms===b?"#fff":"#6B7280", transition:"all 0.15s" }}>
                              {b}
                              {b!=="1-2" && <div style={{ fontSize:9, marginTop:2, color:form.bedrooms===b?"rgba(255,255,255,0.8)":G, fontWeight:"700" }}>+${BEDROOM_PRICES[b]}</div>}
                              {b==="1-2" && <div style={{ fontSize:9, marginTop:2, color:form.bedrooms===b?"rgba(255,255,255,0.7)":"#9CA3AF" }}>Included</div>}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("🚿 NUMBER OF BATHROOMS")}
                        <div style={{ display:"flex", gap:8 }}>
                          {["1-2","3","4","5+"].map(b=>(
                            <button key={b} onClick={()=>setF("bathrooms",b)} style={{ flex:1, padding:"10px 4px", border:`2px solid ${form.bathrooms===b?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:13, background:form.bathrooms===b?G:"#fff", color:form.bathrooms===b?"#fff":"#6B7280", transition:"all 0.15s" }}>
                              {b}
                              {b!=="1-2" && <div style={{ fontSize:9, marginTop:2, color:form.bathrooms===b?"rgba(255,255,255,0.8)":G, fontWeight:"700" }}>+${BATHROOM_PRICES[b]}</div>}
                              {b==="1-2" && <div style={{ fontSize:9, marginTop:2, color:form.bathrooms===b?"rgba(255,255,255,0.7)":"#9CA3AF" }}>Included</div>}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("✦ EXTRA ADD-ONS (OPTIONAL)")}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                          {HOME_ADDONS.map(a=>{ const active=form.addons.includes(a.id); return (
                            <button key={a.id} onClick={()=>toggleAddon(a.id)} style={{ padding:"10px 12px", border:`2px solid ${active?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", background:active?"#E5F7F1":"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.15s" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontSize:16 }}>{a.icon}</span><span style={{ fontWeight:"700", fontSize:11, color:active?G:"#374151" }}>{a.label}</span></div>
                              <span style={{ fontSize:11, fontWeight:"900", color:active?G:"#9CA3AF" }}>+${a.price}</span>
                            </button>
                          );})}
                        </div>
                      </div>
                    </>)}

                    {/* ── OFFICE fields ── */}
                    {form.propertyType === "Office" && (<>
                      <div style={{ marginBottom:14 }}>
                        {lbl("🏢 COMPANY / BUSINESS NAME")}
                        <input value={form.companyName} onChange={e=>setF("companyName",e.target.value)} placeholder="e.g. Acme Corp" {...inp}/>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("📐 OFFICE SIZE (SQ FT)")}
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {Object.keys(SQFT_PRICES).map(s=>(
                            <button key={s} onClick={()=>setF("sqft",s)} style={{ flex:1, minWidth:"45%", padding:"10px 6px", border:`2px solid ${form.sqft===s?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:11, background:form.sqft===s?G:"#fff", color:form.sqft===s?"#fff":"#6B7280", transition:"all 0.15s", textAlign:"center" }}>
                              {s}
                              <div style={{ fontSize:9, marginTop:2, color:form.sqft===s?"rgba(255,255,255,0.8)":SQFT_PRICES[s]>0?G:"#9CA3AF", fontWeight:"700" }}>{SQFT_PRICES[s]>0?`+$${SQFT_PRICES[s]}`:"Included"}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("🚪 NUMBER OF OFFICES / ROOMS")}
                        <div style={{ display:"flex", gap:8 }}>
                          {Object.keys(OFFICE_ROOMS_PRICES).map(r=>(
                            <button key={r} onClick={()=>setF("officeRooms",r)} style={{ flex:1, padding:"10px 4px", border:`2px solid ${form.officeRooms===r?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:12, background:form.officeRooms===r?G:"#fff", color:form.officeRooms===r?"#fff":"#6B7280", transition:"all 0.15s" }}>
                              {r}
                              <div style={{ fontSize:9, marginTop:2, color:form.officeRooms===r?"rgba(255,255,255,0.8)":OFFICE_ROOMS_PRICES[r]>0?G:"#9CA3AF", fontWeight:"700" }}>{OFFICE_ROOMS_PRICES[r]>0?`+$${OFFICE_ROOMS_PRICES[r]}`:"Included"}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("✦ OFFICE ADD-ONS (OPTIONAL)")}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                          {OFFICE_ADDONS.map(a=>{ const active=form.addons.includes(a.id); return (
                            <button key={a.id} onClick={()=>toggleAddon(a.id)} style={{ padding:"10px 12px", border:`2px solid ${active?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", background:active?"#E5F7F1":"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.15s" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontSize:16 }}>{a.icon}</span><span style={{ fontWeight:"700", fontSize:11, color:active?G:"#374151" }}>{a.label}</span></div>
                              <span style={{ fontSize:11, fontWeight:"900", color:active?G:"#9CA3AF" }}>+${a.price}</span>
                            </button>
                          );})}
                        </div>
                      </div>
                    </>)}

                    {/* ── AIRBNB fields ── */}
                    {form.propertyType === "Airbnb" && (<>
                      <div style={{ marginBottom:14 }}>
                        {lbl("📋 AIRBNB LISTING NAME (OPTIONAL)")}
                        <input value={form.companyName} onChange={e=>setF("companyName",e.target.value)} placeholder="e.g. Cozy Phoenix Retreat" {...inp}/>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("🛏️ NUMBER OF BEDROOMS")}
                        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                          {Object.keys(AIRBNB_BEDROOM_PRICES).map(b=>(
                            <button key={b} onClick={()=>setF("airbnbBeds",b)} style={{ flex:1, minWidth:"30%", padding:"10px 4px", border:`2px solid ${form.airbnbBeds===b?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", fontSize:11, background:form.airbnbBeds===b?G:"#fff", color:form.airbnbBeds===b?"#fff":"#6B7280", transition:"all 0.15s", textAlign:"center" }}>
                              {b}
                              <div style={{ fontSize:9, marginTop:2, color:form.airbnbBeds===b?"rgba(255,255,255,0.8)":AIRBNB_BEDROOM_PRICES[b]>0?G:"#9CA3AF", fontWeight:"700" }}>{AIRBNB_BEDROOM_PRICES[b]>0?`+$${AIRBNB_BEDROOM_PRICES[b]}`:"Included"}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div style={{ marginBottom:14 }}>
                        {lbl("✦ AIRBNB ADD-ONS (OPTIONAL)")}
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                          {AIRBNB_ADDONS.map(a=>{ const active=form.addons.includes(a.id); return (
                            <button key={a.id} onClick={()=>toggleAddon(a.id)} style={{ padding:"10px 12px", border:`2px solid ${active?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", fontFamily:"inherit", background:active?"#E5F7F1":"#fff", display:"flex", alignItems:"center", justifyContent:"space-between", transition:"all 0.15s" }}>
                              <div style={{ display:"flex", alignItems:"center", gap:6 }}><span style={{ fontSize:16 }}>{a.icon}</span><span style={{ fontWeight:"700", fontSize:11, color:active?G:"#374151" }}>{a.label}</span></div>
                              <span style={{ fontSize:11, fontWeight:"900", color:active?G:"#9CA3AF" }}>+${a.price}</span>
                            </button>
                          );})}
                        </div>
                      </div>
                    </>)}

                    {/* Live price display — always shown */}
                    <div style={{ background:G, borderRadius:12, padding:"14px 16px", marginTop:8, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <div>
                        <div style={{ color:"rgba(255,255,255,0.7)", fontSize:10, fontWeight:"700", letterSpacing:"0.08em" }}>YOUR TOTAL</div>
                        <div style={{ color:"rgba(255,255,255,0.8)", fontSize:11, marginTop:2 }}>
                          ${svc.price} base{totalPrice > svc.price ? ` + $${totalPrice - svc.price} extras` : " · all included"}
                        </div>
                      </div>
                      <div style={{ color:"#fff", fontSize:36, fontWeight:"900", lineHeight:1 }}>${totalPrice}</div>
                    </div>
                  </div>

                  <div className="form-2col" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                    <div>{lbl("FULL NAME")}<input value={form.name} onChange={e=>setF("name",e.target.value)} placeholder="Jane Smith" {...inp}/></div>
                    <div>{lbl("PHONE")}<input value={form.phone} onChange={e=>setF("phone",e.target.value)} placeholder="(602) 555-0000" {...inp}/></div>
                    <div style={{ gridColumn:"1/-1" }}>{lbl("EMAIL")}<input value={form.email} onChange={e=>setF("email",e.target.value)} placeholder="jane@email.com" {...inp}/></div>
                    <div style={{ gridColumn:"1/-1" }}>{lbl("SERVICE ADDRESS")}<input value={form.address} onChange={e=>setF("address",e.target.value)} placeholder="123 Main St, Phoenix, AZ" {...inp}/></div>
                    <div style={{ gridColumn:"1/-1" }}>{lbl("SPECIAL DETAILS")}<textarea value={form.details} onChange={e=>setF("details",e.target.value)} placeholder="Pets, special areas to focus on, allergies to products..." rows={3} style={{ ...inp.style, resize:"vertical" }}/></div>
                  </div>
                </div>
              )}

              {step===2 && (
                <div className="cal-time-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }}>
                  <Calendar selected={form.date} onSelect={d=>setF("date",d)} bookingCounts={bookingCounts}/>
                  <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                    {/* Post-construction full day notice */}
                    {isPostConstruction && (
                      <div style={{ background:"#FEF3C7", border:"1px solid #FDE68A", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontWeight:"800", fontSize:13, color:"#92400E" }}>🔨 Post-Construction = Full Day</div>
                        <div style={{ fontSize:12, color:"#A16207", marginTop:3 }}>This job blocks the entire day. Only fully open days (green) are available.</div>
                      </div>
                    )}
                    {/* Warning if selected date is fully booked */}
                    {form.date && (bookingCounts[form.date]||0) >= 2 && (
                      <div style={{ background:"#FEE2E2", border:"1px solid #FECACA", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontWeight:"800", fontSize:13, color:"#B91C1C" }}>🚫 Day Fully Booked</div>
                        <div style={{ fontSize:12, color:"#DC2626", marginTop:3 }}>Please select another available date.</div>
                      </div>
                    )}
                    {/* Post-construction can't go on a day with existing jobs */}
                    {form.date && isPostConstruction && (bookingCounts[form.date]||0) === 1 && (
                      <div style={{ background:"#FEE2E2", border:"1px solid #FECACA", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontWeight:"800", fontSize:13, color:"#B91C1C" }}>🚫 Day Already Has a Job</div>
                        <div style={{ fontSize:12, color:"#DC2626", marginTop:3 }}>Post-construction requires a fully open day. Please pick a green date.</div>
                      </div>
                    )}
                    {/* 1 spot left warning (non post-construction) */}
                    {form.date && !isPostConstruction && (bookingCounts[form.date]||0) === 1 && (
                      <div style={{ background:"#FEF9C3", border:"1px solid #FDE68A", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontWeight:"800", fontSize:13, color:"#92400E" }}>⚡ Only 1 Spot Left This Day!</div>
                        <div style={{ fontSize:12, color:"#A16207", marginTop:3 }}>Book now before it fills up.</div>
                      </div>
                    )}
                    <div>{lbl("START TIME")}
                      <select value={form.time} onChange={e=>setF("time",e.target.value)} {...inp}>
                        <option value="">Select time...</option>
                        {["07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"].map(t=>(
                          <option key={t} value={t}>{parseInt(t)>12?`${parseInt(t)-12}:00 PM`:t==="12:00"?"12:00 PM":`${parseInt(t)}:00 AM`}</option>
                        ))}
                      </select>
                    </div>
                    <div>{lbl("ESTIMATED HOURS")}
                      <div className="hours-row" style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        {[1,2,3,4,5,6,8].map(h=>(
                          <button key={h} onClick={()=>setF("hours",h)} style={{ flex:1, minWidth:36, padding:"11px 4px", border:`2px solid ${form.hours===h?G:"#E5E7EB"}`, borderRadius:9, cursor:"pointer", fontFamily:"inherit", fontWeight:"800", background:form.hours===h?"#E5F7F1":"#fff", color:form.hours===h?G:"#6B7280" }}>{h}h</button>
                        ))}
                      </div>
                    </div>
                    {form.date && form.time && (bookingCounts[form.date]||0) < 2 && (
                      <div style={{ background:GG, borderRadius:12, padding:18 }}>
                        <div style={{ fontSize:10, color:"rgba(255,255,255,0.6)", fontWeight:"800", letterSpacing:"0.08em", marginBottom:10 }}>✦ SUMMARY</div>
                        {[[svc.icon+" "+svc.name,"$"+totalPrice],[form.date,form.time],[form.hours+"h",form.propertyType]].map(([a,b],i)=>(
                          <div key={i} style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                            <span style={{ fontSize:12, color:"rgba(255,255,255,0.7)" }}>{a}</span>
                            <span style={{ fontSize:12, color:"#fff", fontWeight:"700" }}>{b}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step===3 && (
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  <div style={{ background:"#FFF8E1", border:"1px solid #FDE68A", borderRadius:12, padding:16, display:"flex", gap:10 }}>
                    <span style={{ fontSize:18 }}>🔒</span>
                    <div style={{ fontSize:13, color:"#A16207", lineHeight:1.6 }}><b>Secure:</b> Gate codes are encrypted and only shared with your cleaner on the day of service.</div>
                  </div>
                  <div>{lbl("GATE / ENTRY CODE (IF APPLICABLE)")}
                    <div style={{ position:"relative" }}>
                      <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>🔑</span>
                      <input value={form.gateCode} onChange={e=>setF("gateCode",e.target.value)} placeholder="e.g. 1234# — leave blank if none" style={{ ...inp.style, paddingLeft:44 }}/>
                    </div>
                  </div>
                  <div>{lbl("HOW WILL THE CLEANER ENTER?")}
                    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                      {["I'll be home","Key under mat","Lockbox","Building front desk","Gate code only"].map(opt=>(
                        <label key={opt} style={{ display:"flex", alignItems:"center", gap:10, padding:"13px 16px", border:`2px solid ${form.entryMethod===opt?G:"#E5E7EB"}`, borderRadius:10, cursor:"pointer", background:form.entryMethod===opt?"#E5F7F1":"#fff" }}>
                          <input type="radio" name="entry" checked={form.entryMethod===opt} onChange={()=>setF("entryMethod",opt)} style={{ accentColor:G }}/>
                          <span style={{ fontSize:14, fontWeight:form.entryMethod===opt?"800":"400", color:form.entryMethod===opt?G:"#374151" }}>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 — PROFESSIONAL PAYMENT UI */}
              {step===4 && (
                <div>
                  <h2 style={{ margin:"0 0 4px", fontWeight:"900", fontSize:22 }}>Secure Payment</h2>
                  <p style={{ color:"#9CA3AF", fontSize:13, margin:"0 0 24px" }}>All transactions are encrypted and secure.</p>

                  {/* Payment method tabs */}
                  <div className="payment-tabs" style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:8, marginBottom:24 }}>
                    {[
                      {id:"card", label:"Card", icon:"💳"},
                      {id:"zelle", label:"Zelle", icon:"🔵"},
                      {id:"venmo", label:"Venmo", icon:"🟦"},
                      {id:"cashapp", label:"Cash App", icon:"💚"},
                      {id:"cash", label:"Cash", icon:"💵"},
                    ].map(pm=>(
                      <button key={pm.id} onClick={()=>setF("payment",pm.id)} style={{
                        padding:"12px 6px", border:`2px solid ${form.payment===pm.id ? G : "#E5E7EB"}`,
                        borderRadius:12, cursor:"pointer", fontFamily:"inherit", fontWeight:"800",
                        fontSize:11, background:form.payment===pm.id ? G : "#fff",
                        color:form.payment===pm.id ? "#fff" : "#6B7280",
                        display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                        transition:"all 0.15s", boxShadow: form.payment===pm.id ? "0 4px 12px rgba(0,176,116,0.3)" : "none"
                      }}>
                        <span style={{ fontSize:20 }}>{pm.icon}</span>
                        {pm.label}
                      </button>
                    ))}
                  </div>

                  {/* CARD FORM */}
                  {form.payment==="card" && (
                    <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.12)", marginBottom:20, border:"1px solid #E5E7EB" }}>
                      {/* Card header */}
                      <div style={{ background:"linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%)", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div>
                          <div style={{ color:"rgba(255,255,255,0.5)", fontSize:10, letterSpacing:"0.12em", fontWeight:"700", marginBottom:4 }}>SECURE CARD PAYMENT</div>
                          <div style={{ color:"#fff", fontSize:22, fontWeight:"900" }}>${totalPrice}<span style={{ fontSize:13, fontWeight:"400", color:"rgba(255,255,255,0.5)", marginLeft:4 }}>USD</span></div>
                        </div>
                        {/* Card brand icons */}
                        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                          {/* Visa */}
                          <div style={{ background:"#1A1F71", borderRadius:6, padding:"4px 10px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <span style={{ color:"#fff", fontWeight:"900", fontSize:13, fontStyle:"italic", letterSpacing:"-0.5px" }}>VISA</span>
                          </div>
                          {/* Mastercard */}
                          <div style={{ display:"flex", alignItems:"center", position:"relative", width:36, height:24 }}>
                            <div style={{ width:24, height:24, borderRadius:"50%", background:"#EB001B", position:"absolute", left:0 }}/>
                            <div style={{ width:24, height:24, borderRadius:"50%", background:"#F79E1B", position:"absolute", right:0, opacity:0.9 }}/>
                          </div>
                          {/* Amex */}
                          <div style={{ background:"#2E77BC", borderRadius:6, padding:"4px 8px" }}>
                            <span style={{ color:"#fff", fontWeight:"900", fontSize:10, letterSpacing:"0.05em" }}>AMEX</span>
                          </div>
                        </div>
                      </div>

                      {/* Card visual preview */}
                      <div style={{ padding:"0 24px" }}>
                        <div style={{ background:"linear-gradient(135deg,#00B074 0%,#00623A 100%)", borderRadius:16, padding:"20px 22px", margin:"20px 0", boxShadow:"0 8px 24px rgba(0,176,116,0.3)" }}>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:20 }}>
                            <div style={{ width:40, height:28, background:"rgba(255,255,255,0.3)", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center" }}>
                              <div style={{ width:28, height:20, background:"linear-gradient(135deg,#FFD700,#FFA500)", borderRadius:3 }}/>
                            </div>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2L8 8H2L6.5 12.5L5 19L12 15.5L19 19L17.5 12.5L22 8H16L12 2Z" fill="rgba(255,255,255,0.4)"/>
                            </svg>
                          </div>
                          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:10, letterSpacing:"0.2em", marginBottom:4 }}>CARD NUMBER</div>
                          <div style={{ color:"#fff", fontSize:17, fontWeight:"700", letterSpacing:"0.15em", marginBottom:16, fontFamily:"monospace" }}>
                            {form.cardNumber
                              ? (form.cardNumber.replace(/(.{4})/g,"$1 ").trim() + " ").slice(0,19).padEnd(19,"•").replace(/\d(?=.{5,})/g,"•")
                              : "•••• •••• •••• ••••"}
                          </div>
                          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                            <div>
                              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:9, letterSpacing:"0.15em", marginBottom:2 }}>CARDHOLDER</div>
                              <div style={{ color:"#fff", fontSize:13, fontWeight:"700", textTransform:"uppercase" }}>{form.cardName || "YOUR NAME"}</div>
                            </div>
                            <div style={{ textAlign:"right" }}>
                              <div style={{ color:"rgba(255,255,255,0.6)", fontSize:9, letterSpacing:"0.15em", marginBottom:2 }}>EXPIRES</div>
                              <div style={{ color:"#fff", fontSize:13, fontWeight:"700", fontFamily:"monospace" }}>{form.cardExpiry || "MM/YY"}</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Input fields */}
                      <div style={{ padding:"0 24px 24px", display:"flex", flexDirection:"column", gap:14 }}>
                        <div>
                          <label style={{ fontSize:11, color:"#6B7280", letterSpacing:"0.08em", display:"block", marginBottom:7, fontWeight:"700" }}>CARDHOLDER NAME</label>
                          <input
                            value={form.cardName}
                            onChange={e=>setF("cardName",e.target.value)}
                            placeholder="Jane Smith"
                            autoComplete="cc-name"
                            style={{ width:"100%", padding:"14px 16px", border:"1.5px solid #E5E7EB", borderRadius:10, fontSize:15, fontFamily:"inherit", background:"#FAFAFA", outline:"none", boxSizing:"border-box", color:"#1a1a1a", transition:"border 0.2s" }}
                            onFocus={e=>e.target.style.border="1.5px solid "+G}
                            onBlur={e=>e.target.style.border="1.5px solid #E5E7EB"}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize:11, color:"#6B7280", letterSpacing:"0.08em", display:"block", marginBottom:7, fontWeight:"700" }}>CARD NUMBER</label>
                          <div style={{ position:"relative" }}>
                            <input
                              value={form.cardNumber.replace(/(.{4})/g,"$1 ").trim()}
                              onChange={e=>setF("cardNumber",e.target.value.replace(/ /g,"").replace(/\D/g,"").slice(0,16))}
                              placeholder="1234 5678 9012 3456"
                              autoComplete="cc-number"
                              inputMode="numeric"
                              maxLength={19}
                              style={{ width:"100%", padding:"14px 50px 14px 16px", border:"1.5px solid #E5E7EB", borderRadius:10, fontSize:15, fontFamily:"monospace", background:"#FAFAFA", outline:"none", boxSizing:"border-box", color:"#1a1a1a", letterSpacing:"0.05em" }}
                              onFocus={e=>e.target.style.border="1.5px solid "+G}
                              onBlur={e=>e.target.style.border="1.5px solid #E5E7EB"}
                            />
                            <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", fontSize:20 }}>💳</span>
                          </div>
                        </div>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                          <div>
                            <label style={{ fontSize:11, color:"#6B7280", letterSpacing:"0.08em", display:"block", marginBottom:7, fontWeight:"700" }}>EXPIRY DATE</label>
                            <input
                              value={form.cardExpiry}
                              onChange={e=>{
                                let v=e.target.value.replace(/\D/g,"").slice(0,4);
                                if(v.length>=3) v=v.slice(0,2)+"/"+v.slice(2);
                                setF("cardExpiry",v);
                              }}
                              placeholder="MM / YY"
                              autoComplete="cc-exp"
                              inputMode="numeric"
                              maxLength={5}
                              style={{ width:"100%", padding:"14px 16px", border:"1.5px solid #E5E7EB", borderRadius:10, fontSize:15, fontFamily:"monospace", background:"#FAFAFA", outline:"none", boxSizing:"border-box", color:"#1a1a1a", letterSpacing:"0.1em" }}
                              onFocus={e=>e.target.style.border="1.5px solid "+G}
                              onBlur={e=>e.target.style.border="1.5px solid #E5E7EB"}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize:11, color:"#6B7280", letterSpacing:"0.08em", display:"block", marginBottom:7, fontWeight:"700" }}>CVV</label>
                            <div style={{ position:"relative" }}>
                              <input
                                value={form.cardCVV}
                                onChange={e=>setF("cardCVV",e.target.value.replace(/\D/g,"").slice(0,4))}
                                placeholder="•••"
                                autoComplete="cc-csc"
                                inputMode="numeric"
                                maxLength={4}
                                type="password"
                                style={{ width:"100%", padding:"14px 44px 14px 16px", border:"1.5px solid #E5E7EB", borderRadius:10, fontSize:15, fontFamily:"monospace", background:"#FAFAFA", outline:"none", boxSizing:"border-box", color:"#1a1a1a" }}
                                onFocus={e=>e.target.style.border="1.5px solid "+G}
                                onBlur={e=>e.target.style.border="1.5px solid #E5E7EB"}
                              />
                              <span style={{ position:"absolute", right:14, top:"50%", transform:"translateY(-50%)", fontSize:16 }}>🔒</span>
                            </div>
                          </div>
                        </div>

                        {/* Security badges */}
                        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, padding:"12px 0", borderTop:"1px solid #F0F0F0" }}>
                          {[["🔒","SSL Encrypted"],["🛡️","PCI Compliant"],["✓","Stripe Secured"]].map(([icon,label])=>(
                            <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
                              <span style={{ fontSize:12 }}>{icon}</span>
                              <span style={{ fontSize:10, color:"#9CA3AF", fontWeight:"700" }}>{label}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* OTHER PAYMENT METHODS */}
                  {form.payment!=="card" && (
                    <div style={{ background:"#fff", borderRadius:18, overflow:"hidden", boxShadow:"0 4px 20px rgba(0,0,0,0.08)", marginBottom:20, border:"1px solid #E5E7EB" }}>
                      <div style={{ padding:"20px 24px", borderBottom:"1px solid #F0F0F0" }}>
                        <div style={{ fontWeight:"900", fontSize:16, marginBottom:4 }}>
                          {form.payment==="zelle" && "🔵 Pay via Zelle"}
                          {form.payment==="venmo" && "🟦 Pay via Venmo"}
                          {form.payment==="cashapp" && "💚 Pay via Cash App"}
                          {form.payment==="cash" && "💵 Pay with Cash"}
                        </div>
                        <div style={{ fontSize:13, color:"#9CA3AF" }}>Send your payment before your appointment</div>
                      </div>
                      <div style={{ padding:"24px" }}>
                        {form.payment==="zelle" && (
                          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                            <div style={{ background:"#E8F4FD", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:"#1D72B8", fontWeight:"700", marginBottom:2 }}>SEND TO</div>
                                <div style={{ fontSize:16, fontWeight:"900", color:"#1a1a1a" }}>bookmyfreshout@gmail.com</div>
                              </div>
                              <span style={{ fontSize:28 }}>🔵</span>
                            </div>
                            <div style={{ background:"#F0FDF8", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:GD, fontWeight:"700", marginBottom:2 }}>AMOUNT</div>
                                <div style={{ fontSize:24, fontWeight:"900", color:G }}>${totalPrice}</div>
                              </div>
                              <span style={{ fontSize:13, color:"#6B7280", fontWeight:"700" }}>USD</span>
                            </div>
                            <div style={{ fontSize:12, color:"#9CA3AF", textAlign:"center", lineHeight:1.6 }}>Open your Zelle app → Send → Enter the email above → Enter amount → Send ✓</div>
                          </div>
                        )}
                        {form.payment==="venmo" && (
                          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                            <div style={{ background:"#EEF2FF", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:"#3730A3", fontWeight:"700", marginBottom:2 }}>VENMO USERNAME</div>
                                <div style={{ fontSize:16, fontWeight:"900", color:"#1a1a1a" }}>@FreshOutLLC</div>
                              </div>
                              <span style={{ fontSize:28 }}>🟦</span>
                            </div>
                            <div style={{ background:"#F0FDF8", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:GD, fontWeight:"700", marginBottom:2 }}>AMOUNT</div>
                                <div style={{ fontSize:24, fontWeight:"900", color:G }}>${totalPrice}</div>
                              </div>
                              <span style={{ fontSize:13, color:"#6B7280", fontWeight:"700" }}>USD</span>
                            </div>
                            <div style={{ fontSize:12, color:"#9CA3AF", textAlign:"center", lineHeight:1.6 }}>Open Venmo → Search @FreshOutLLC → Enter amount → Pay ✓</div>
                          </div>
                        )}
                        {form.payment==="cashapp" && (
                          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                            <div style={{ background:"#F0FDF4", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:"#15803D", fontWeight:"700", marginBottom:2 }}>CASH TAG</div>
                                <div style={{ fontSize:16, fontWeight:"900", color:"#1a1a1a" }}>$FreshOutLLC</div>
                              </div>
                              <span style={{ fontSize:28 }}>💚</span>
                            </div>
                            <div style={{ background:"#F0FDF8", borderRadius:12, padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                              <div>
                                <div style={{ fontSize:11, color:GD, fontWeight:"700", marginBottom:2 }}>AMOUNT</div>
                                <div style={{ fontSize:24, fontWeight:"900", color:G }}>${totalPrice}</div>
                              </div>
                              <span style={{ fontSize:13, color:"#6B7280", fontWeight:"700" }}>USD</span>
                            </div>
                            <div style={{ fontSize:12, color:"#9CA3AF", textAlign:"center", lineHeight:1.6 }}>Open Cash App → Search $FreshOutLLC → Enter amount → Pay ✓</div>
                          </div>
                        )}
                        {form.payment==="cash" && (
                          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                            <div style={{ background:"#FFFBEB", borderRadius:12, padding:"20px", textAlign:"center", border:"1.5px dashed #FDE68A" }}>
                              <div style={{ fontSize:40, marginBottom:10 }}>💵</div>
                              <div style={{ fontWeight:"900", fontSize:16, marginBottom:4 }}>Cash Payment</div>
                              <div style={{ fontSize:13, color:"#6B7280", lineHeight:1.6 }}>Please have <strong style={{color:"#1a1a1a"}}>${svc.price} exact cash</strong> ready for your cleaner on the day of service. A receipt will be provided.</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* ORDER SUMMARY */}
                  <div style={{ background:"#1a1a1a", borderRadius:16, overflow:"hidden" }}>
                    <div style={{ padding:"18px 22px", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
                      <div style={{ fontSize:11, color:G, fontWeight:"800", letterSpacing:"0.1em" }}>✦ ORDER SUMMARY</div>
                    </div>
                    <div className="order-grid" style={{ padding:"16px 22px", display:"flex", flexDirection:"column", gap:8 }}>
                      {[
                        ["Service", svc.icon+" "+svc.name],
                        ["Property", propertyIcons[form.propertyType]+" "+form.propertyType],
                        ["Date", form.date||"—"],
                        ["Time", form.time ? form.time+" · "+form.hours+"h" : "—"],
                        ["Address", form.address||"—"],
                      ].map(([k,v])=>(
                        <div key={k} style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                          <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", fontWeight:"600" }}>{k}</span>
                          <span style={{ fontSize:13, color:"rgba(255,255,255,0.85)", fontWeight:"700", maxWidth:"60%", textAlign:"right" }}>{v}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ margin:"0 22px", height:1, background:"rgba(255,255,255,0.08)" }}/>
                    <div style={{ padding:"18px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ color:"rgba(255,255,255,0.6)", fontSize:14, fontWeight:"700" }}>TOTAL DUE</span>
                      <span style={{ color:G, fontSize:32, fontWeight:"900" }}>${totalPrice}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Nav Buttons */}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:32, paddingTop:24, borderTop:"1px solid #E5F7F1" }}>
                <button onClick={()=>step>1?setStep(step-1):setPage("home")} style={{ padding:"13px 26px", border:"1.5px solid #E5E7EB", borderRadius:10, background:"transparent", color:"#6B7280", cursor:"pointer", fontFamily:"inherit", fontWeight:"700", fontSize:15 }}>
                  {step>1?"← Back":"Cancel"}
                </button>
                {step<4 ? (
                  <button
                    onClick={handleContinue}
                    disabled={step===2 && form.date && isDayBlockedForService(form.date)}
                    style={{ padding:"13px 32px", border:"none", borderRadius:10,
                      background: step===2 && form.date && isDayBlockedForService(form.date) ? "#E5E7EB" : G,
                      color: step===2 && form.date && isDayBlockedForService(form.date) ? "#9CA3AF" : "#fff",
                      cursor: step===2 && form.date && isDayBlockedForService(form.date) ? "not-allowed" : "pointer",
                      fontFamily:"inherit", fontWeight:"900", fontSize:15,
                      boxShadow: step===2 && form.date && isDayBlockedForService(form.date) ? "none" : "0 4px 14px rgba(0,176,116,0.3)" }}>
                    {step===2 && form.date && isDayBlockedForService(form.date)
                      ? (isPostConstruction ? "🔨 Needs a Clear Day" : "🚫 Pick Another Day")
                      : "Continue →"}
                  </button>
                ) : (
                  <button onClick={submit} style={{ padding:"13px 32px", border:"none", borderRadius:10, background:G, color:"#fff", cursor:"pointer", fontFamily:"inherit", fontWeight:"900", fontSize:15, boxShadow:"0 4px 14px rgba(0,176,116,0.3)" }}>✦ Confirm Booking</button>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
