import axios from "axios";

export const deletePlant = async (plantId: number) => {
  try {
    await axios.delete(
      `https://bosque-comestible-backend.onrender.com/api/plants/${plantId}`,
    );
  } catch (error) {
    console.error("Submission failed:", error);
    throw error;
  }
};
