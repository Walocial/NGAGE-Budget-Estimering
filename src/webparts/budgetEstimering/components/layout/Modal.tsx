import * as React from "react";
import {
  DefaultButton,
  Modal,
  Position,
  PrimaryButton,
  SpinButton,
  Stack,
  Text,
} from "@fluentui/react";
import IModalInput from "../interfaces/IModalInput";
import SharepointService from "../../services/SharePointService";
import useGlobal from "../../hooks/useGlobal";
import { NotificationType } from "../../context/GlobalContext";
import { IFerieTimerListItem } from "../interfaces/IFerieTimerListItem";

export interface IEditModalDTO {
  isOpen: boolean;
  currentValue: string | number;
  onClose: () => void;
  onSave: (newValue: string | number) => void;
  input: IModalInput;
}

const EditModal: React.FC<IEditModalDTO> = ({
  isOpen,
  currentValue,
  onClose,
  onSave,
  input,
}) => {
  const [newValue, setNewValue] = React.useState<string | number>(currentValue);
  const { listItems, setListItems, notifications, setNotifications } = useGlobal();

  const _onSave = async () => {
    const list =
      SharepointService.Instance.getSP().web.lists.getByTitle("Ferietimer");
    const items: IFerieTimerListItem[] = await list.items();

    const isDuplicate = !!items.filter(
      (i) => i["DatoN_x00f8_gle"] === input.key && i.Title === input.email
    ).length;

    try {
      if (isDuplicate) {
        const item = items.find(
          (i) => i["DatoN_x00f8_gle"] === input.key && i.Title === input.email
        );
        if (!item) return;
        const response = await list.items
          .getById(item.Id)
          .update({
            Title: input.email,
            AntalTimer: newValue,
          })
          .then((r) => r.item());

        const li = listItems.filter((l) => l.Id !== item.Id);
        setListItems([...li, response]);
        setNotifications([
          ...notifications,
          {
            type: NotificationType.Success,
            message: "Celle opdateret",
          },
        ]);
        return onSave(newValue);
      }

      const response = await list.items
        .add({
          Title: input.email,
          AntalTimer: newValue,
          DatoN_x00f8_gle: input.key,
        })
        .then((r) => r.item());

      setListItems([...listItems, response]);

      return onSave(newValue);
    } catch (error) {
      console.log("Kunne ikke opdatere cellen:", error)
      setNotifications([
        ...notifications,
        {
          type: NotificationType.Error,
          message: "Kunne ikke opdatere cellen.",
        },
      ]);
    }
  };

  return (
    <Modal isOpen={isOpen} onDismiss={onClose}>
      <Stack tokens={{ childrenGap: 10, padding: 20 }}>
        <Text variant={"large"}>Opdater ferietimer</Text>
        <SpinButton
          label="Angiv antal timer"
          labelPosition={Position.top}
          value={newValue.toString()}
          min={0}
          max={165}
          step={7.5} // Øger med hele arbejdsdage ad gangen
          onChange={(e, val) => setNewValue(val || "")}
        />
        <Stack horizontal tokens={{ childrenGap: 10 }}>
          <PrimaryButton onClick={() => _onSave()}>Gem</PrimaryButton>
          <DefaultButton onClick={onClose}>Annuller</DefaultButton>
        </Stack>
      </Stack>
    </Modal>
  );
};
export default EditModal;
