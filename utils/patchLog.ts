import axios from "axios";

interface PlantLog {
  log_id: number;
  plant_id: number;
  log_date: string;
  body: string;
}

export default async function patchLog(
  log: PlantLog,
  body: string,
  logs: PlantLog[],
): Promise<PlantLog[]> {
  const result = await axios.patch<{ log: PlantLog }>(
    `https://bosque-comestible-backend.onrender.com/api/logs/${log.log_id}`,
    { body: body },
  );

  const { log: updatedLog } = result.data;

  const updatedLogs: PlantLog[] = logs.map((currentLog) => {
    return currentLog.log_id === updatedLog.log_id ? updatedLog : currentLog;
  });

  return updatedLogs;
}
