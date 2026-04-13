import {
  Group,
  Panel,
  Separator,
  useDefaultLayout,
} from "react-resizable-panels";

import type { ReactNode } from "react";

interface IProps {
  leftPanel: ReactNode;
  rightPanel: ReactNode;
  showLeftPanel: boolean;
}

const ResizeableComponent = ({
  leftPanel,
  rightPanel,
  showLeftPanel,
}: IProps) => {
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "unique-layout-id",
    panelIds: showLeftPanel ? ["left", "right"] : ["right"],
    storage: localStorage,
  });

  return (
    <Group defaultLayout={defaultLayout} onLayoutChanged={onLayoutChanged}>
      {showLeftPanel && (
        <>
          <Panel id="left" collapsible>
            {leftPanel}
          </Panel>
          <Separator className="border-r border-[#ffffff1f]" />
        </>
      )}
      <Panel id="right">{rightPanel}</Panel>
    </Group>
  );
};

export default ResizeableComponent;
