import { useContext } from 'react';
import { AppState } from "../Config/store/state";
import ConsolesList from "./ConsolesList.component";

const dummyConsoles = [
    {
        id: "1",
        name: "NES",
        idBrand: "1",
        year: "1984",
    },
    {
        id: "2",
        name: "SNES",
        idBrand: "1",
        year: "1991",
    },
]

const Consoles = () => {
  const { console } = useContext(AppState);

  return (
    <ConsolesList consoles={console.list} />
  )
}

export default Consoles;