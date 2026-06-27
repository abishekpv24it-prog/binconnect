import axios from 'axios';

const IMGBB_API_KEY = process.env.REACT_APP_IMGBB_API_KEY;

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      formData
    );
    return response.data.data.url;
  } catch (error) {
    throw new Error('Failed to upload image');
  }
};
