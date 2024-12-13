import * as React from "react";
import {
  Callout,
  CommandBar,
  DirectionalHint,
  ICommandBarItemProps,
  Stack,
  Text,
} from "@fluentui/react";
import useGlobal from "../../hooks/useGlobal";
import { getCurrentYear } from "../utils/dateUtils";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import styles from "./Layout.module.scss";

export interface INavBarDTO {
  context: WebPartContext;
}

const NavBar: React.FC<INavBarDTO> = ({ context }) => {
  const { shownYear, setShownYear } = useGlobal();
  const [infoShown, setInfoShown] = React.useState<boolean>(false);
  const infoButtonRef = React.useRef<HTMLDivElement>(null);

  // Funktioner til håndtering af årskifte
  const goToCurrentYear = (): void => setShownYear(getCurrentYear());
  const goToPreviousYear = (): void => {
    if (shownYear === getCurrentYear() - 3) return;
    setShownYear(shownYear - 1);
  };
  const goToNextYear = (): void => {
    if (shownYear === getCurrentYear() + 3) return;
    setShownYear(shownYear + 1);
  };

  const commandBarItems: ICommandBarItemProps[] = [
    {
      key: "prevYear",
      text: "Forrige år",
      iconProps: { iconName: "ChevronLeft" },
      className:styles.navButton,
      onClick: goToPreviousYear,
    },
    {
        key: "nextYear",
        text: "Næste år",
        iconProps: { iconName: "ChevronRight" },
        className:styles.navButton,
        onClick: goToNextYear,
    },
    ...(shownYear !== getCurrentYear() ? [ //Viser kun knappen hvis det viste år ikke er i år
    {
      key: "currentYear",
      text: "I år",
      iconProps: { iconName: "ReturnToSession" },
      className: styles.navButton,
      style: {marginInline: "15px 0px"},
      onClick: goToCurrentYear,
    },
  ] : []),
  ];
  const commandBarFarItems: ICommandBarItemProps[] = [
    {
      key: "info",
      text: "Info",
      ariaLabel: "Info",
      iconProps: { iconName: "Info" },
      onClick: () => setInfoShown(!infoShown),
      onRender: (props) => (
        <div
          ref={infoButtonRef}
          onClick={() => setInfoShown(!infoShown)}
          title="Information"
          className={styles.infoButton}
        >
          {props?.iconProps?.iconName && (
            <i
              aria-label={props.ariaLabel}
              className={`ms-Icon ms-Icon--${props.iconProps.iconName}`}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <CommandBar
        items={commandBarItems}
        farItems={commandBarFarItems}
        styles={{
          root: {
            borderBottom: "1px solid #ccc",
          },
        }}
      />
      {infoShown && (
        <Callout
          directionalHint={DirectionalHint.bottomRightEdge}
          target={infoButtonRef}
          onDismiss={() => setInfoShown(!infoShown)}
        >
          <Stack
            style={{ padding: "20px", maxWidth: "700px" }}
            tokens={{ childrenGap: 15 }}
          >
            <Text variant={"large"}>
              Information til budget for konsulentydelser
            </Text>
            <Stack tokens={{ childrenGap: 7 }}>
              <Text variant={"medium"}>
                - Konsulenters tal er ferietimer / samlet tid minus intern tid
              </Text>
              <Text variant={"medium"}>
                - Konsulenter har årligt 185 ferietimer
              </Text>
            </Stack>
          </Stack>
        </Callout>
      )}
    </>
  );
};

export default NavBar;
