import { CommonLov } from "./Models/Models";

  export const setLovState = async (setLovFunc: React.Dispatch<React.SetStateAction<CommonLov[]>>,lovUrl: string,
    startLoading: () => void, stopLoading: () => void, baseUrl?: string
  ) => {
    try {
      
      startLoading();
      const response = await fetch(`${baseUrl}/${lovUrl}`);
      if (!response.ok) {
        throw new Error('Error fetching lov.');
      }
      const data: CommonLov[] = await response.json();
      setLovFunc(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      stopLoading();
    }
  };
