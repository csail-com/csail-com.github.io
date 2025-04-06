import { Layer } from "@/@dble_layout";
import Sec1 from "./components/Sec1";
import Sec2 from "./components/Sec2";
import Sec3 from "./components/Sec3";
import Sec4 from "./components/Sec4";
import Sec7 from "./components/Sec7";

export default async function page() {
  return (
    <Layer as="section" align="center">
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec4 />
      <Sec7 />
    </Layer>
  );
}
