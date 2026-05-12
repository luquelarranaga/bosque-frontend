import axios from "axios";

export default async function postLog(plantId: number, body: string) {
  const result = await axios.post(
    `https://bosque-comestible-backend.onrender.com/api/plants/${plantId}/logs`,
    {
      plant_id: plantId,
      log_date: new Date(),
      body: body,
    },
  );

  const { log } = result.data;

  return log;
}
