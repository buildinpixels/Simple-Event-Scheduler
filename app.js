import { fetchEvents } from "./api.js";

/* ---------- STATE ---------- */
let state = {
  events: [],
  loading: true,
  error: null,
  filter: "all",
  sort: "start"
};

/* ---------- DOM ---------- */
const statsElement = document.getElementById("stats");
const eventsElement = document.getElementById("event-list");
const sortElement = document.getElementById("sort");
const filterElement = document.getElementById("filter");
const resolveButton = document.getElementById("bulk-action");

const addButton = document.getElementById("add");
const titleInput = document.getElementById("title");
const startInput = document.getElementById("start");
const endInput = document.getElementById("end");
const onlineInput = document.getElementById("online");

/* ---------- EVENTS ---------- */
sortElement.addEventListener("change", e => {
  state = { ...state, sort: e.target.value };
  render();
});

filterElement.addEventListener("change", e => {
  state = { ...state, filter: e.target.value };
  render();
});

/* ---------- HELPERS ---------- */
const getDuration = e =>
  new Date(e.endTime) - new Date(e.startTime);

const hasConflict = (event, events) => {
  const startA = new Date(event.startTime);
  const endA = new Date(event.endTime);

  return events.some(other => {
    if (other.id === event.id) return false;
    return (
      startA < new Date(other.endTime) &&
      endA > new Date(other.startTime)
    );
  });
};

/* ---------- RESOLVE CONFLICTS ---------- */
resolveButton.addEventListener("click", () => {
  const resolved = state.events.map(e => ({ ...e }));

  resolved.forEach(event => {
    while (hasConflict(event, resolved)) {
      const start = new Date(event.startTime);
      const end = new Date(event.endTime);

      event.startTime = new Date(start.getTime() + 30 * 60000).toISOString();
      event.endTime = new Date(end.getTime() + 30 * 60000).toISOString();
    }
  });

  state = { ...state, events: resolved };
  render();
});

/* ---------- CREATE EVENT ---------- */
addButton.addEventListener("click", () => {
  const title = titleInput.value.trim();
  const startTime = startInput.value;
  const endTime = endInput.value;
  const isOnline = onlineInput.checked;

  if (!title || !startTime || !endTime) {
    alert("Fill all fields");
    return;
  }

  if (new Date(startTime) >= new Date(endTime)) {
    alert("End must be after start");
    return;
  }

  const newEvent = {
    id: Date.now(),
    title,
    startTime,
    endTime,
    isOnline
  };

  state = {
    ...state,
    events: [...state.events, newEvent]
  };

  titleInput.value = "";
  startInput.value = "";
  endInput.value = "";
  onlineInput.checked = false;

  render();
});

/* ---------- RENDER EVENT ---------- */
const renderEvent = event => {
  const conflict = hasConflict(event, state.events);

  return `
    <div style="border:1px solid #ccc; padding:8px; margin:6px 0;">
      <strong>${event.title}</strong>
      <div>${new Date(event.startTime).toLocaleString()} → ${new Date(event.endTime).toLocaleString()}</div>
      <div>${event.isOnline ? "Online" : "Offline"}</div>
      ${conflict ? "<span style='color:red'>⚠ Conflict</span>" : ""}
    </div>
  `;
};

/* ---------- RENDER ---------- */
const render = () => {
  if (state.loading) {
    statsElement.textContent = "Loading...";
    return;
  }

  if (state.error) {
    statsElement.textContent = "Failed to load data";
    return;
  }

  const total = state.events.length;
  const conflicts = state.events.filter(e =>
    hasConflict(e, state.events)
  ).length;

  statsElement.innerHTML = `
    Total Events: ${total} |
    Conflicts: ${conflicts}
  `;

  let visible = state.events.slice();

  if (state.filter === "online") visible = visible.filter(e => e.isOnline);
  if (state.filter === "offline") visible = visible.filter(e => !e.isOnline);
  if (state.filter === "long") visible = visible.filter(e => getDuration(e) > 3600000);
  if (state.filter === "conflict") visible = visible.filter(e => hasConflict(e, state.events));

  if (state.sort === "start") visible.sort((a,b)=>new Date(a.startTime)-new Date(b.startTime));
  if (state.sort === "duration") visible.sort((a,b)=>getDuration(a)-getDuration(b));
  if (state.sort === "title") visible.sort((a,b)=>a.title.localeCompare(b.title));

  eventsElement.innerHTML = visible.map(renderEvent).join("");
};

/* ---------- INIT ---------- */
const init = async () => {
  try {
    const events = await fetchEvents();
    state = { ...state, events, loading: false };
  } catch (err) {
    state = { ...state, error: err, loading: false };
  }
  render();
};

init();
