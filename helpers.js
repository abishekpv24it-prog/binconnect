export const getZoneFromLocation = (location) => {
  const lowerLocation = location.toLowerCase();
  
  if (lowerLocation.includes('library')) return 'LIBRARY';
  if (lowerLocation.includes('food') || lowerLocation.includes('canteen') || lowerLocation.includes('court')) return 'FOOD_COURT';
  if (lowerLocation.includes('bus') || lowerLocation.includes('stand')) return 'BUS_STAND';
  if (lowerLocation.includes('academic') || lowerLocation.includes('class') || lowerLocation.includes('block')) return 'ACADEMIC_BLOCK';
  if (lowerLocation.includes('hostel') || lowerLocation.includes('room')) return 'HOSTEL';
  
  return 'GENERAL';
};

export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^\+[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const checkReportCooldown = (lastReportTime) => {
  const COOLDOWN_MINUTES = 30;
  const now = new Date();
  const lastReport = new Date(lastReportTime);
  const diffMinutes = (now - lastReport) / (1000 * 60);
  
  return diffMinutes >= COOLDOWN_MINUTES;
};
