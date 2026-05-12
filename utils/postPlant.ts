import axios from "axios";

interface PlantPayload {
  species: string;
  coordinates: string;
  body: string;
  images: string[];
}

export const postPlant = async (data: PlantPayload) => {
  try {
    const uploadPromises = data.images.map(async (imageUri) => {
      const formData = new FormData();
      formData.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: `upload_${Date.now()}.jpg`,
      } as any);

      formData.append("upload_preset", "bosque_preset");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dr5p8ebcv/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return res.data.secure_url;
    });

    const uploadedUrls = await Promise.all(uploadPromises);

    const finalPayload = {
      species: data.species,
      coordinates: data.coordinates,
      body: data.body,
      img_url: uploadedUrls,
      created_at: new Date(),
      log_date: new Date(),
      image_date: new Date(),
    };

    const response = await axios.post(
      "https://bosque-comestible-backend.onrender.com/api/plants/",
      finalPayload,
    );
    return response.data;
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};
