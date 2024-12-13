import * as React from "react";
import { MessageBar, MessageBarType, Stack } from "@fluentui/react";
import { INotification, NotificationType } from "../../context/GlobalContext";

export interface INotificationProps {
  notifications: INotification[];
  onDismiss: (notification: INotification) => void;
}

const Notifications: React.FC<INotificationProps> = ({
  notifications,
  onDismiss,
}) => {
  return (
    <Stack>
      {notifications.map((notif, index) => (
        <React.Fragment key={index}>
          {notif.type === NotificationType.Info && (
            <MessageBar
              messageBarType={MessageBarType.info}
              onDismiss={() => onDismiss(notif)}
            >
              {notif.message}
            </MessageBar>
          )}
          {notif.type === NotificationType.Warning && (
            <MessageBar
              messageBarType={MessageBarType.warning}
              onDismiss={() => onDismiss(notif)}
            >
              {notif.message}
            </MessageBar>
          )}
          {notif.type === NotificationType.Success && (
            <MessageBar
              messageBarType={MessageBarType.success}
              onDismiss={() => onDismiss(notif)}
            >
              {notif.message}
            </MessageBar>
          )}
          {notif.type === NotificationType.Error && (
            <MessageBar
              messageBarType={MessageBarType.error}
              onDismiss={() => onDismiss(notif)}
            >
              {notif.message}
            </MessageBar>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
};

export default Notifications;