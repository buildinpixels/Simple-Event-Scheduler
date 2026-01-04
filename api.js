export const events = [
  // ----- ONLINE EVENTS -----
  {
    id: 1,
    title: "Team Standup",
    startTime: "2026-01-05T10:00",
    endTime: "2026-01-05T10:30",
    location: "Google Meet",
    isOnline: true,
    meta: {
      createdBy: "Manager",
      tags: ["daily", "team"],
      notes: "Quick updates"
    }
  },
  {
    id: 2,
    title: "Frontend Sync",
    startTime: "2026-01-05T10:15",
    endTime: "2026-01-05T11:00",
    location: "Zoom",
    isOnline: true,
    meta: {
      createdBy: "Lead Dev",
      tags: ["frontend"],
      notes: null
    }
  },
  {
    id: 3,
    title: "Design Review",
    startTime: "2026-01-05T12:00",
    endTime: "2026-01-05T13:30",
    location: "Teams",
    isOnline: true,
    meta: {
      createdBy: "Designer",
      tags: ["ui", "ux"],
      notes: "Bring mockups"
    }
  },
  {
    id: 4,
    title: "Client Call",
    startTime: "2026-01-06T09:00",
    endTime: "2026-01-06T10:00",
    location: "Zoom",
    isOnline: true,
    meta: {
      createdBy: "Sales",
      tags: ["client"],
      notes: null
    }
  },
  {
    id: 5,
    title: "Tech Talk",
    startTime: "2026-01-06T15:00",
    endTime: "2026-01-06T16:30",
    location: "YouTube Live",
    isOnline: true,
    meta: {
      createdBy: "Community",
      tags: ["learning"],
      notes: "Open to all"
    }
  },

  // ----- OFFLINE EVENTS -----
  {
    id: 6,
    title: "Office Meeting",
    startTime: "2026-01-05T11:00",
    endTime: "2026-01-05T12:00",
    location: "Conference Room A",
    isOnline: false,
    meta: {
      createdBy: "HR",
      tags: ["office"],
      notes: null
    }
  },
  {
    id: 7,
    title: "Code Review Session",
    startTime: "2026-01-05T11:30",
    endTime: "2026-01-05T13:00",
    location: "Meeting Room 2",
    isOnline: false,
    meta: {
      createdBy: "Senior Dev",
      tags: ["backend"],
      notes: "Bring laptop"
    }
  },
  {
    id: 8,
    title: "Workshop",
    startTime: "2026-01-06T10:00",
    endTime: "2026-01-06T13:00",
    location: "Auditorium",
    isOnline: false,
    meta: {
      createdBy: "Training",
      tags: ["workshop"],
      notes: "Hands-on"
    }
  },
  {
    id: 9,
    title: "Interview Panel",
    startTime: "2026-01-06T14:00",
    endTime: "2026-01-06T15:30",
    location: "HR Cabin",
    isOnline: false,
    meta: {
      createdBy: "HR",
      tags: ["hiring"],
      notes: null
    }
  },
  {
    id: 10,
    title: "Office Townhall",
    startTime: "2026-01-07T16:00",
    endTime: "2026-01-07T17:30",
    location: "Main Hall",
    isOnline: false,
    meta: {
      createdBy: "CEO",
      tags: ["company"],
      notes: "Mandatory"
    }
  }
];

export const fetchEvents=()=>
    new Promise((resolve,reject)=>{
        const delay=Math.random()*2000+1000
        const shouldFail=Math.random()<0.2
        
        setTimeout(()=>{
            if(shouldFail){
                reject("Failed to Get Rejected")
                return
            }

            resolve(events)

        },delay)

    })
