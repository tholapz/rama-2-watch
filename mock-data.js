/**
 * ข้อมูลจำลองสำหรับอุบัติเหตุบนถนนพระราม 2
 * ไฟล์นี้มีข้อมูลอุบัติเหตุที่กำหนดไว้สำหรับการแสดงผลไทม์ไลน์
 */

const accidentData = [
  {
    id: 1,
    date: "2025-04-08",
    title: "Truck collision with construction barrier",
    description: "A truck collided with an improperly marked construction barrier, causing minor injuries to the driver.",
    severity: "minor",
    location: "Km 30, Rama II Road"
  },
  {
    id: 2,
    date: "2025-02-19",
    title: "Multi-vehicle accident due to road narrowing",
    description: "Three vehicles were involved in a chain collision at an unmarked lane narrowing in the construction zone.",
    severity: "moderate",
    location: "Km 25, Rama II Road"
  },
  {
    id: 3,
    date: "2024-12-05",
    title: "Construction debris causing motorcycle accident",
    description: "A motorcyclist was injured after hitting debris left on the road from the highway construction.",
    severity: "moderate",
    location: "Km 32, Rama II Road"
  },
  {
    id: 4,
    date: "2024-10-30",
    title: "Major traffic accident due to poor signage",
    description: "Inadequate warning signs at a detour led to a serious accident involving a passenger bus and two cars.",
    severity: "severe",
    location: "Km 27, Rama II Road"
  },
  {
    id: 5,
    date: "2024-09-15",
    title: "Vehicle drove into unmarked construction pit",
    description: "A sedan drove into an unmarked construction pit during nighttime, resulting in vehicle damage.",
    severity: "moderate",
    location: "Km 22, Rama II Road"
  },
  {
    id: 6,
    date: "2024-08-02",
    title: "Worker injured by passing vehicle",
    description: "A construction worker was struck by a passing vehicle that encroached on the work zone.",
    severity: "severe",
    location: "Km 29, Rama II Road"
  },
  {
    id: 7,
    date: "2024-06-18",
    title: "Crane collapse on highway",
    description: "A construction crane partially collapsed onto the roadway, damaging several vehicles.",
    severity: "severe",
    location: "Km 26, Rama II Road"
  },
  {
    id: 8,
    date: "2024-04-22",
    title: "Pedestrian accident at temporary crossing",
    description: "A pedestrian was injured while using a poorly marked temporary crossing near the construction site.",
    severity: "moderate",
    location: "Km 24, Rama II Road"
  }
];

// Export the data for use in other files
export default accidentData;
