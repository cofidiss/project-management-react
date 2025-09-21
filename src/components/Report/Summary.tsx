import { useContext, useEffect, useState } from "react";
import { PieData } from "../../Models/Models";
import PieChart from "../PieChart/PieChart";
import { AppContext } from "../../Contexts/AppContext";
import { start } from "node:repl";
import Box from "@mui/material/Box";





const   Summary :React.FC = () => {
  const { startLoading, stopLoading, setIsLoggedIn } = useContext(AppContext);
  const baseUrl = process.env.REACT_APP_BASE_URL;
  const [statusData, setStatusData] = useState<PieData[]>([]);
  const [manHourData, setManHourData] = useState<PieData[]>([]);
  const [taskData, setTaskData] = useState<PieData[]>([]);


  const fetchProjectStatusData = async () => {  

    var response = await fetch(`${baseUrl}/api/report/summary/projectStatus`, { method: 'GET' });
    var data = await response.json();
setStatusData(data);
  };
  const fetchProjectManHourData = async () => {
    var response = await fetch(`${baseUrl}/api/report/summary/projectManHour`, { method: 'GET' });
    var data = await response.json();
setManHourData(data);
};
    const fetchProjectTaskData = async () => {      var response = await fetch(`${baseUrl}/api/report/summary/projectTask`, { method: 'GET' });
    var data = await response.json();
setTaskData(data);
};
  // Backend'ten veriyi fetch etmek için metod (şu an boş)
  const fetchPieData = async () => {

    try {
            startLoading();
      var projectStatusPromise = fetchProjectStatusData();
      var projectManHourPromise = fetchProjectManHourData();
      var projectTaskPromise = fetchProjectTaskData();
      await Promise.all([projectStatusPromise, projectManHourPromise, projectTaskPromise]);
    } catch (error) {
      console.error("Error fetching pie data:", error);
    } 
    finally {
      stopLoading();
    }

    // TODO: Fetch logic here
    // Örnek dummy data:
    // setStatusData([
    //   { label: "In Progress", value: 10 },
    //   { label: "Completed", value: 15 },
    //   { label: "Pending", value: 5 },
    // ]);

    // setManHourData([    
    //   { label: "Dev", value: 120 },
    //   { label: "QA", value: 40 },
    //   { label: "Design", value: 60 },
    // ]);

    // setTaskData([
    //   { label: "Feature", value: 8 },
    //   { label: "Bug", value: 12 },
    //   { label: "Chore", value: 5 },
    // ]);
  };

  useEffect(() => {
    fetchPieData();
  }, []);
const renderPieChart = (data: PieData[], title: string) => (
  <div className="flex flex-col items-center min-w-[250px] max-w-[300px] m-4">
    <h3 className="mb-2 font-semibold">{title}</h3>
    <PieChart data={data} />
  </div>
);

return (
 <Box
      sx={{
        display: "flex",
        gap: 2,
        overflowX: "auto",
        p: 2,
      }}
    >
      {renderPieChart(statusData, "Project by Status")}
      {renderPieChart(manHourData, "Project by Man Hour")}
      {renderPieChart(taskData, "Project by Task")}
    </Box>
  );
};

export default Summary;