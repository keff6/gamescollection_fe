
import { useEffect, useState, useCallback } from "react";
import { useAPI, useApiErrorHandler } from "../../hooks";
import { ENTITIES, API_ROUTES, CONSOLE_FILTER_OPTIONS } from "../../utils/constants";
import axios from "../../utils/axios";
import ExportData from "./ExportData.component";

const ExportDataContainer = () => {
  const [brands, setBrands] = useState([])
  const [consoles, setConsoles] = useState([])

  const { get: getConsoles, error: consoleError } = useAPI(false, ENTITIES.CONSOLE);
  const { get: getBrands, error: brandError } = useAPI(true, ENTITIES.BRAND);
  
  useApiErrorHandler(brandError || consoleError)

  useEffect(() => {
    getBrandsData();
  }, []);


  const getBrandsData = async () => {
    const {brands} = await getBrands(API_ROUTES.BRANDS.GET_ALL);
    setBrands(brands || [])
  }

  const handleGetConsolesByBrand = useCallback(async (brandId) => {
    const {consoles} = await getConsoles(API_ROUTES.CONSOLES.GET_BY_BRAND(brandId, CONSOLE_FILTER_OPTIONS.ALL));
    setConsoles(consoles || [])
  }, []);

  const handleExportData = async (brandId, consoleId) => {
    try {
      const response =  await axios.get(
        `${API_ROUTES.EXPORT.EXPORT_DATA}?idBrand=${brandId}&idConsole=${consoleId}`,
        { responseType: 'blob' }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GamesCollection.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
      } catch (error) {
        console.log(error.message);
    }
  }

  return (
    <ExportData
      brands={brands}
      consoles={consoles}
      getConsolesByBrand={handleGetConsolesByBrand}
      exportData={handleExportData}
    />
    )
}

export default ExportDataContainer