import styles from "./App.module.css";
import { Arena } from "./features/arena/Arena";
import { LayersPanel } from "./features/layers-panel/LayersPanel";
import { PropertiesPanel } from "./features/properties-panel/PropertiesPanel";
import { Topbar } from "./features/topbar/Topbar";

function App() {
  return (
    <div className={styles.root}>
      <Topbar />
      <div className={styles.container}>
        <LayersPanel />
        <Arena />
        <PropertiesPanel />
      </div>
    </div>
  );
}

export default App;
