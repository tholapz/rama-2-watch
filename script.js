/**
 * ระบบติดตามความปลอดภัยถนนพระราม 2 - Main Script
 * จัดการการคำนวณจำนวนวันตั้งแต่อุบัติเหตุครั้งล่าสุด การแสดงไทม์ไลน์
 * และการแสดงรายการอุบัติเหตุ
 */

import accidentData from './mock-data.js';

/**
 * คำนวณจำนวนวันระหว่างวันที่สองวัน
 * @param {string} startDate - วันที่เริ่มต้นในรูปแบบ YYYY-MM-DD
 * @param {string} endDate - วันที่สิ้นสุดในรูปแบบ YYYY-MM-DD
 * @returns {number} จำนวนวันระหว่างวันที่
 */
const calculateDaysBetween = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * จัดรูปแบบวันที่ให้อ่านง่ายขึ้น
 * @param {string} dateString - วันที่ในรูปแบบ YYYY-MM-DD
 * @returns {string} วันที่ที่จัดรูปแบบแล้ว
 */
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('th-TH', options);
};

/**
 * เริ่มต้นตัวนับวันด้วยอุบัติเหตุล่าสุด
 * @param {Array} accidents - อาร์เรย์ของข้อมูลอุบัติเหตุ
 */
const initializeDaysCounter = (accidents) => {
  // เรียงอุบัติเหตุตามวันที่ (ล่าสุดก่อน)
  const sortedAccidents = [...accidents].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  // รับอุบัติเหตุล่าสุด
  const latestAccident = sortedAccidents[0];
  const today = new Date().toISOString().split('T')[0]; // รูปแบบ YYYY-MM-DD
  
  // คำนวณวันตั้งแต่อุบัติเหตุล่าสุด
  const daysSinceLastAccident = calculateDaysBetween(latestAccident.date, today);
  
  // อัปเดตตัวนับ
  const daysCountElement = document.getElementById('days-count');
  daysCountElement.textContent = daysSinceLastAccident;
  
  // อัปเดตวันที่อุบัติเหตุล่าสุด
  const lastAccidentDateElement = document.getElementById('last-accident-date');
  lastAccidentDateElement.textContent = formatDate(latestAccident.date);
};

/**
 * สร้างไทม์ไลน์แนวตั้ง
 * @param {Array} accidents - อาร์เรย์ของข้อมูลอุบัติเหตุ
 */
const createVerticalTimeline = (accidents) => {
  const sortedAccidents = [...accidents].sort((a, b) => 
    new Date(b.date) - new Date(a.date) // เรียงจากใหม่ไปเก่า
  );
  
  const timelineContainer = document.getElementById('vertical-timeline');
  
  // แปลความรุนแรงเป็นภาษาไทย
  const severityTranslation = {
    minor: 'เล็กน้อย',
    moderate: 'ปานกลาง',
    severe: 'รุนแรง'
  };
  
  // สร้างรายการไทม์ไลน์สำหรับแต่ละอุบัติเหตุ
  sortedAccidents.forEach((accident, index) => {
    const timelineItem = document.createElement('div');
    timelineItem.className = `timeline-item ${accident.severity}`;
    
    // แปลไตเติล
    let thaiTitle = accident.title;
    if (accident.title.includes('Truck collision')) {
      thaiTitle = 'รถบรรทุกชนแผงกั้นการก่อสร้าง';
    } else if (accident.title.includes('Multi-vehicle')) {
      thaiTitle = 'อุบัติเหตุหลายคันเนื่องจากถนนแคบลง';
    } else if (accident.title.includes('Construction debris')) {
      thaiTitle = 'เศษวัสดุก่อสร้างทำให้เกิดอุบัติเหตุรถจักรยานยนต์';
    } else if (accident.title.includes('Major traffic')) {
      thaiTitle = 'อุบัติเหตุการจราจรรุนแรงเนื่องจากป้ายเตือนไม่ชัดเจน';
    } else if (accident.title.includes('Vehicle drove')) {
      thaiTitle = 'รถยนต์ตกหลุมก่อสร้างที่ไม่มีป้ายเตือน';
    } else if (accident.title.includes('Worker injured')) {
      thaiTitle = 'คนงานได้รับบาดเจ็บจากรถที่ผ่านมา';
    } else if (accident.title.includes('Crane collapse')) {
      thaiTitle = 'เครนก่อสร้างพังลงมาบนถนน';
    } else if (accident.title.includes('Pedestrian')) {
      thaiTitle = 'อุบัติเหตุคนเดินเท้าที่ทางข้ามชั่วคราว';
    }
    
    // แปลคำอธิบาย
    let thaiDescription = accident.description;
    if (accident.description.includes('truck collided')) {
      thaiDescription = 'รถบรรทุกชนกับแผงกั้นการก่อสร้างที่ไม่มีเครื่องหมายที่เหมาะสม ทำให้คนขับได้รับบาดเจ็บเล็กน้อย';
    } else if (accident.description.includes('Three vehicles')) {
      thaiDescription = 'รถสามคันประสบอุบัติเหตุชนกันต่อเนื่องบริเวณที่ถนนแคบลงในเขตก่อสร้างซึ่งไม่มีป้ายเตือน';
    } else if (accident.description.includes('motorcyclist')) {
      thaiDescription = 'ผู้ขับขี่รถจักรยานยนต์ได้รับบาดเจ็บหลังจากชนเศษวัสดุก่อสร้างที่ถูกทิ้งไว้บนถนน';
    } else if (accident.description.includes('Inadequate warning')) {
      thaiDescription = 'ป้ายเตือนไม่เพียงพอที่ทางเบี่ยงทำให้เกิดอุบัติเหตุร้ายแรงที่เกี่ยวข้องกับรถโดยสารและรถยนต์สองคัน';
    } else if (accident.description.includes('sedan drove')) {
      thaiDescription = 'รถเก๋งขับตกหลุมก่อสร้างที่ไม่มีป้ายเตือนในเวลากลางคืน ส่งผลให้รถเสียหาย';
    } else if (accident.description.includes('construction worker')) {
      thaiDescription = 'คนงานก่อสร้างถูกรถที่ผ่านมาชน ซึ่งรุกล้ำเข้าไปในพื้นที่ทำงาน';
    } else if (accident.description.includes('crane')) {
      thaiDescription = 'เครนก่อสร้างพังลงมาบางส่วนลงบนถนน ทำให้รถหลายคันเสียหาย';
    } else if (accident.description.includes('pedestrian')) {
      thaiDescription = 'คนเดินเท้าได้รับบาดเจ็บขณะใช้ทางข้ามชั่วคราวที่ไม่มีป้ายบอกชัดเจนใกล้กับพื้นที่ก่อสร้าง';
    }
    
    // แปลตำแหน่ง
    const thaiLocation = accident.location.replace('Km', 'กม.');
    
    timelineItem.innerHTML = `
      <div class="timeline-content">
        <div class="timeline-date">${formatDate(accident.date)}</div>
        <h3 class="timeline-title">${thaiTitle}</h3>
        <div class="timeline-location">${thaiLocation}</div>
        <p class="timeline-description">${thaiDescription}</p>
        <span class="accident-severity severity-${accident.severity}">${severityTranslation[accident.severity]}</span>
      </div>
    `;
    
    timelineContainer.appendChild(timelineItem);
  });
};

/**
 * แสดงรายการอุบัติเหตุ (สำรองสำหรับการแสดงผลแบบดั้งเดิม)
 * @param {Array} accidents - อาร์เรย์ของข้อมูลอุบัติเหตุ
 */
const renderAccidentList = (accidents) => {
  const accidentListElement = document.getElementById('accident-list');
  const sortedAccidents = [...accidents].sort((a, b) => 
    new Date(b.date) - new Date(a.date) // เรียงตามวันที่ (ล่าสุดก่อน)
  );
  
  // แปลความรุนแรงเป็นภาษาไทย
  const severityTranslation = {
    minor: 'เล็กน้อย',
    moderate: 'ปานกลาง',
    severe: 'รุนแรง'
  };
  
  sortedAccidents.forEach(accident => {
    const accidentItem = document.createElement('div');
    accidentItem.className = `accident-item ${accident.severity}`;
    
    // แปลไตเติลและคำอธิบายแบบเรียบง่าย
    const thaiTitle = accident.title.includes('Truck') ? 'อุบัติเหตุรถบรรทุก' : 
                    accident.title.includes('Multi') ? 'อุบัติเหตุหลายคัน' :
                    accident.title.includes('Construction') ? 'อุบัติเหตุจากการก่อสร้าง' :
                    accident.title.includes('Major') ? 'อุบัติเหตุร้ายแรง' :
                    accident.title.includes('Vehicle') ? 'รถตกหลุม' :
                    accident.title.includes('Worker') ? 'คนงานบาดเจ็บ' :
                    accident.title.includes('Crane') ? 'เครนถล่ม' :
                    accident.title.includes('Pedestrian') ? 'อุบัติเหตุคนเดินเท้า' :
                    accident.title;
    
    accidentItem.innerHTML = `
      <div class="accident-date">${formatDate(accident.date)}</div>
      <h3 class="accident-title">${thaiTitle}</h3>
      <div class="accident-location">${accident.location.replace('Km', 'กม.')}</div>
      <p class="accident-description">${accident.description}</p>
      <span class="accident-severity severity-${accident.severity}">${severityTranslation[accident.severity]}</span>
    `;
    
    accidentListElement.appendChild(accidentItem);
  });
};

/**
 * เริ่มต้นแอปพลิเคชัน
 */
const initApp = () => {
  initializeDaysCounter(accidentData);
  createVerticalTimeline(accidentData);
  renderAccidentList(accidentData); // ยังคงสร้างรายการแบบดั้งเดิมเพื่อสำรองข้อมูล
};

// เริ่มต้นแอปเมื่อ DOM โหลดเสร็จสมบูรณ์
document.addEventListener('DOMContentLoaded', initApp);
