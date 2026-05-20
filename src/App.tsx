import "./App.css";
import { useAppSelector } from "./app/store";
import RecursiveComponent from "./components/FileComponent";
import Preview from "./components/Preview";
import ResizeableComponent from "./components/ResizeableComponent";
import WelcomeTab from "./components/WelcomeTab";

function App() {
  const { openedFiles , myFiles} = useAppSelector((state) => state.tree);

  return (
    <div className="w-screen h-screen bg-black text-white box-border m-0">
      <ResizeableComponent
        showLeftPanel
        leftPanel={<RecursiveComponent node={myFiles} />}
        rightPanel={openedFiles.length ? <Preview /> : <WelcomeTab />}
      />
    </div>
  );
}

export default App;
