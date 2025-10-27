import { useState, useEffect } from "react";
import { useAPI, useApiErrorHandler } from "../../hooks";
import Stats from "./Stats.component";
import { parsePieGraphData, parseTimelineGraphData } from "../../utils/parseGraphData";
import { API_ROUTES } from "../../utils/constants";

const StatsContainer = () => {
  const [byCondition, setByCondition] = useState([])
  const [totalByConsole, setTotalByConsole] = useState([])
  const [top5Consoles, setTop5Consoles] = useState([])
  const [genresDist, setGenresDist] = useState([])
  const [totals, setTotals] = useState(null)
  const [latestAdditions, setLatestAdditions] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  // const { setStatsTotals } = useAppState();
  const { get, error } = useAPI(false);
  useApiErrorHandler(error);

  useEffect(() => {
    getTotals();
    getByCondition();
    getTotlaGamesByConsole();
    getTop5CosolesByGames();
    getGenresDist();
    getLatestAdditions();
    getNowPlaying();
  },[])

  const getTotals = async () => {
    const totalsResponse = await get(API_ROUTES.STATS.GET_TOTALS);
    setTotals(totalsResponse || null);
  }

  const getByCondition = async () => {
    const response = await get(API_ROUTES.STATS.GET_BY_CONDITION);
    setByCondition(parsePieGraphData(response) || []);
  }

  const getTotlaGamesByConsole = async () => {
    const response = await get(API_ROUTES.STATS.GET_TOTAL_GAMES_BY_CONSOLE);
    setTotalByConsole(parseTimelineGraphData(response) || []);
  }

  const getTop5CosolesByGames = async () => {
    const response = await get(API_ROUTES.STATS.GET_TOP_5_CONSOLES);
    setTop5Consoles(parseTimelineGraphData(response, true) || []);
  }

  const getGenresDist = async () => {
    const response = await get(API_ROUTES.STATS.GET_GENRES_DISTRIBUTION);
    setGenresDist(response|| []);
  }

  const getLatestAdditions = async () => {
    const response = await get(API_ROUTES.STATS.GET_LATEST_ADDITIONS);
    setLatestAdditions(response|| []);
  }

  const getNowPlaying = async () => {
    const response = await get(API_ROUTES.STATS.GET_NOW_PLAYING);
    setNowPlaying(response|| []);
  }

  return (
    <Stats
      totals={totals}
      byCondition={byCondition}
      totalByConsole={totalByConsole}
      top5Consoles={top5Consoles}
      genresDist={genresDist}
      latestAdditions={latestAdditions}
      nowPlaying={nowPlaying}
    />
    )
}

export default StatsContainer