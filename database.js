import { database } from './firebase';
import { ref, set, get, update, push, query, orderByChild, limitToLast } from 'firebase/database';

export const saveUserData = async (userId, userData) => {
  await set(ref(database, `users/${userId}`), userData);
};

export const getUserData = async (userId) => {
  const snapshot = await get(ref(database, `users/${userId}`));
  return snapshot.val();
};

export const updateUserPoints = async (userId, newPoints) => {
  await update(ref(database, `users/${userId}`), { points: newPoints });
};

export const submitReport = async (reportData) => {
  const reportsRef = ref(database, 'reports');
  await push(reportsRef, reportData);
};

export const getUserReports = async (userId) => {
  const snapshot = await get(query(ref(database, 'reports'), orderByChild('userId'), limitToLast(50)));
  const reports = snapshot.val() || {};
  const userReports = {};
  Object.entries(reports).forEach(([key, value]) => {
    if (value.userId === userId) {
      userReports[key] = value;
    }
  });
  return userReports;
};

export const getAllReports = async () => {
  const snapshot = await get(ref(database, 'reports'));
  return snapshot.val();
};

export const updateReportStatus = async (reportId, status) => {
  await update(ref(database, `reports/${reportId}`), { status });
};

export const assignStaff = async (reportId, staffId) => {
  await update(ref(database, `reports/${reportId}`), { assignedStaff: staffId });
};

export const getLeaderboard = async () => {
  const snapshot = await get(query(ref(database, 'users'), orderByChild('points'), limitToLast(10)));
  const users = snapshot.val() || {};
  return Object.entries(users)
    .map(([id, data]) => ({ id, ...data }))
    .sort((a, b) => b.points - a.points);
};
